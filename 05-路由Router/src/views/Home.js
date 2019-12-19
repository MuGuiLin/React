import React from 'react';
import logo from '../static/img/logo.svg';

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // 第1种、接收父级参数方式 初始1次 【注：父级传过来的参数都是单向的，也就是只能读，不能改】
            name: this.props.sendData.name || '',
            age: this.props.sendData.age || ''
        }

    };

    render() {
        console.log('单向数据流：this.props', this.props);
        // 第2种、接收父级参数方式 在render中接收 【注：render函数 在当数据每变化1次时，会重新(执行一次render函数)渲染1次】
        let { sex, job: { h5, js: { dom }, es } } = this.props.sendData;

        return (
            <header className="App-header">

                <img src={logo} className="App-logo" alt="logo" />

                <p>{this.state.name} <code>{this.state.age}</code> {sex} {h5}，{dom}，{es}</p>

                <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">Learn React</a>

            </header>
        );
    }
};