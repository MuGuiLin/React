import React from 'react';
import ReactDOM from 'react-dom';

import App from './views/App';
import './static/css/index.css';
import * as serviceWorker from './serviceWorker';


// 引入react-router-dom路由管理容器模块
import { HashRouter, BrowserRouter } from 'react-router-dom';

// 引入react-redux状态管理容器模块
import { Provider } from 'react-redux';
import store from './store';
// console.log('查看redux仓库初始数据：', store.getState())


ReactDOM.render(

    // 全局配置状态管理容器 将仓库数据置入到 Provider容器组件 后，在各个组件中导入import {connect} from 'react-redux'，用 connect()(组件名) 导出，就可以在this.props中得到数据啦！！
    <Provider store={store} >

        {/* 全局配置路由管理容器 */}
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
