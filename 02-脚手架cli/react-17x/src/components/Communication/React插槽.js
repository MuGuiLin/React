import React, { Component } from 'react';

class Child extends Component {
    render() {
        return (
            <div>
                {/* this.props.children // React插槽,  <slot name="xxx"> Vue插槽 */}
                {this.props.children}
            </div>
        )
    }
}


export default class Slot extends Component {
    render() {
        return (
            <div>
                <h3>React插槽</h3>
                <Child>
                    <div>我是React插槽</div>
                </Child>
            </div>
        )
    }
}
