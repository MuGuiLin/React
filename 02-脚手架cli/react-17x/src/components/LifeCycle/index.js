import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.css'

import Scu from './scu性能优化生命周期函数'

class LifeCycle extends Component {

    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            initial: true,
            update: false
        }
        console.log('0、定义状态');
    }

    /**
     * 类式组件->生命周期，函数式组件->hook(钩子、副作用函数)
    */
    // 组件初始化阶段（3个）

    // 注：在16.2以后就不建议使用该生命周期了，如果一定要用的的话，需要在前面加上 UNSAFE_ 表示不安全的！！ 
    // componentWillMount() {
    // cwm  生命周期函数快捷简写
    UNSAFE_componentWillMount() {
        console.debug('1、状态准备完毕，即将把状态挂载到真实的DOM中'); // 只执行1次， 可在上DOM树render()之前作最后一次修改状态
        // this.setState({
        //     count: this.props.count
        // });
    }
    // render() {
    //     console.debug('2、正在把状态挂载到真实的DOM中'); // 在render()中只能访问this.props 和 this.state，不能修改状态和DOM输出，因为组件每次更新都会执行render()方法
    // }
    // cdm
    componentDidMount() {
        console.debug('3、完成状态挂载到真实DOM中'); // 只执行1次，在render()成功渲染成真的DOM触发，可以这里操作DOM、请求API数据、订阅函数调用、setInterval()等。
        const dom = document.querySelector('body');
        console.log(dom);

        this.setState({
            initial: false
        });
    }

    // 组件运行中阶段
    // cwrp
    componentWillReceiveProps(nextProps) {
        // 当父组件更新属性(props)触发
    }

    // scu 性能优化生命周期函数
    shouldComponentUpdate(nextProps, nextState) {
        console.log('应该生命周期方法主要用于防止不必要的更新操作，因为每次更新都要执行diff算法、render()等开销'); // 状态每更新1次，执行1次
        // if(老状态this.state !== 新状态nextState) {
        if (JSON.stringify(this.state) !== JSON.stringify(nextState)) {
            return true; // 相当于 koa 和 vue 中的 next()方法一样向下继续执行
        }
        return false; // 返回false会阻止render()调用
    }

    // 注：在16.2以后就不建议使用该生命周期了，如果一定要用的的话，需要在前面加上 UNSAFE_ 表示不安全的！！ 
    // componentWillUpdate(nextProps, nextState) {
    // cwu
    UNSAFE_componentWillUpdate(nextProps, nextState) {
        console.debug('1、状态更新完毕，即将把更新的状态挂载到真实的DOM中'); // 状态每更新1次，执行1次，不能修改属性this.props和状态this.state
        this.setState({
            update: true
        });
    }
    // render() {
    //     console.debug('2、正在把更新后的状态挂载到真实的DOM中'); // 在render()中只能访问this.props 和 this.state，不能修改状态和DOM输出
    // }
    // cdu
    componentDidUpdate(prevProps, prevState) {
        console.debug('3、完成更新后的状态挂载到真实DOM中'); // 状态每更新1次，执行1次，当DOM被更新(修改)时触发，可以获取、修改更新后的DOM
    }

    //组件销毁阶段
    // cwu
    componentWillUnmount() {
        console.debug('组件即将被销毁！'); // 只执行1次，在删除销毁之前触发，可用于一些清理类操作，如清除定时器、事件监所器等。
    }

    render() {
        if (this.state.initial) {
            // 初始化时的 render
            console.debug('2、正在把状态挂载到真实的DOM中');
        }

        if (this.state.update) {
            // 更新时的 render
            console.debug('2、正在把更新后的状态挂载到真实的DOM中');
        }

        return (
            <div className='life-cycle'>
                <h1>React 类式组件 生命周期</h1>
                <hr />
                <br />
                <b>{this.state.count} </b>

                <button onClick={() => {
                    this.setState({
                        count: this.state.count + 1
                    });
                }}>更新组件状态【请在控制台中看结果！！】</button>

                <br />
                <Scu></Scu>
            </div>
        );
    }
}

LifeCycle.propTypes = {
    title: PropTypes.string
};

export default LifeCycle;