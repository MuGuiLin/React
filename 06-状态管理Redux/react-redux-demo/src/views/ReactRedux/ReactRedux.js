import React, { PureComponent } from 'react';

import { connect } from 'react-redux';
 

export default connect(

)(class ReactRedux extends PureComponent {
    constructor() {
        super();

        this.state = {
            nName: '',
            nAge: '',
            nJob: ''
        }
    }

    componentDidMount() {

            // 强制重新渲染当前组件，执行render()方法 state和props数据更新，就会重新render，但是当层级过深时，可能就不会触发渲染，这时候就要用到this.forceUpdate()
            this.forceUpdate();
        
    }

    componentWillUnmount() {
        
    }

    getStore = () => {

    }


    onChangeName = (e) => {
        this.setState({
            // user: { ...user, ...{ name: e.target.value } }
            nName: e.target.value
        });
    }

    onChangeAge = (e) => {
        this.setState({
            nAge: e.target.value
        });
    }

    onChangeJob = (e) => {
        this.setState({
            nJob: e.target.value 
        });
    }

    upState = () => {
        
    }

    render() {
        const { name, age, job } = {}

        return (
            <section className="redux">
                <h1>React-Redux </h1>
                <p>
                    react-redux 是专门用在React中的，它依赖于 redux。
                </p>

                <p>注：redux 和 react-redux 是两个库，但react-redux 依赖 redux，所有要用react-redux 的话，要把redux一起安装哦：npm install -S redux react-redux </p>

                <pre>
                    <b>redux中常用的对象和方法：</b>
                   
                    {'\n'}  * createStore() 用于创建store存储仓库
                    {'\n'}  * combineReducers() 初始化、修改状态(数据)

                    {'\n'}  * reducer 纯函数
                    {'\n'}  * state 对象
                    {'\n'}  * action 对象
                    
                    {'\n'}  * store 对象中有这3个方法
                    {'\n'}      - store.getState() 获取状态值
                    {'\n'}      - store.dispatch() 提交更新状态
                    {'\n'}      - store.subscribe() 变更订阅

                    {'\n'}{'\n'}
                    <b>react-redux中常用的对象和方法：</b>
                    {'\n'}  * provider 组件
                    {'\n'}  * connect 方法
                </pre>
                <p>英文官网：<a href="https://react-redux.js.org" target="_blank">https://react-redux.js.org</a> </p>
                <p>中文官网：<a href="https://www.redux.org.cn" target="_blank">https://www.redux.org.cn</a> </p>

                <h1> 从store中获取到的数据： 昵称：{name}，Age：{age}，职位：{job}</h1>
                <button type="button" onClick={this.getStore} >获取redux中的store的数据</button>
                <p>
                    <label>昵称：<input type="text" onChange={this.onChangeName} /> {this.state.nName}</label>
                </p>
                <p>
                    <label>年龄：<input type="number" onChange={this.onChangeAge} /> {this.state.nAge}</label>
                </p>
                <p>
                    <label>职位：<input type="text" onChange={this.onChangeJob} /> {this.state.nJob}</label>
                </p>
                <button type="button" onClick={this.upState} >修改redux中的store的数据</button>
            </section>
        );
    }
})