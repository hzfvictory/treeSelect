import React, { Component } from 'react';


class TreeNode extends Component {
    state = { showItem: false }
    queryData = (e) => {
        e.stopPropagation()
        const { onChange, treeData, position } = this.props;
        onChange(treeData, position)()
    }
    onMoveData = (type) => (e) => {
        e.stopPropagation()
        const { onChange, treeData, position, onMove } = this.props;
        onMove(position, type)
    }
    handleShow = (type) => (e) => {
        e.stopPropagation()
        var eFrom = e.fromElement || e.relatedTarget;
        if (this.ref.contains(eFrom)) {
            return;
        }
        if (type === this.state.showItem) return
        this.setState({
            showItem: type
        })
    }
    fold = (e) => {
        e.stopPropagation()
        const { position, onFold } = this.props;
        onFold(position)
    }
    render() {
        const { onChange, treeData, position } = this.props;
        const { showItem } = this.state;
        return (
            <ul>
                {
                    treeData.show !== false &&
                    <li onClick={this.queryData}>
                        <div className={`tree-order-item  ${showItem ? `tree-order-item2` : ""}`} ref={x => this.ref = x} onMouseOver={this.handleShow(true)} onMouseOut={this.handleShow(false)}>
                            <div>
                                <span style={{ cursor: 'pointer' }} onClick={this.fold}> {treeData.children && treeData.show !== false ? 'on' : ''}  &nbsp;&nbsp;&nbsp;&nbsp;</span>
                                <span>{treeData.title}</span>
                            </div>
                            {
                                showItem &&
                                <div>
                                    <span onClick={this.onMoveData('up')}>向上</span>
                                    <span onClick={this.onMoveData('down')}>向下</span>
                                    <span onClick={this.onMoveData('del')}>删除</span>
                                    <span onClick={this.onMoveData('add')}>添加下一级</span>
                                </div>
                            }

                        </div>
                        {this.props.children}
                    </li>
                }
            </ul>
        )
    }
}

export default TreeNode
