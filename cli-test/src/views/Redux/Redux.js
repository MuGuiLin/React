import React, { Component } from 'react';

import './Redux.scss';

// 这样就可以直接获取store中的数据，想在全局哪里用就在哪里引入，但是有个问题如果组件嵌套层次太深，引入时就 import store from "../../../../../../store"; 不优雅
import store from "../../store";

class Redux extends Component {

    getStore = () => {
        console.log('获取store中的数据：', store.getState())
    };

    upStore = () => {
        // 修改store中的数据
        store.dispatch({
            type: 'newName',
            payload: 'mupiao'
        });

    };

    componentDidMount() {
        // 用dispatch修改store中的数据时候，都会触发subscribe这个方当
        store.subscribe(function () {
            console.log('store中的数据被修改了：', store.getState());
        });
    }
    render() {
        return (
            <div className="redux">
                <h1>Redux</h1>
                <h3>Redux 是 JavaScript 状态容器</h3>
                <p>
                    提供可预测化的状态管理。 (如果你需要一个 WordPress 框架，请查看 Redux Framework。)
                    可以让你构建一致化的应用，运行于不同的环境（客户端、服务器、原生应用），并且易于测试。
                    不仅于此，它还提供 超爽的开发体验，比如有一个时间旅行调试器可以编辑后实时预览。
                    Redux 除了和 React 一起用外，还支持其它界面库。 它体小精悍（只有2kB，包括依赖）。
                </p>
                <p>英文官网文档：<a href="http://redux.js.org" target="_blank" > http://redux.js.org</a></p>
                <p>中文官网文档：<a href="https://www.redux.org.cn" target="_blank" > https://www.redux.org.cn</a></p>

                <button type="button" onClick={this.getStore} >获取redux中store的数据</button>
                <button type="button" onClick={this.upStore} >修改redux中store的数据</button>
            </div>
        );
    };
}

export default Redux;