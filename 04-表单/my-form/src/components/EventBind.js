import React, { Component } from 'react';

export default class EventBuild extends Component {
    constructor(props) {
        super(props);

        console.log(props);

        this.state = {
            myName: props.data.name,
            myAge: props.data.age,
            name: '沐枫',
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
                <h1>{this.state.name}</h1>
                <button onClick={this.myFun1}>按扭{this.state.counter}</button>
                <button onClick={this.myFun2.bind(this)}>按扭2</button>
                <button onClick={(e) => { this.myFun3(e) }}>按扭3</button>
                <input type="text" onInput={(e) => { this.myChange(e, '666') }} />

            </div>
        );
    }
}