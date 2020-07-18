import React, { Component } from 'react';
import logo from '../../static/img/logo.svg';

import store from '../../store';
import './Home.css';

class Home extends Component {

    componentDidMount() {
        console.debug('***********获取redux中的store的所有数据：***********', store.getState())
    }

    render() {
        return (
            <header className="App-head">
                <img src={logo} className="App-logo" alt="logo" />
                <p>数据共享<code>Redux，React-Redux</code>状态管理仓库</p>
                <a className="App-link" href="https://react-redux.js.org" target="_blank" rel="noopener noreferrer" >https://react-redux.js.org</a>
            </header>
        );
    }
}

export default Home;