import React from 'react';

import { List, TextField, Button } from '@material-ui/core';

import Item from './Item';

export default class Lists extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [
                {
                    id: 1,
                    name: 'Apple',
                    rmb: 12.00
                },
                {
                    id: 1,
                    name: 'Orange',
                    rmb: 5.80
                }
            ]
        };

        this.addList = this.addList.bind(this);
    };

    addList(e) {
        let text = document.querySelector('#text');

        //这里没有用redux来进行管理，数据也是要当前组件的state中！！！
        this.setState({
            items: [...this.state.items, { name: text.value || '打酱油啦哈!' }]
        }, () => {
            text.value = '';
        })
    };

    render() {
        const items = this.state.items;
        return (
            <section>
                <TextField label="请输入列表内容" variant="outlined" size="small" color="primary" id="text" type="text" />
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