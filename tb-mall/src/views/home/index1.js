import React, { Component } from "react";
import "./index.scss";

// class类式 组件
export default class Home extends Component {

    constructor(props) {
        super(props);
        //状态存储
        this.state = {
            num: 0,
            date: new Date(),
            code:  ` 
    <pre><code>
    // 正确使⽤setState
    语法：setState(partialState, callback)
        1. partialState : object|function ⽤于产⽣与当前state合并的⼦集。
        2. callback : function 在state更新之后被调⽤。

        setState只有在合成事件和⽣命周期函数中是异步的，在原⽣事件和setTimeout中都是同步的，这⾥的异步其实是批量更新。
    */

    // 状态更新1 
    this.setState({
        date: new Date()
    });

    // 出于性能考虑，React 如果同时出现多个setState(), 可能会把多个 setState() 调⽤合并成⼀个调⽤ 或 调用最后一个setState()。
    this.setState({
        date: new Date()
    });

    </code></pre>
            `
        }
    };

    // 组件加载完成后执行
    componentDidMount() {
        this.timer = setInterval(() => {

            // 状态更新 2 可用于链式调用
            this.setState((state) => {
                // console.log(state);
                return {
                    date: new Date()
                }
            }, () => {
                // console.log(this.state);
            });

            // 状态更新后的反馈
            this.setState({
                // date: new Date()
            }, () => {
                // 这里会在state状态更新之后被执行
                // console.log(this.state);
            });

        }, 1000);

        document.querySelector('#numBtn').addEventListener('click', this.pushNum);
    };

    // 自定义方法
    // pushNum() {
    //     console.log(this); // undefined
    // };

    pushNum = () => {
        // console.log(this);   // home 组件生成周期
        this.setState({
            num: this.state.num + 1
        })
    };

    // 组件卸载之前执行
    componentWillUnmount() {
        clearInterval(this.timer);
    };

    render() {
        return (
            <section>
                <h1>{this.state.date.toLocaleDateString()} {this.state.date.toLocaleTimeString()}</h1>

                <button onClick={this.pushNum}>合成事件：{this.state.num}</button>
                <button id="numBtn">原生事件：{this.state.num}</button>
                
                <article dangerouslySetInnerHTML={{__html: this.state.code}}></article>
            </section>
        );
    };
};