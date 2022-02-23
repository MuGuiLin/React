import React, { Component, useState, useEffect } from 'react';
import './style.css';

class Child1 extends Component {

    componentWillReceiveProps(nextProps) {
        console.debug('Child1 nextProps', nextProps);
    };

    render() {
        console.error('注意看这里：父组件并没有给这个子组件传任何属性，但父组件在每更新1次状态时，子组件也会被执行1次！！！', this.props);
        return (
            <div>
                <h3>Child1</h3>
                父组件没有我这个子组件传任何属性
            </div>
        )
    };
};

class Child2 extends Component {
    state = {
        title: '我是Child2中的this.state={}默认的值'
    }
    // cwrp
    componentWillReceiveProps(nextProps) {
        console.log('Child2 nextProps', nextProps, this.props);

        // 当父组件更新状态属性时触发这个生命周期，此时子组件中的props也会更新，这里也是最先获取父组件传的属性，可在这里利用属性进一些业务逻辑处理。
        // 如：把父组件nextProps传来的属性，转化成 子组件自己的this.state属性
        this.setState({
            title: nextProps.current * 10
        })
    };

    render() {
        return (
            <div>
                <h3>Child2</h3>
                {this.props.current}、
                {this.state.title}
            </div>
        )
    };
};


const Child3 = (props) => {
    const [title, setTtitle] = useState({ num: 0, key: '我是Child3中的useState()默认的值' });

    useEffect(() => {
        // setTtitle({ num: props.obj.num, key: props.obj.key });
        setTtitle(props.obj);

        setTimeout(() => {
            setTtitle({ num: 666, key: 'Admin' });
        }, 3000);
    }, [props]);
    return (
        <div>
            <h3>Child3</h3>
            {props.obj.num}、
            {props.obj.key}、
            {title.num}、
            {title.key}
        </div>
    );
}



export default class Cwrp extends Component {

    state = {
        current: 1,
        obj: {
            num: 1,
            key: 'value'
        }
    };

    render() {
        return (<>
            <h1>
                cwrp Props更新时的生命周期函数 <button onClick={() => {
                    const newVal = this.state.current + 1;
                    this.setState({
                        current: newVal,
                        obj: {
                            num: newVal,
                            key: 'User'
                        }
                    });
                }} >更新状态</button>
            </h1>
            <hr/>

            <br />
            <Child1 ></Child1>
            <hr/>

            <br />
            <Child2 current={this.state.current} ></Child2>
            <hr/>

            <br />
            <Child3 obj={this.state.obj} ></Child3>
            <hr/>
        </>
        )
    };
};
