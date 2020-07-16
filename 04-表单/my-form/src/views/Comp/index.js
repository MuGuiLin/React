import React, { Component, PureComponent } from 'react';

import ClsComp from "../../components/ClsComp";
import FunComp from "../../components/FunComp";

export default class index extends Component {
    constructor() {
        super();

        this.state = {
            obj: {
                name: '沐枫'
            },
            user: { name: 'admin', pwd: 123456 }
        };

        this.subRef = null;
        this.subRef2 = React.createRef();
    }

    upName = (newName) => {
        let obj = { name: newName }
        this.setState({
            obj: obj
        })
        console.log(newName)
    }
    subFun = () => {
        // console.dir(ClsComp);
        // console.dir(this.subRef.current);

        console.log(this)
        // console.log(React)

        console.log(this.subRef)

        this.subRef2.current.myFun(789);
    }

    render() {
        return (
            <div>
                {/* {FunComp({ num: 666 })} */}

                <FunComp num={888} />

                <ClsComp ref={el => { console.log('获取子组件实例方式1', el); this.subRef = el }} obj={this.state.obj} upName={this.upName} $this={this} />

                {/* 获取子组件实例方式2 */}
                <ClsComp ref={this.subRef2} obj={this.state.user} upName={this.upName} $this={this} />

                <button ref={el => { console.log('获取DOM元素', el) }} onClick={this.subFun} >父组件调子组件中的方法</button>

            </div>
        );
    }
}

