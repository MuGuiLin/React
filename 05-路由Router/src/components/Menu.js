import React from 'react';
import '../static/css/menu.css';

import { Link } from 'react-router-dom';

export default class Menu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: '/',
            menu: [{
                name: '首 页',
                href: '/'
            }, {
                name: '关 于',
                href: '/about/666'
            }, {
                name: '我 的',
                href: '/self'
            }, {
                name: '商 品',
                href: '/goods'
            }]
        }
    };

    render() {
        console.log('location对象：', window.location, '--------------------哈希：',window.location.hash);

        window.addEventListener('hashchange', (e) => {
            // console.log('********监听哈希变化：', e.target.location);
            // 点快了这里会有问题，待研究！
            this.setState({
                show:e.target.location.hash
            })
        });

        return (
            <menu>
                <h1>React-Router</h1>
                <hr></hr>
                <nav>
                    {
                        /*
                        1、HashRouter 哈希方式 注：用 <a>标签 来跳转页面时，要在index.js中把内容组件换成<HashRouter><App /></HashRouter>包起来才行哦！
                        <a href="#/">首 页</a>
                        <a href="#/about">关 于</a>

                        2、BrowserRouter 历史记录方式 注：用 <a>标签 来跳转页面时，要在index.js中把内容组件换成<BrowserRouter><App /></BrowserRouter>包起来才行哦！
                        <a href="/">首 页</a>
                        <a href="/about">关 于</a>
                        【注：这里有个坑哦，如果在BrowserRouter方式中 用<a>标签来跳转页面时，请仔细看（整个页面都刷新了）哦！！】 所以就有了下面的第3种Link方式啦！

                        3、Link 以上两种方式都可以 注：用 <Link />组件 来跳转页面时，就没所谓了用HashRouter，BrowserRouter都行！其是<Link to=""/>最终也是<a href="">，但<Link/>不会刷新整个页面（因为<Link/>组件重新定义(代理、监听)了<a>标签跳事件[添加了click方法]，并阻止<a>标签的默认跳转事件，可以打开浏览器控制台，选择Elements选项卡，再选中<a>标签，然后看中的Event Listeners面板就可以看到dom所绑定的相关事件啦）！
                        <Link className="App-link" to="#/about">关 于</Link>
                        <Link className="App-link" to="/about">关 于</Link>
                    */
                    }
                    <a href="/">刷 新</a>
                    {
                        this.state.menu.map((item, index) => {
                            // return <a href={item.href} className={item.href == this.state.show ? 'show' : ''}>{item.name}</a>
                            // return <Link to={item.href} className={item.href == this.state.show ? 'show' : ''}>{item.name}</Link>
                            return <Link to={item.href} className={'#' + item.href == this.state.show ? 'show' : ''}>{item.name}</Link>
                        })
                    }
                </nav>
            </menu>
        );
    }
};