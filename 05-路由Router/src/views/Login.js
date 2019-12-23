import React from 'react';

export default class Login extends React.Component {
    constructor(props) {
        super(props)
    };

    render() {
        return (
            <section className="views-box">
                <h1>登录</h1>
                <hr></hr>

                <div className="login">
                    <form>
                        <p>用户：<input type="text"></input></p>
                        <p>密码：<input type="password"></input></p>
                        <p><button>登 录</button></p>
                    </form>
                </div>
            </section>
        )
    }
};