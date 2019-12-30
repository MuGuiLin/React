import React from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';

// 在这里先导入store仓库
import store from '../store';
import Item from './Item';

class Lists extends React.Component {
    constructor(props) {
        super(props);

        // console.log(store.getState());

        this.addList = this.addList.bind(this);
    };

    addList(e) {
        let text = document.querySelector('#text');
        
        //这里用redux来进行管理了，数据是存在store仓库中的！！！
        store.dispatch({
            type: 'ADD_GOODS',
            payload: {
                name: text.value || '打酱油啦哈!'
            }
        });

        text.value = "";

        // 注：这里的数据虽然修改了，但dom还是不会重新渲染的，因为store.dispatch的修改，不是this.state，也不是this.props
        console.log('goods数据修改啦：', store.getState())
    };

    render() {

        let {goods} = store.getState();

        return (
            <section>
                <TextField label="请输入列表内容" variant="outlined" size="small" color="primary" id="text" type="text" />
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

export default Lists