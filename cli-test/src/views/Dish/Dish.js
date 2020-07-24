import React, { Component } from 'react';

class Dish extends Component {
    constructor() {
        super()
    }
    render() {
        return (
            <div>
                {/* 显示子路由 */}
                {this.props.children}
            </div>
        );
    }
}

export default Dish;