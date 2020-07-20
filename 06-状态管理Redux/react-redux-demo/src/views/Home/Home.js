import React, { Component } from 'react';

import logo from '../../static/img/logo.svg';
import './Home.css';

import store from '../../store';

import List from "../../components/List";
import List1 from "../../components/List1";
import List2 from "../../components/List2";

class Home extends Component {

    componentDidMount() {
        console.debug('***********获取redux中的store的所有数据：***********', store.getState())
    }

    render() {
        return (
            <React.Fragment>
                <header className="App-head">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>数据共享<code>Redux，React-Redux</code>状态管理仓库</p>
                    <a className="App-link" href="https://react-redux.js.org" target="_blank" rel="noopener noreferrer" >https://react-redux.js.org</a>
                </header>

                <hr />
                <h1>* 没有用的redux的组件: List</h1>
                <List />

                <hr/>
                <h1>* 用了redux的组件: List1</h1>
                <List1 />

                <hr />
                <h1>* 用了react-redux的组件: List2</h1>
                <List2 />
            </React.Fragment>
        );
    }
}

export default Home;