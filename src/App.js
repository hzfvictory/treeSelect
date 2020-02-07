import React, { Component } from 'react';
import { TreeSelect } from "./components/TreeSelect"
import { factorial1, factorial2 } from "./utils"
const treeData = [
  {
    title: '一级菜单1',
    value: '一级菜单1',
    children: [
      {
        title: '二级菜单1',
        value: '二级菜单1',
        children: [
          {
            title: '三级菜单1',
            value: '三级菜单1',
          },
          {
            title: '三级菜单2',
            value: '三级菜单2',
          }
        ]
      },
      {
        title: '二级菜单2',
        value: '二级菜单2',
      },
    ],
  },
  {
    title: '一级菜单2',
    value: '一级菜单2',
  },
];

class App extends Component {
  componentDidMount() {
    // 阶乘
    console.log(factorial1(6), factorial2(6))
  }
  onChange = (value) => {
    alert(value);
  }
  render() {
    return (
      <>
        <TreeSelect
          treeData={treeData}
          onChange={this.onChange}
        />
      </>
    )
  }
}

export default App;


