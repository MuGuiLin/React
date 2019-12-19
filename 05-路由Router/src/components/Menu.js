import React from 'react';
import '../static/css/menu.css';

import { Link } from 'react-router-dom';

export default class Menu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: 0,
            hash_menu: [{
                name: '首 页',
                href: '/'
            }, {
                name: '关 于',
                href: '/#about'
            }, {
                name: '我 的',
                href: '/#self'
            }],
            baor_menu: [{
                name: '首 页',
                href: '/'
            }, {
                name: '关 于',
                href: '/about'
            }, {
                name: '我 的',
                href: '/self'
            }]
        }
    };

    render() {
        return (
            <menu>
                <h1>React-Router</h1>
                <hr></hr>
                <nav>
                    {
                        this.state.baor_menu.map((item, index) => {
                            // 1、HashRouter 哈希方式 
                            // <a  href="/#about">关 于</a>

                            // 2、BrowserRouter 历史记录方式 会刷新页面
                            // <a  href="/about">关 于</a>

                            // 3、Link 自动识别以上两种方式
                            // <Link className="App-link" to="/#about">关 于</Link>
                            // <Link className="App-link" to="/about">关 于</Link>

                            // return <a href={item.href} className={index == this.state.show ? 'show' : ''}>{item.name}</a>
                            return <Link to={item.href} className={index == this.state.show ? 'show' : ''}>{item.name}</Link>
                        })
                    }
                </nav>
            </menu>
        );
    }
};