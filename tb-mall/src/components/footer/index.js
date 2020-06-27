import React, { Component } from "react";
import "./index.scss";

export default class Footer extends Component {

    constructor() {
        super();
        this.menu = [
            { name: '首页', icon: 'shouye', link: '/' },
            { name: '列表', icon: 'liebiao', link: '/list' },
            { name: '购物车', icon: 'zhuanfa', link: '/cart' },
            { name: '我的', icon: 'touxiangtongyong', link: '/self' },
        ]
    };

    componentDidMount() {
        
    };

    render() {
        const { active, setActive } = this.props;

        return (
            <footer className="footer">
                <nav>
                    {
                        this.menu.map((o, i) => {
                            return <a className={(active == i) ? 'active' : ''} key={i} onClick={() => setActive(i)} >
                                <i className={'iconfont icon-' + o.icon}></i>
                                <b>{o.name}</b>
                            </a>
                        })
                    }
                </nav>
            </footer>
        );
    };
};