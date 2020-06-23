import React from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Input, Button, Tooltip, Icon, Message } from 'antd';
import stores from '../store';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            passWord: ''
        }
    };

    login = login => {
        if(this.state.userName==''){
            Message.warning('用户名称不能为空')
        }else if(this.state.passWord==''){
            Message.warning('密码不能为空')
        }else{
            React.Axios({
                method: 'GET',
                url: React.Api.auth.login,
                params: {
                    smgid: this.state.userName,
                    password: this.state.passWord
                }
            })
                .then((res) => {
                    let o = res.data.result;
                    console.log(o)
                    if (100 === o.code) {

                        const action = {
                            // type 属性 必须有
                            type:'change_input_value',
                            value: o.data,
                        };

                        const action1 = {
                            // type 属性 必须有
                            type:'change_type_value',
                            value: '1',
                        };

                        stores.dispatch(action);

                        stores.dispatch(action1);

                        localStorage.setItem('smgid', this.state.userName)

                        this.props.history.push('/main/inspection');
                    }else{
                        Message.error(o.msg);
                    }
                });
        }
        // console.log(this.state.userName,this.state.passWord);
        // return false;
        // this.props.history.push('/main/inspection');
    };

    componentWillMount() {
        console.log(stores.getState())
        sessionStorage.removeItem('users');
        sessionStorage.removeItem('type');
        localStorage.removeItem('smgid');
    }

    render() {

        // const { getFieldDecorator, getFieldsError, } = this.props.form;
        // console.log(this.props)

        return (
            <section className="login">
                <div className="form">
                    <h1>SMG安全播出管理系统</h1>
                    <Form inline>
                        <Input size="large" prefix={<Icon type="user" style={{ color: '#409EFF' }} />} defaultValue={this.state.userName} onChange={ e => {
                            this.setState({
                                userName: e.target.value
                            })
                        }} placeholder="用户名称" allowClear />

                        <Input.Password size="large" prefix={<Icon type="lock" style={{ color: '#409EFF' }} />}  defaultValue={this.state.passWord} onChange={ e => {
                            this.setState({
                                passWord: e.target.value
                            })
                        }} placeholder="用户密码" />
                        <Button size="large" type="primary" htmlType="submit" onClick={this.login} icon="arrow-right">登 录</Button>
                    </Form>
                </div>
            </section>
        )
    };
};

export default withRouter(Home);
