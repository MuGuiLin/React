import React, { Component } from 'react';

export default class EventBuild extends Component {
    // 给当前组件的props设置默认值
    static defaultProps = {
        data: {
             name: 'root',
             age: 20
        }
       
    }
    constructor(props) {
        super(props);

        console.log(props);

        this.state = {
            myName: props.data.name,
            myAge: props.data.age,
            name: '数据响应式',
            counter: 1
        }
    }

    myChange(e, v) {
        // console.log(e.target.value, v);

        this.setState({
            name: e.target.value
        }, () => {
            console.log('更新成功：', this.state.name);
        })
        console.log('更新异步：', this.state.name);
    }

    myFun1 = (e) => {
        // console.log(e, this);

        this.setState({
            counter: this.state.counter + 1
        });
        console.log('更新异步：', this.state.counter);
    }

    myFun2(e) {
        console.log(e, this);
    }

    myFun3 = (e) => {
        console.log(e, this)
    }

    render() {
        // console.log('--------------', this.props, this.state);
        return (
            <div>
                {this.props.data.name}
                <button onClick={this.myFun1}>按扭事件{this.state.counter}</button>
                <button onClick={this.myFun2.bind(this)}>事件对象 event</button>
                <button onClick={(e) => { this.myFun3(e) }}>事件函数this指向</button>
                <input type="text" defaultValue={this.state.name} onInput={(e) => { this.myChange(e, '666') }} /> <b>{this.state.name}</b>
            </div>
        );
    }
}