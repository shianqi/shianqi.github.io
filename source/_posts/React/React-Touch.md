---
title: React Touch 事件
date: 2017-05-24 18:02:24
tags: 
    - React
    - JavaScript
---

## 兼容性

经测试，兼容 ie9+ 主流浏览器

## 手机单击触发事件

##### Chrome
`onTouchStart` -> `onTouchEnd` -> `onMouseDown` -> `onMouseUp`

##### Firefox
`onTouchStart` -> `onTouchEnd` -> `onMouseDown` -> `onMouseMove` -> `onMouseUp`

## 手机触摸移动触发事件

##### Chrome
`onTouchStart` ->  `onTouchMove`  -> `onTouchEnd` 

##### Firefox
`onTouchStart` -> `onTouchMove` -> `onTouchEnd` -> `onMouseDown` -> `onMouseMove` -> `onMouseUp`

## 获取坐标方式
|事件|方法|
|-----|-----|
|`onMouseDown`|`const {pageX, pageY} = e;`|
|`onMouseMove`|`const {pageX, pageY} = e;`|
|`onMouseUp`|`const {pageX, pageY} = e;`|
|`onTouchStart`|`const {pageX,pageY} = e.touches[0];`|
|`onTouchMove`|`const {pageX, pageY} = e.touches[0];`|
|`onTouchEnd`|`const {clientX, clientY} = e.changedTouches[0];`|


## 示例
```
import React,{ Component } from 'react';
import styles from './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.checked = false;

        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);

        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);
    }

    handleTouchStart(e){
        const {pageX,pageY} = e.touches[0];
        console.log("handleTouchStart", pageX, pageY);
    }

    handleTouchMove(e){
		const {pageX, pageY} = e.touches[0];
        console.log("handleTouchMove", pageX, pageY);
	}

    handleTouchEnd(e){
		const {clientX, clientY} = e.changedTouches[0];
		console.log("handleTouchEnd", clientX, clientY);
	}

    handleMouseDown(e){
        this.checked = true;
        console.log("handleMouseDown", e.pageX, e.pageY);
    }

    handleMouseMove(e){
        if(this.checked)
            console.log("handleMouseMove", e.pageX, e.pageY);
    }

    handleMouseUp(e){
        this.checked = false;
        console.log("handleMouseUp", e.pageX, e.pageY);
    }

    render(){
        return (
            <div className={styles.app}>
                <h2>Hello, Nice</h2>
                <div className={styles.touchBox}
                     onMouseDown={this.handleMouseDown}
                     onMouseMove={this.handleMouseMove}
                     onMouseUp={this.handleMouseUp}

                     onTouchStart={this.handleTouchStart}
                     onTouchMove={this.handleTouchMove}
                     onTouchEnd={this.handleTouchEnd}
                />
            </div>
        )
    }
}

export default App;
```