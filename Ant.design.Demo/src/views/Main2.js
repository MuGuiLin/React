import React from 'react';
import { Layout } from 'antd';
import { withRouter } from 'react-router-dom';

import Head from '../components/Head';
import Menu from '../components/Menu';
import Foot from '../components/Foot';
import stores from '../store';

class Main extends React.Component {
    constructor(props) {
        super(props)
    };

    componentWillMount() {
        // console.log('-------------children：', this.props.children);
        var users = stores.getState().users;
        console.log(users)
        if(JSON.stringify(users) == "{}"){
            this.props.history.push('/');
            window.location.reload()
        }
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
