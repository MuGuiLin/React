import React, { Component } from 'react';

import './style.css';


class Navbar extends Component {
    render() {
        return (
            <div className='navbar'>
                <b>Navbar</b>

                {
                    // 本来这个按扭 <button onClick={() => this.show()} >{this.state.show ? '隐藏左侧菜单' : '显示左侧菜单'}</button>是写在这里的，为了减少父子通信，就以插槽的形式在写在了父组件中啦！！
                    this.props.children
                }
            </div>
        )
    }
}

class Sidebar extends Component {
    render() {
        return (
            // <div className={['sidebar', this.props.show ? '' : 'hide'].join(' ')}>
            <div className={`sidebar ${this.props.show ? '' : 'hide'}`}>
                <b>Sidebar</b>
                <ul>
                    <li>左侧菜单</li>
                    <li>左侧菜单</li>
                    <li>左侧菜单</li>
                    <li>左侧菜单</li>
                    <li>左侧菜单</li>
                    <li>左侧菜单</li>
                </ul>
            </div>
        )
    }
}

export default class ReactSlot extends Component {
    state = {
        show: true,
    }
    show() {
        this.setState({
            show: !this.state.show
        })
    }
    render() {
        return (
            <div className='slot' >
                <Navbar>
                    { /*下面这个button按扭是以插槽的形式在子组件Navbar中显示，但是在父组件这里定义的，自然也就能直接获取和操作父组的状态啦！！ */}
                    <button onClick={() => this.show()} >{this.state.show ? '隐藏' : '显示'}左侧菜单 ——【这个按扭在父组件以插槽的形式定义的】</button>
                </Navbar>

                {/* {this.state.show && <Sidebar />} */}
                <Sidebar show={this.state.show} />
            </div>
        )
    }
}
