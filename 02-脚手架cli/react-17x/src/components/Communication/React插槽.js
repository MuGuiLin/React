import React, { Component } from 'react';

class Child extends Component {
    render() {
        console.log('React插槽：', this.props.children);
        return (
            <div>
                {
                    /* this.props.children // React插槽,  <slot name="xxx"> Vue插槽 
                        React插槽的作用：
                            1、可以复用
                            2、能一定程度的减少父子通信【因为插槽是在父组件中定义的，所以能直接获取父组件中的状态，但它显示、渲染却是在子组件中】这就是插槽的妙用之处！！
                        
                            插槽的实际使用场景：轮播组件、表单组件、弹框组件、导航组件 等等。
                    */
                }

                {// 匿名插槽（全部-数组）
                    this.props.children
                }

                <hr />

                {//具名插槽（第1个插槽）
                    this.props.children[0]
                }
                {//具名插槽（第2个插槽）
                    this.props.children[1]
                }
            </div>
        );
    };
};


export default class Slot extends Component {
    render() {
        return (
            <div>
                <h3>React插槽</h3>
                <Child>
                    <div>
                        <h4>我是React插槽</h4>
                    </div>
                    <ul>
                        <li>我是React插槽</li>
                        <li>我是React插槽</li>
                        <li>我是React插槽</li>
                    </ul>
                </Child>
            </div>
        );
    };
};
