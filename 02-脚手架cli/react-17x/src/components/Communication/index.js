import React, { Component } from 'react';

import Child1 from './1-非父子(跨级)通信-状态提升';
import Child2 from './2-非父子(跨级)通信-订阅发布模式';
import Child3 from './3-非父子(跨级)通信-context方案';
import Child4 from './4-非父子(跨级)通信-useContext方案';
import Child5 from './React插槽';
import Child6 from './React插槽实例';

import './index.css';

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
            }, {
                id: 4,
                name: 'useContext方案'
            }, {
                id: 5,
                name: 'React插槽'
            }, {
                id: 6,
                name: 'React插槽实例'
            }
        ],
    }
    main() {
        switch (this.state.active) {
            case 1:
                return <Child2 />;
            case 2:
                return <Child3 />;
            case 3:
                return <Child4 />;
            case 4:
                return <Child5 />;
            case 5:
                return <Child6 />;
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
