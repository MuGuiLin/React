import React from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';

// 这里就不用导入store仓库了，因为在index.js已经导入，所以直接导入import {connect} from 'react-redux';
import {connect} from 'react-redux';

import Item from './Item';

class Lists extends React.Component {
    constructor(props) {
        super(props);

        this.addList = this.addList.bind(this);
    };

    addList(e) {
        let text = document.querySelector('#text');
        
        //这里用redux来进行管理了，数据是存在store仓库中的！！！
        this.props.dispatch({
            type: 'ADD_GOODS',
            payload: {
                name: text.value || '打酱油啦哈!'
            }
        });

        text.value = "";
    };

    render() {
        console.log(this.props)
        let {goods} = this.props;

        return (
            <section>
                <TextField label="请输入列表内容" variant="outlined" size="small" color="primary" id="text" type="text" />
                <Button onClick={this.addList} variant="contained" size="large" color="secondary">添加商品到列表</Button>
                <List component="nav" className="list" aria-label="main mailbox folders">
                    {
                        goods.reverse().map((o, i) => {
                            return <Item key={i} text={o.name}></Item>
                        })
                    }
                </List>
            </section>
        )
    }
};

// export default Lists;

// connect() 是一个工厂函数，在调用以后会返回一个包装组件（高阶组件），所以要在调用后在传入组件。
export default connect((state) => {
    console.log(state);
    // 注：这里的state 就是store仓库中的state，所以从这里返回的数据在应该组件被调用时，会解构赋值给props，然后在上面的this.props中就可以拿到对应的数据啦！！！
    return {
        goods: state.goods
    };
})(Lists);