import React from 'react';
import { Layout } from 'antd';
import { withRouter } from 'react-router-dom';

import Head from '../components/Head';
import Menu from '../components/Menu';
import Foot from '../components/Foot';

class Main extends React.Component {
    constructor(props) {
        super(props)
    };

    componentDidMount() {
        // console.log('-------------children：', this.props.children);
    };

    render() {
        return (
            <Layout>
                <Head />
                <Layout>
                    <Menu />
                    {this.props.children}
                </Layout>
                <Foot />
            </Layout>
        );
    }
};

export default withRouter(Main);
