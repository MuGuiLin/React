import React from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';

import Item from './Item';

export default class Lists extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: '',
            goods: [
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
        }

        this.change = this.change.bind(this);
        this.addList = this.addList.bind(this);
    };

    change(e) {
        // this.setState({
        //     text: e.target.value
        // })
    };

    addList(e) {
        let state = this.state;
        let text = document.querySelector('#text').value || '打酱油啦哈!';

        //这里没有用redux来进行管理，数据也是要当前组件的state中！！！
        this.setState({
            goods: [...state.goods, text]
        })
    };

    render() {
        const goods = this.state.goods;
        return (
            <section>
                <TextField label="请输入列表内容" variant="outlined" size="small" color="primary" id="text" type="text" onChange={this.change} />
                <Button onClick={this.addList} variant="contained" size="large" color="secondary">添加商品到列表</Button>
                <List component="nav" className="list" aria-label="main mailbox folders">
                    {
                        goods.map((o, i) => {
                            return <Item key={i} text={o.name}></Item>
                        })
                    }
                </List>
            </section>
        )
    }
};