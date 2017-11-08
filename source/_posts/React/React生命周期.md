---
title: React 生命周期 
date: 2017-06-11 15:51:56
tags: 
    - React
---
### 初始化阶段：

|函数名|说明|
|----|----|
|`constructor(props)`| 构造函数 |
|`componentWillMount`|  render之前最后一次修改状态的机会|
|`render`|只能访问this.props和this.state,只有一个顶层组件，不允许修改状态和DOM输出|
|`componentDidMount`|成功render并渲染完成真实DOM之后触发，可以修改DOM|

### 运行中阶段：

|函数名|说明|
|----|----|
|`componentWillReceiveProps`|父组件修改属性触发，可以修改属性、修改状态|
|`shouldComponentUpdate`|组件是否要更新，返回false会阻止render调用|
|`componentWillUnpdate`|不能修改状态和属性|
|`render`|只能访问this.props和this.state,不允许修改状态和DOM输出|
|`componentDidUpdate`|可以修改DOM|

### 销毁阶段： 
|函数名|说明|
|----|----|
|`componentWillUnmount`|在删除组件之前进行清理操作，比如计时器和事件处理器|

```
import React, { Component } from 'react'

class GD extends Component{

    constructor(props) {
        super(props)
        console.log('constructor')
        this.state = {
            shrinkState: true
        }
    }

    componentWillMount() {
        console.log('componentWillMount')
    }

    render() {
        return (
            <div>
                <h3>GD</h3>
                <input
                    type="button"
                    onClick={()=>{
                        this.setState({
                            shrinkState: false
                        })
                    }}
                    value={this.props.name}
                />
            </div>
        )
    }

    componentDidMount() {
        console.log('componentDidMount')
    }

    componentWillReceiveProps() {
        console.log('componentWillReceiveProps: 父组件修改属性触发')
    }

    shouldComponentUpdate() {
        console.log('shouldComponentUpdate')
        return true
    }

    componentWillUpdate() {
        console.log('componentWillUpdate')
    }

    componentDidUpdate() {
        console.log('componentDidUpdate')
    }

    componentWillUnmount (){
        console.log('componentWillUnmount')
    }
}

export default GD
```