import React from 'react';

import { List, TextField, Button } from '@material-ui/core';

import Item from './Item';

// 这里就不用导入store仓库了，因为在index.js已经导入，所以直接导入import {connect} from 'react-redux';
import { connect } from 'react-redux';

/*
connect() 是一个工厂函数，在调用以后会返回一个包装组件（高阶组件），所以要在调用后在传入组件。
    *connect()方法的第一个参数是一个函数
        - 该函数的第一个参数就是 store 中的 state 
        - 该函数的返回值将被解构赋值给当前组件的 props中

    * connect()方法的第二个参数可以是对象，也可以是一个函数。
*/
export default connect((state) => {

    // 注：这里的state 就是store仓库中的state，所以从这里返回的数据在应该组件被调用时，会解构赋值给props，然后在上面的this.props中就可以拿到对应的数据啦！！！
    console.debug('connect() -> state', state);

    // return state;  // 将store仓库中所有的数据都返回给props

    return {
        items: state.items  // 只返回items数据返回给props
    };
}
    // 注：如在这里自定义了更新方法，那么 this.props.dispatch 将会被覆盖掉
    // , {
    //     addItems: (data) => {
    //         return data;
    //     },

    //     upItems(data) {
    //         return data;
    //     }
    // }
)(class List2 extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            text: ''
        }

        this.addList = this.addList.bind(this);
    };

    change(e) {
        this.setState({
            text: e.target.value
        })
    };

    addList(e) {

        //这里用redux来进行管理了，数据是存在store仓库中的！！！
        this.props.dispatch({
            type: 'ADD-ITEMS',
            data: { name: this.state.text || '打酱油啦哈!' }
        });

        // this.props.addItems({
        //     type: 'ADD-ITEMS',
        //     data: { name: this.state.text || '打酱油啦哈!' }
        // })

        // this.props.upItems({
        //     type: 'UP-ITEMS',
        //     data: { name: this.state.text || '打酱油啦哈!' }
        // })

        this.setState({
            text: ''
        });

    };

    componentDidMount() {

        console.log('注：用react-redux中connect来更新store仓库后，会自动更新到redner()中的哦！');

    }

    render() {

        // 获取store中的数据，默认是store全部的数据，可以在connect()方法设置指定想要的数据，它会在props中出现，
        console.debug('connect() -> render() -> this.props', this.props);
        let { items } = this.props;
        return (
            <section>
                <TextField label="请输入列表内容" variant="outlined" size="small" color="primary" type="text" value={this.state.text} onChange={(e) => { this.change(e) }} />
                <Button onClick={this.addList} variant="contained" size="large" color="secondary">添加商品到列表</Button>
                <List component="nav" className="list" aria-label="main mailbox folders">
                    {items.map((o, i) => {
                        return <Item key={i} text={o.name}></Item>
                    })
                    }
                </List>
            </section>
        )
    }
});