import React from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter, HashRouter} from 'react-router-dom';

/*
    react-router-dom中的容器组件：用于包裹URL所对应的【根组件】，【容器组件是最顶上，最外层的组件】有以下5种： 一般<BrowserRouter> 和 <HashRouter> 用得多一点，当然也要看业务场景！！
        1、<BrowserRouter>
        2、<HashRouter>
        3、<MemoryRouter>
        4、<NativeRouter>
        5、<StaticRouter>
*/

import './static/css/index.css';
import App from './views/App';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    // 历史记录路由方式 - 有历史记录 基于HTML5的
    // <BrowserRouter>
    //     <App />
    // </BrowserRouter>

    // 哈希路由方式 - 无历史记
    <HashRouter>
        <App />
    </HashRouter>
    
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
