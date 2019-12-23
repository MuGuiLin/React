import React from 'react';
import '../static/css/menu.css';

import { Link, NavLink} from 'react-router-dom';

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
                name: '商 品',
                href: '/goods'
            }, {
                name: '购物车',
                href: '/cart'
            }, {
                name: '我 的',
                href: '/self'
            }]
        }
    };

    render() {
        console.log('location对象：', window.location, '--------------------哈希：',window.location.hash);

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
                            //原生<a>标签跳转
                            // return <a href={item.href} className={item.href == this.state.show ? 'show' : ''}>{item.name}</a>

                            // <Link/>组件跳转，无高亮状态
                            // return <Link to={item.href} className={item.href == this.state.show ? 'show' : ''}>{item.name}</Link>

                            /* <NavLink/>导航跳转，有高亮状态有3个参数：
                                - isActive 是一个回调函数，返回布尔值 【注：默认情况下，匹配的是URL与to的设置，当有子页面或孙子页面也要高亮时，就需要这个来自定义啦】 如：isActive={() =>{}}
                                - activeStyle 高亮状态的样式 如：activeStyle={{color: 'red'}}
                                - activeClassName 高亮状态的的className 如：activeClassName={'show'}

                                以上的触发条件是：当URL中的路由和 to={}中的路由相同时触发【注：/ 是所有路由都会匹配成功能（因为默认是模糊匹配），所以要改为精确匹配：exact={true} 或 直接exact都行  https://reacttraining.com/react-router/web/api/NavLink/exact-bool】 
                            */
                            return <NavLink to={item.href} exact={true} activeClassName={'show'}>{item.name}</NavLink>

                            // 当有子页面或孙子页面也要亮时，就是能用上面的默认条件了，需要自己添加条件
                            // return <NavLink to={item.href} exact={true} isActive={(match, locat) => {
                            //     console.log('当前匹配路径：',match, '当前URL中的信息：',locat);
                            //     return  match || locat.pathname.startsWith('/view') ? true : false;
                            // }}>{item.name}</NavLink>
                        })
                    }
                </nav>
            </menu>
        );
    }
};