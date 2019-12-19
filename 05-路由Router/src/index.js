import React from 'react';
import ReactDOM from 'react-dom';

import {HashRouter, BrowserRouter} from 'react-router-dom';

import './static/css/index.css';
import App from './views/App';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(

    // 哈希路由方式 - 无历史记录，不刷新页面
    <HashRouter>
        <App />
    </HashRouter>
    

    // 历史记录路由方式 - 有历史记录，会刷新页面
    // <BrowserRouter>
    //     <App />
    // </BrowserRouter>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
