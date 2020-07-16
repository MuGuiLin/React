import React, { Component, PureComponent } from "react";

export default class ClsComp extends React.Component {
    constructor(props) {

        super(props); //如果当前子类重写父类，一定要调super(props)

        this.state = {
            par: '666',
            text: ''
        };

    };

    onChangeVal = (e) => {
        this.setState({
            text: e.target.value
        })
    }

    myFun(agms) {
        console.log('父组件调用时传来的参数：', agms)
    }

    upPropsData = () => {
        console.log(this.props)
        this.props.upName(this.state.text);
        // this.props.$this.upName(this.state.text);

        // React.$emitter.emit('mupiao', 666);

        // 发布触发自定义事件
        React.$emitter.emit('mupiao', function(a) {
            alert(a)
        })
    }

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
                <h2>我是类式组件state：{this.state.par || 888}</h2>
                <h2>
                    我是类式组件props：{this.props.obj.name}
                    <input value={this.state.text} onChange={this.onChangeVal} ></input>
                    <button onClick={this.upPropsData} > 子组件调父组件中的方法 修改props中的数据</button>
                </h2>
            </div>
        )
    };
};