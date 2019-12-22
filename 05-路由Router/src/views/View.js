import React from 'react';

import '../static/css/goods.css';

export default class View extends React.Component {
    constructor(props) {
        super(props)
    };

    render() {
        /*
            获取路由相关参数：【注：如果组件是一个路由组件（就是路由渲染时，是直接访问组件，而不是渲染组件）】。
                路由组件component中的参数（注：视图组件是在render()中！）：
                    - history 里面包括的返回上一个页面的方法goBack()
                    - location 和原生的location一样
                    - match 当前页面路由的相关信息
                    - staticContext

            路由传递过来的数据都在this.props中（props是一个单向数据流，只读的）将其解后就可以得到对应的数据了。

            组件之间的通信方式：
                - 通过url与props（常用）
                - 通过本地存储
                - 通过全局变量(内存)如：window, react.global
        */

        let { history, location, match: { params: { goods_id } }, data } = this.props;

        console.log(this.props, goods_id, data);

        let item = data.items.find((o, i) => o.id === Number(goods_id));

        console.log(item)

        return (
            <section className="views-box">
                <h1>商品详情</h1>
                <hr></hr>

                <div className="views-box">
                    <h2>{item.name}
                        <button onClick={history.goBack}>返 回</button>
                    </h2>
                    <p>ID：{goods_id}</p>
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