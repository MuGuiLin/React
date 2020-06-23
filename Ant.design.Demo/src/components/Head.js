import React from 'react';

import { Layout, Avatar } from 'antd';
const { Header } = Layout;

export default class Head extends React.Component {
    constructor(props) {
        super(props)
    };

    render() {
        return (
            <Header>
                <div className="logo">
                    SMG 技术运营中心
                </div>
                <div className="user">
                    <Avatar style={{ backgroundColor: '#87d068' }} icon="user" />
                    <i className="line">|</i><span>沐枫</span>
                </div>
            </Header>
        )
    }
};

