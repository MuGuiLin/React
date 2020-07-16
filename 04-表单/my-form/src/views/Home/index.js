import React, { Component } from 'react';

import "./index.css";
import logo from '../../logo.svg';

export default class Home extends Component {
    componentDidMount() {
        // 监听订阅自定义事件
        React.$emitter.addListener('mupiao', (msg) => {

            // 发布触发自定义事件的内容是一个变量时
            console.log(msg);

            // 发布触发自定义事件的内容是一个函数时
            msg(888)
        })
    }
    render() {
        return (
            <div className="home">
                <header className="home-header">
                    <img src={logo} className="home-logo" alt="logo" />
                    <p>Edit <code>src/home.js</code> and save to reload.</p>
                    <a className="home-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer" >
                    Learn React
                    </a>
                </header>
            </div>
        );
    }
}