import React, { Component } from 'react'

import Tab1 from './tab1';
import Tab2 from './tab2';
import Tab3 from './tab3';
import Tab4 from './tab4';

import './index.css'

export default class Tab extends Component {
    state = {
        active: 0,
        nav: [
            {
                id: 1,
                name: '首页'
            }, {
                id: 2,
                name: '关于'
            }, {
                id: 3,
                name: '我的'
            }, {
                id: 4,
                name: '受控'
            }
        ],
        obj: {
            data: {
                key: 666,
                arr: ['我是传给子组件属性对象']
            }
        }
    }
    main() {
        switch (this.state.active) {
            case 1:
                return <Tab2 />;
            case 2:
                return <Tab3 title="我是传给子组件属性标题，我会覆盖子组件在defaultProps中设置的title的值" {...this.state.obj} />;
            case 3:
                return <Tab4 />;
            default:
                return <Tab1 title="我是传给子组件属性标题，我会覆盖子组件在defaultProps中设置的title的值" {...this.state.obj} />;
            // break;
        }
    }
    show(i) {
        this.setState({
            active: i
        })
    }
    render() {
        return (
            <div className='tab'>
                <header>
                    <h2>导航、选项卡、长列表</h2>
                </header>
                <main>
                    {/* 条件渲染方式1 */}
                    {/* {this.state.active === 0 && <Tab1></Tab1>}
                    {this.state.active === 1 && <Tab2></Tab2>}
                    {this.state.active === 2 && <Tab3></Tab3>} 
                    {this.state.active === 3 && <Tab4></Tab4>} 
                    */}

                    {/* 条件渲染方式2 */}
                    {this.main()}
                </main>
                <footer>
                    <ul className='nav'>
                        {this.state.nav.map((o, i) => {
                            return <li className={this.state.active === i ? 'active' : ''} key={o.id} onClick={() => this.show(i)}>{o.name}</li>;
                        })
                        }
                    </ul>
                </footer>
            </div>
        )
    }
}
