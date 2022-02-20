import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Tab1 extends Component {

    // props属性数据类型验证
    static propTypes = {
        title: PropTypes.string,
        data: PropTypes.object
    };

    // props属性默认值设置
    static defaultProps = {
        title: '我是默认标题',
        data: {
            id: 1,
            arr: ['666']
        }
    };

    constructor() {
        super();

        // 注：当状态被改变时，会执行render()重新渲染DOM
        this.state = {
            list: []
        };

        this.keywords = React.createRef();
    };

    /*
        state VS props

        state 的主要作用是用于组件保存、控制、修改自己的可变状态，state是在组件内部初始化的，只能在组件本身内部中修改，外部的组件是不能修改的

        props 的主要作用是用于接收父组件传过来的属性参数，props是在父组件中传来的，在子组件中是只读的，只能在父组件本身内部中修改，子组件是不能修改的（当然子组件也可通过调用父组件中的修改方法来达到修改props的目的）
    
        没有state的组件叫无状态组件，而设置了state的组件叫有状态组件，有状态组件能处理很复杂的业务逻辑，但是为了降低代码的维护难度和增强复用性，我们应该尽量减少使用有状态的组件，通过有状态控制无状态（此时无状态组件就被称为【受控组件】）。
    */

    componentDidMount() {
        fetch('https://m.maizuo.com/gateway', {
            headers: {
                'X-Client-Info': '{ "a": "3000", "ch": "1002", "v": "5.2.0", "e": "16452716063599453176987649", "bc": "310100" }',
                'X-Host': 'mall.film-ticket.film.list'
            }
        }).then(res => res.json()).then((res) => {
            console.log(res);
            this.setState({
                list: res.data
            });
        }).catch((err) => {
            console.log(err);
        });
    }

    search() {
        const arr = ['abc', 'bcbdb', 'acc', 'ddad', 'eece', 'fffa'];

        // 模糊搜索
        // const newArr = arr.filter(o => o.includes('a')); // 例：返回数组中所有带a的 新数组
        const newArr = arr.filter(o => o.toUpperCase().includes(this.keywords.current.value.toUpperCase()));

        this.setState({
            list: newArr
        });
    }

    render() {
        console.log(11111, this.props) ;
        return (
            <div>
                <h3 style={{ 'backgroundColor': 'red' }}>模糊搜索</h3>
                <input type="search" ref={this.keywords} placeholder="模糊搜索!" />
                <button onClick={() => this.search()} >搜索</button>

                {this.state.list.length && this.state.list.map((o, i) => {
                    return <p key={i} >{o}</p>
                })}
                <br />
                <br />
                <br />
            </div>
        );
    }
}


// 以在类属性，如果在类中的static设置过，这里就不用设置了，反之就在这里设置，二选一，注：在函数式组件中就只能在这里设置，因为它没有this

/*

// props属性数据类型验证
Tab1.propTypes = {
    title: PropTypes.string,
    data: PropTypes.object
};

// props属性默认值设置
Tab1.defaultProps = {
    title: '我是默认标题',
    data: {
        key: 1,
        xxx: [666]
    }
};

*/

export default Tab1;