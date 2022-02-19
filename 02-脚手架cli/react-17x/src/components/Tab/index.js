import React, { Component } from 'react'

import Tab1 from './tab1';
import Tab2 from './tab2';
import Tab3 from './tab3';

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
            }
        ]
    }
    main() {
        switch (this.state.active) {
            case 1:
                return <Tab2 />;
            case 2:
                return <Tab3 />;
            default:
                return <Tab1 />;
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
                    {this.state.active === 2 && <Tab3></Tab3>} */}

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
