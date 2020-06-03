import React from 'react';

import logo from '../static/img/logo.svg';
import '../static/css/App.css';

import List from '../components/List';
import User from './User';

function App() {
    return (
        <section className="App">

            <header className="App-head">
                <img src={logo} className="App-logo" alt="logo" />
                <p>数据共享<code>Redux，React-Redux</code>状态管理仓库</p>
                <a className="App-link" href="https://react-redux.js.org/" target="_blank" rel="noopener noreferrer" >GET STARTED</a>
            </header>

            <section className="App-main">
                <List></List>
                <User></User>
            </section>
        </section>
    );
};

export default App;
