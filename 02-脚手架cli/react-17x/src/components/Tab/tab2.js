import React, { PureComponent } from 'react';
import BScroll from 'better-scroll'

import './tb2.css'

class Tab2 extends PureComponent {
    state = {
        count: 1,
        list: []
    }

    check1() {
        // 下面是一道面试题：同时用setState修改执行了3次相同的值，请问？以下3个console.log()中的结果分别是什么？？

        // 1、同步环境
        this.setState({
            count: this.state.count + 1
        });
        console.log('第一个异步setState：', this.state.count);

        this.setState({
            count: this.state.count + 1
        });
        console.log('第二个异步setState：', this.state.count);

        this.setState({
            count: this.state.count + 1
        });
        console.log('第三个异步setState：', this.state.count);

        /**
        * 当setState 处在同步逻辑中时，是异步的更新状态和更新真实DOM，目的是为了不阻止程序向下继续运行
        * 也就是说：在当setState在同步逻辑中执行后，立即得到的状态是之前旧的状态，所以当有多个setState在同步环境下，会合并积累在最一个setState执行，所以有多个setState它们都是一样的。
        */

    }

    check2() {

        // 1、异步环境一 【在setTimeout延时函数中打印】
        setTimeout(() => {
            this.setState({
                count: this.state.count + 1
            });
            console.log('第一个异步setState：', this.state.count);

            this.setState({
                count: this.state.count + 1
            });
            console.log('第二个异步setState：', this.state.count);

            this.setState({
                count: this.state.count + 1
            });
            console.log('第三个异步setState：', this.state.count);
        }, 0);

        // 1、异步环境二 【在setState的回调函数中打印】
        // setState接受第二个参数(回调函数)，会在状态更新后触发。
        // 在React官网中对setState的描述是：setState在更新状态时，并不保证是同步的！！！
        this.setState({
            count: this.state.count + 1
        }, () => {
            console.log('第一个异步setState：', this.state.count);

        });
        this.setState({
            count: this.state.count + 1
        }, () => {
            console.log('第二个异步setState：', this.state.count);
        });
        this.setState({
            count: this.state.count + 1
        }, () => {
            console.log('第三个异步setState：', this.state.count);
        });

        /**
        * 当setState 处在异步逻辑中时，是同步的更新状态和更新真实DOM
        * 也就是：当有多个setState在异步环境下，各个setState之间都会执行互不干扰。
        */
    }

    load() {
        let list = [];
        for (let i = 0; i < 1000; i++) {
            list.push({
                id: Math.random() * 9999999 + Date.now(),
                val: i
            });
        }
        this.setState({
            list
        }, () => {
            // https://github.com/ustbhuangyi/better-scroll
            // BetterScroll 是一个旨在解决移动端滚动情况的插件（PC 已经支持）。内核的灵感来源于 iscroll 的实现，所以 BetterScroll 的 API 与 iscroll 整体是兼容​​的。更重要的是，BetterScroll 还基于 iscroll 扩展了一些功能并优化了性能。
            const bs = new BScroll('.wrapper', {
                pullUpLoad: true,
                scrollbar: true,
                pullDownRefresh: true
                // and so on
            });
            console.log(bs);
        })
    }

    render() {
        const { count, list } = this.state;
        return (
            <div className='tb2'>
                <h3 style={{ 'backgroundColor': 'blue', color: 'white' }}>setState的更新机制、长列表渲染</h3>
                <button onClick={() => this.check1()} >setState的异步</button>
                <button onClick={() => this.check2()} >setState的同步</button>
                <h3>{count}</h3>
                <button onClick={() => this.load()} >加载长列表1000条数据</button>
                <div className='wrapper'>
                    <ul>
                        {list.map((o, i) => {
                            return <li key={o.id}>【{i}】{o.id}</li>;
                        })}
                    </ul>
                </div>
                <br />
            </div>
        );
    }
}

export default Tab2;