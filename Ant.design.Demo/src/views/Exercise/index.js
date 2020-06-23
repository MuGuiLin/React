import React from 'react';

import { Layout, Menu, Avatar, Icon, Tabs } from 'antd';
const { Content } = Layout;

export default class Exercise extends React.Component {
    constructor(props) {
        super(props)
    };
    render() {

        return (
            <Content style={{ margin: '16px 16px 0' }}>

                <div style={{ position: 'relative', padding: 24, background: '#fff', minHeight: 780 }}>

                    {this.props.children}

                </div>

            </Content>
        )
    }
};