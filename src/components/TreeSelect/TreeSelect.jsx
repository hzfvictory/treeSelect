import React, { Component } from 'react';
import TreeNode from "./TreeNode"
import get from 'lodash/get'
import set from 'lodash/set'
import arrayMove from "array-move"

class TreeSelect extends Component {

    state = { treeData: [] }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (!prevState.treeData.length) {
            return {
                treeData: nextProps.treeData
            }
        }
        return null;
    }

    handelChange = (preData, ary) => () => {
        const { onChange } = this.props;
        onChange(preData.value)
    }

    fold = (position) => {
        const { treeData } = this.state;
        const [curNum, lastNum, path] = this.utils(position)
        let newData = get(treeData, path + lastNum + `['children']`, []);
        newData.map((item) => {
            item.show = item.show === undefined ? false : !item.show
        })
        set(treeData, path + lastNum + `['children']`, newData)
        this.setState({
            treeData
        }, () => {
            console.log(this.state.treeData);
        })
    }
    utils = (position) => {
        let curNum = [...position]
        let lastNum = curNum.splice(position.length - 1, 1)

        let path = ''
        curNum.map((item) => {
            path += `[${item}]['children']`
        })
        return [curNum, lastNum, path]
    }

    moveData = (position, type) => {
        const { treeData } = this.state;
        const inpVal = this.inp.value
        const [curNum, lastNum, path] = this.utils(position)

        switch (type) {
            case 'up':
                let currData = arrayMove(get(treeData, path), lastNum, lastNum - 1)
                console.log(currData)
                set(treeData, path, currData)
                this.setState({
                    treeData
                }, () => {
                    console.log(this.state.treeData);
                })
                break;
            case 'down':
                let downData = arrayMove(get(treeData, path), lastNum, lastNum + 1)
                set(treeData, path, downData)
                this.setState({
                    treeData
                })
                break;
            case 'del':
                let delData = get(treeData, path)
                delData.splice(lastNum, 1)
                if(delData.length===0){
                    set(treeData, path, null)
                }else{
                    set(treeData, path, delData)
                }
                this.setState({
                    treeData
                }, () => {
                    console.log(this.state.treeData);
                })
                break;
            case 'add':
                if (curNum.length === 2) {
                    return alert('最多三级')
                }
                if (!inpVal) {
                    return alert('添加内容')
                }

                let addData = get(treeData, path + lastNum + `['children']`, []) || []
                addData.push({
                    value: inpVal,
                    title: inpVal
                })
                set(treeData, path + lastNum + `['children']`, addData)


                this.setState({
                    treeData
                }, () => {
                    console.log(this.state.treeData);
                })
                break;
            default:
        }
    }

    levelMap = (item, ...ary) => {
        return item.children && item.show !== false && item.children.map((item, index) => {
            return (
                <TreeNode
                    key={item.value + index}
                    treeData={item}
                    onChange={this.handelChange}
                    onMove={this.moveData}
                    onFold={this.fold}
                    position={[...ary, index]}
                >
                    {
                        item.children && item.show !== false && this.levelMap(item, ...ary, index)
                    }
                </TreeNode>
            )
        })
    }

    render() {
        const { treeData } = this.state;
        return (
            <div className='content'>
                &nbsp; &nbsp; &nbsp; &nbsp; <input ref={x => this.inp = x} type='text' placeholder='添加内容区域'></input>
                <ul>
                    {
                        !!treeData.length && treeData.map((item, index) => {
                            return (
                                <li onClick={this.handelChange(item, [index])} key={item.value}>
                                    <div className='tree-order-item'>
                                        <div>
                                            <span style={{ cursor: 'pointer' }}
                                                onClick={
                                                    e => {
                                                        e.stopPropagation()
                                                        this.fold([index])
                                                    }
                                                }>{item.children && item.show !== false ? 'on' : ''}  &nbsp;&nbsp;&nbsp;&nbsp;</span>
                                            <span>{item.title}</span>
                                        </div>
                                        <div>
                                            <span onClick={
                                                (e) => {
                                                    e.stopPropagation()
                                                    this.moveData([index], 'add')
                                                }
                                            }>添加下一级 </span>
                                        </div>
                                    </div>
                                    {this.levelMap(item, index)}
                                </li>
                            )
                        })
                    }
                </ul>
            </div >
        )
    }
}

export default TreeSelect