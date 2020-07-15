import React, { Component } from "react";

export default class ClsComp extends React.Component {
    constructor(props) {

        super(props); //如果当前子类重写父类，一定要调super(props)

        this.state = {
            par: '666'
        };

    };

    componentDidMount() {
        this.setState({
            par: 777
        })
    }

    render() {
        console.log(this.props)
        // console.log(this.state)
        return (
            <div>
                <h2>我是类式组件!</h2>
                <p>{this.state.par || 888}</p>
                <h2>我是类式组件!{this.props.obj.name}</h2>
            </div>
        )
    };
};