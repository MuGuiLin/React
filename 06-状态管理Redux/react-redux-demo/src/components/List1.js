import React from 'react';

import { List, TextField, Button } from '@material-ui/core';

import Item from './Item';

// 在这里先导入store仓库
import store from '../store';

export default class Lists extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            text: ''
        }

        // console.log(store.getState());
        this.addList = this.addList.bind(this);
    };

    change(e) {
        this.setState({
            text: e.target.value
        })
    };

    addList(e) {

        //这里用redux来进行管理了，数据是存在store仓库中的！！！
        store.dispatch({
            type: 'ADD-ITEMS',
            data: { name: this.state.text || '打酱油啦哈!' }
        });
        this.setState({
            text: ''
        });

    };

    componentDidMount() {
        store.subscribe((state) => {

            console.log('items数据修改啦：', store.getState())
        });
    };

    render() {

        // 获取store中的数据
        let { items } = store.getState();
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
};