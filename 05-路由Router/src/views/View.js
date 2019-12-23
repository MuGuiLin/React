import React from 'react';

import '../static/css/goods.css';

export default class View extends React.Component {
    constructor(props) {
        super(props)
        this.taobao = this.taobao.bind(this);
    };

    taobao(e) {
        let { history } = this.props
        console.dir(history);
        // history.push('https://www.taobao.com/search?q=苹果');
        history.push('/goods/?sort=' + this.getUrlPar());
    };

    getUrlPar() {
        // 获取url地址?后面的参数: URLSearchParams()类，是原生中用于解析queryString的一个构造函数，实例化可通过get('参数名')，获取到对应的url参数值
        // 获取url地址?后面的参数：还可以用 npm 中的qs模块https://www.npmjs.com/package/qs
        
        let search = this.props.location.search || window.location.search;
        let qs = new URLSearchParams(search);
        let sort = qs.get('sort');
        // console.log(sort)
        return sort;
    };

    render() {
        /*
            获取路由相关参数(this.props)：【注：如果组件是一个路由组件（就是路由渲染时，是直接访问组件，而不是渲染组件）】。
                路由组件component中的参数（注：视图组件是在render()中！）：
                    - history 里面包括的返回上一个页面的方法goBack()
                    - location 和原生的location一样
                    - match 当前页面路由的相关信息
                    - staticContext

            路由传递过来的数据都在this.props中（props是一个单向数据流，只读的）将其解后就可以得到对应的数据了。

            获取url地址?后面的参数(this.props.location.search 或 原生js window.location.search)


            组件之间的通信方式：
                - 通过url与props（常用）
                - 通过本地存储
                - 通过全局变量(内存)如：window, react.global【注：仅能在单页面应用中使用】
            
            数据通信：
                - ajax 调后端API获取数据库数据。
        */

        console.log('商品详情：', this.props);

        // 解构从父组件传过来的相关数据
        let { history, location, match: { params: { goods_id } }, data } = this.props;
        // console.log(this.props, goods_id, data);      

        // 根据传过来的id找到对应的商品
        let item = data.items.find((o, i) => o.id === Number(goods_id));
        // console.log(item);

        return (
            <section className="views-box">
                <h1>商品详情</h1>
                <hr></hr>

                <div className="info-box">
                    <h2>{item.name}
                        <button onClick={this.taobao}>带参返回</button>
                        <button onClick={history.goBack}>纯返回</button>
                    </h2>
                    <p>ID：{goods_id}</p>
                    <p>排序：
                        {/* 非受控组件 默认值初始化 defaultValue */}
                        <select defaultValue={this.getUrlPar()}>
                            <option value="asc"> 升 序 </option>
                            <option value="desc"> 降 序 </option>
                        </select>
                    </p>
                    <p><img src={item.image} /></p>
                    <p>
                        <i>RMB：</i>
                        <b>{(item.price / 100).toFixed(2)}</b>
                    </p>
                </div>
            </section>
        )
    }
};