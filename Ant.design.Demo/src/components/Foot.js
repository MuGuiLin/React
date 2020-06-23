import React from 'react';

import { Layout } from 'antd';
const { Footer } = Layout;

export default class Foot extends React.Component {
    constructor(props) {
        super(props)
    };

    render() {
        return (
            <Footer style={{ textAlign: 'center' }}>
                SMG 技术运营中心 ©2020
            </Footer>
        )
    }
};

