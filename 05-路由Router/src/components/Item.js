import React from 'react';
import { Link } from "react-router-dom";

export default class Item extends React.Component {
    // class Item extends React.Component {
    constructor(props) {
        super(props);

    };

    render() {
        const item = this.props.item;
        return (
            <li>
                <span>{item.id}</span>
                {/* 由于路由设置了中能传数字，所以这里不能传字符串 */}
                {/* <Link to={'/view/' + item.name}>{item.name}</Link> */}
                
                <Link to={'/view/' + item.id}>{item.name}</Link>
                <span>￥{(item.price / 100).toFixed(2)}</span>
                <span>
                    <button>详情信息</button>
                </span>
            </li>
        )
    }
};

// export default {
//     Item
// };