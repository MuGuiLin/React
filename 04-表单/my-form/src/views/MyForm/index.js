import React, { Component } from 'react';
import './index.css';

class MyForm extends Component {
    constructor() {
        super(); //在访问“ this”或从派生构造函数返回之前，必须在派生类中调用超级构造函数;

        this.state = {
            user: '沐枫',
            age: 28
        }
        this.onChangeVal = this.onChangeVal.bind(this);
    }
    onChangeVal(e) {
        console.log(e.target.value);

        this.setState({
            user: e.target.value
        })
    }

    agePush = () => {
        this.setState((state) => {
            return {
                age: state.age + 1
            }
        }, () => {
            console.log('更新成功！')
        });
        console.log(this.state.age)
    }

    render() {

        return (
            <div className="my-form">
                {this.state.user}
                <input type="text" value={this.state.user} onChange={this.onChangeVal} />
                <button onClick={this.agePush}>{this.state.age}</button>
            </div>
        );
    }
}

export default MyForm;