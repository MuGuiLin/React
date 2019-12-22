import React from 'react';
import { Link } from 'react-router-dom';

import Item from "../components/Item";

import '../static/css/goods.css';

export default class Goods extends React.Component {
    constructor(props) {
        super(props)
    };

    render() {
        console.log(this.props);
        let { goods: list } = this.props;
        console.log(list);
        return (
            <section className="views-box">
                <h1>商品列表</h1>
                <hr></hr>

                <select onChange={this.sort}>
                    <option value="desc">降序</option>
                    <option value="asc">升序</option>
                </select>

                <ul className="item-list">
                    <li className="head">
                        <span>序号</span>
                        <span>名称</span>
                        <span>价格</span>
                        <span>操作</span>
                    </li>
                    {
                        // list.items.map((item, index) => {
                        //     return (<li key={item.id}>
                        //         <span>{item.id}</span>
                        //         <span>{item.name}</span>
                        //         <span>￥{(item.price / 100).toFixed(2)}</span>
                        //         <span>
                        //             <button>详情信息</button>
                        //         </span>
                        //     </li>)
                        // })


                        // 将列表拆分为一个独立的功能组件
                        list.items.map((item, index) => <Item key={item.id} item={item}></Item>)
                    }
                </ul>
            </section>
        )
    }
};