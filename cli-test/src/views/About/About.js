import React, { Component } from 'react';
import './About.scss';

import security from '../../static/img/security.png';


class About extends Component {
    constructor() {
        super();
    };

    componentDidMount() {
        // 组件实例初始完成时
    }

    render() {
        return (
            <div className="about">
                <h1>About React.JS</h1>
                <h3>用于构建用户界面的 JavaScript 库</h3>
                <p>
                    React 起源于 Facebook 公司的内项目，由于该公司对当时市场上的 JavaScript MVC 框架都不满意，就决定自己写一套，用来架设 Instagram 的网站。做出来以后，发现这套东西很好用，就在2013年5月开源了，用于构建用户界面的 JS库。
                    由于 React 的设计思想极其独特，属于革命性创新，性能出众，代码逻辑却非常简单。所以，越来越多的人开始关注和使用，是现在前端领域中最流行框架之一。
                </p>
                <p>英文官网文档：<a href="https://reactjs.org" target="_blank" > https://reactjs.org</a> </p>
                <p>中文官网文档：<a href="https://react.docschina.org" target="_blank" > https://react.docschina.org</a></p>
                <img src={security} />
            </div>
        );
    }
}

export default About;