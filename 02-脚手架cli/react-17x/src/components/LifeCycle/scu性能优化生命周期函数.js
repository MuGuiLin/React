import React, { Component } from 'react';
import './style.css';

class Box extends Component {

    /**
     * scu -> shouldComponentUpdate()性能提升、优化生命周期函数，这也是面试React中经常被问到的一个点。
     *      如果没使用这个方法来阻止一下的话，当父组件状态每更新1次，render()被执行的次数，就是父组件中this.state.list.map的次数，即108次，
     *      即便是当父组件更新的属性不是传给子组件的props中的属性 或者是 父组件根本就没向子组件传任何属性，但子组件还是会被重新渲染一次，
     *      所以shouldComponentUpdate()一般用在子组件中使用
     * @param {*} nextProps 
     * @returns 
     */
    shouldComponentUpdate(nextProps) {
        // console.log('应该生命周期方法主要用于防止不必要的更新操作，因为每次更新都要执行diff算法、render()等开销'); // 状态每更新1次，执行1次
        // if(老状态this.state !== 新状态nextState) {
        if (this.props.current === this.props.index || nextProps.current === nextProps.index) {
            return true;  // 相当于 koa 和 vue 中的 next()方法一样向下继续执行
        }
        return false;  // 返回false会阻止render()调用
    };

    render() {
        console.error('注意看这里：这个子组件会被执行多次！！！', this.props);
        const { current, index } = this.props;
        return (
            <div className='box' style={{ backgroundColor: current === index ? 'blue' : '' }}>{index}</div>
        )
    };
};

export default class Scu extends Component {

    state = {
        list: ' '.repeat(108).split(''),
        current: 1
    };

    render() {
        return (<>
            <h1>
                scu性能优化生命周期函数 <input type="number" value={this.state.current} onChange={(evt) => {
                    this.setState({
                        current: Number(evt.target.value)
                    });
                }} style={{ height: '24px', verticalAlign: 'text-bottom' }} />
            </h1>

            <div className='scu'>
                {this.state.list.map((o, i) => {
                    return <Box current={this.state.current} index={i + 1}></Box>
                })}
            </div></>
        )
    };
};
