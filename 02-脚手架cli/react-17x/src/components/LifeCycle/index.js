import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LifeCycle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: ''
        }
        console.log('0、定义状态');
    }

    /**
     * 类式组件->生命周期，函数式组件->hook(钩子、副作用函数)
    */
    // 组件初始化阶段（3个）
    
    componentWillMount() {
        console.debug('1、状态准备完毕，即将把状态挂载到真实的DOM中'); // 只执行1次， 可在上DOM树render()之前作最后一次修改状态
        this.setState({
            title: this.props.title
        });
    }
    render() {
        // console.debug('2、正在把状态挂载到真实的DOM中'); // 在render()中只能访问this.props 和 this.state，不能修改状态和DOM输出，因为组件每次更新都会执行render()方法
    }
    componentDidMount() {
        console.debug('3、完成状态挂载到真实DOM中');// 只执行1次，在render()成功渲染成真的DOM触发，可以这里操作DOM、请求API数据、订阅函数调用、setInterval()等。
        const dom = document.querySelector('body');
        console.log(dom);
    }

    // 组件运行中阶段
    componentWillReceiveProps(nextProps) {
        // 当父组件更新属性(props)触发
    }
    shouldComponentUpdate(nextProps, nextState) {
        // 返回false会阻止render()调用
    }
    componentWillUpdate(nextProps, nextState) {
        // 不能修改属性this.props和状态this.state
    }
    render() {
        // 在render()中只能访问this.props 和 this.state，不能修改状态和DOM输出
    }
    componentDidUpdate(prevProps, prevState) {
        // 当DOM被修改时触发，可以修改DOM
    }

    //组件销毁阶段
    componentWillUnmount() {
        // 在组件删除销毁之前触发，可用于一些清理类操作，如清除定时器、事件监所器等。
    }

    render() {
        console.debug('2、正在把状态挂载到真实的DOM中');
        return (
            <div>

            </div>
        );
    }
}

LifeCycle.propTypes = {
    title: PropTypes.string
};

export default LifeCycle;