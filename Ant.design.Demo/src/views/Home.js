import React from 'react';
import { withRouter } from 'react-router-dom';
import { Input, Button, Tooltip, Icon } from 'antd';

class Home extends React.Component {
    constructor(props) {
        super(props);
    };

    login = login => {
        this.props.history.push('/main/inspection');
    };

    componentDidMount() {
        console.log('hoem');
    }

    render() {
        return (
            <section className="login">
                <div className="form">
                    <h1>SMG安全播出管理系统</h1>
                    <form>
                        <Input size="large" prefix={<Icon type="user" style={{ color: '#409EFF' }} />} placeholder="用户名称" allowClear />
                        <Input.Password size="large" prefix={<Icon type="lock" style={{ color: '#409EFF' }} />} placeholder="用户密码" />
                        <Button size="large" type="primary" icon="arrow-right" onClick={this.login} >登 录</Button>
                    </form>
                </div>
            </section>
        )
    };
};

export default withRouter(Home);