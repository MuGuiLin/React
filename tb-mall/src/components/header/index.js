import React, { Component } from "react";
import "./index.scss";

export default class Header extends Component {

    constructor(props) {
        super(props);
        this.menu = ['首页', '商品列表', '购物车', '用户中心']
    };

    componentDidMount() {

    };

    render() {
        return (
            <header className="header">
                {this.menu[this.props.active]}
            </header>
        );
    };
};