import React from 'react';
import { Link } from 'react-router-dom';

import Item from "../components/Item";
import Page from "../components/page";

import '../static/css/goods.css';

export default class Goods extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: this.sort(),  //初始化数据
            sortVal: 'asc'
        }
        this.order = this.order.bind(this);

    };

    //数据排序
    sort(type = 'asc') {
        return this.props.goods.items.sort((a, b) => {
            return 'desc' == type ? b.price - a.price : a.price - b.price;
        });
    };

    order(e) {
        console.dir(e.target.value);

        this.setState({
            sortVal: e.target.value,
            items: this.sort(e.target.value)
        });
    };

    getUrlPar() {
        // 获取url地址?后面的参数: URLSearchParams()类，是原生中用于解析queryString的一个构造函数，实例化可通过get('参数名')，获取到对应的url参数值
        // 获取url地址?后面的参数：还可以用 npm 中的qs模块https://www.npmjs.com/package/qs
        
        let search = window.location.search;
        let qs = new URLSearchParams(search);
        return qs.get('page') || 1;
    };

    render() {
        console.log(this.props);
        let items = this.state.items;

        return (
            <section className="views-box">
                <h1>商品列表</h1>
                <hr></hr>

                <div>
                    <b>排序方式：</b>
                    <select value={this.state.sortVal} onChange={this.order}>
                        <option value="asc">-- 请选择（默认升序） --</option>
                        <option value="asc"> 升 序 </option>
                        <option value="desc"> 降 序 </option>
                    </select>
                </div>
                <ul className="item-list">
                    <li className="head">
                        <span>序号</span>
                        <span>名称</span>
                        <span>价格</span>
                        <span>操作</span>
                    </li>
                    {
                        // items.map((item, index) => {
                        //     return (<li key={item.id}>
                        //         <span>{item.id}</span>
                        //         <Link to={'/view/' + item.id}>{item.name}</Link>
                        //         <span>￥{(item.price / 100).toFixed(2)}</span>
                        //         <span>
                        //             <button>详情信息</button>
                        //         </span>
                        //     </li>)
                        // })

                        // 将列表拆分为一个独立的功能组件
                        items.map((item, index) => <Item key={item.id} item={item} sort={this.state.sortVal} ></Item>)
                    }
                </ul>
                <hr></hr>
                {/* <Page history={this.props.history} pages={10} page={this.state.page} ></Page> */}
                <Page pages={6} page={this.getUrlPar()}></Page>
            </section>
        )
    }
};