import React, { Component } from 'react'

import Child1 from './1-非父子通信-状态提升'
import Child2 from './2-非父子通信-订阅发布模式'
import Child3 from './3-非父子通信-context方案'

import './index.css'

export default class Communication extends Component {
    state = {
        active: 0,
        nav: [
            {
                id: 1,
                name: '中间者模式'
            }, {
                id: 2,
                name: '发布订阅模式'
            }, {
                id: 3,
                name: 'context方案'
            }
        ],
    }
    main() {
        switch (this.state.active) {
            case 1:
                return <Child2 />;
            case 2:
                return <Child3 />;
            // case 3:
            // return <Child1 />;
            default:
                return <Child1 />;
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
            <div className='Communication'>
                <h1>非父子通信</h1>

                {this.main()}

                <ul className='nav'>
                    {this.state.nav.map((o, i) => {
                        return <li className={this.state.active === i ? 'active' : ''} key={o.id} onClick={() => this.show(i)}>{o.name}</li>;
                    })
                    }
                </ul>
            </div>
        )
    }
}
