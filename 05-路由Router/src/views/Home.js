import React from 'react';
import logo from '../static/img/logo.svg';
import '../static/css/home.css';

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

                <p>{this.state.name} <code>{this.state.age}</code> {sex} {h5}，{dom}，{es}  <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">Learn React</a></p>

                <pre>
                    <h3>路由：</h3>
                        当应用变得复杂的时候，就需要分块的进行处理和展示，传统模式下，我们是把整个应用分成了多个页面，然后通过 <u>URL</u> 进行连接。但是这种方式也有一些问题，每次切换页面都需要重新发送所有请求和渲染整个页面，不止性能上会有影响，同时也会导致整个 <u>JavaScript</u> 重新执行，丢失状态。
                    
                    <h4> SPA 单页应用：</h4>
                        根据不同的URL的变化（用哈希路由、历史记录等方式去监听URL的变化）时，显示并渲染我们指定对应的各个组件(页面)，而这个过程不会发生整个页面的刷新一种页面切换机制，因为这个过程就只是在一个页面中完成的，所以叫：单页面！！！

                    <h4>组件按视图可分为2种：</h4>
                        1、页面组件（视图组件）一般情况下，一个页面组件就是一个完整的页面，并且页面组件可以包涵功能组件
                        2、功能组件 是一个具有一功能的，可复用的组件，如：弹出框，轮播图，柱状图，数据过滤、格式化，状态管理等，它可分为2种：
                            a、带视图的功能组件，如：弹出框，轮播图，柱状图等。
                            b、不带视图、只操作数据的功能组件，如：数据过滤、格式化，状态管理等。

                    <h4>组件存放目录：</h4>
                        1、页面组件一般是放在src目录下的views目录中
                        2、功能件件一般是放在src目录下的components目录中
                </pre>
                
            </header>
        );
    }
};