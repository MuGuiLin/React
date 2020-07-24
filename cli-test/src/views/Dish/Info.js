import React, { Component } from 'react';

import axios from 'axios';

import './Info.scss';

class Info extends Component {
    constructor() {
        super();
        this.state = {
            info: []
        }
    }

    goBack = () => {
        this.props.history.goBack();
    }

    componentDidMount() {
        console.log(this.props.match.params.id)
        axios.get('http://a.itying.com/api/productcontent', {
            params: {
                id: this.props.match.params.id || '5ac1eb591a6b2f48fcb06210'
            }
        }).then((res) => {
            console.log(res.data.result);
            this.setState({
                info: res.data.result[0]
            })

        }).catch(function (error) {
            console.log(error);
        }).finally(function () {
            // always executed
        });
    }

    render() {

        const { info } = this.state;
        return (
            <section className="dishinfo">
                <button type="button" className="back-btn" onClick={this.goBack} > 返回列表</button>

                <div className="banner" >
                    <img src={"http://a.itying.com/" + info.img_url} />
                </div>
                <div className="detail">
                    <div className="jumbotron">
                        <h1>{info.title}</h1>
                        <hr />
                        <h4 className="price">
                            促销价：￥{info.price}元<span>原价：<s>￥{info.price * 1.25}元</s></span>
                        </h4>
                        <ul className="bg-info">
                            <li>菜品类别：{info.catename}</li>
                            <li>菜品库存：{info.num}</li>
                            <li>菜品编号：{info.product_bar_code}</li>
                            <li>菜品描述：{info.description}</li>
                        </ul>
                        <br />
                        <button type="button" className="btn"> 立即购买</button>
                        <button type="button" className="btn red"> 加入购物车</button>

                        <div className="panel">
                            <div className="panel-heading">
                                <h3 className="panel-title">菜品详情：</h3>
                            </div>
                            <div className="panel-body">
                                <article dangerouslySetInnerHTML={{ __html: info.content }}></article>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Info;