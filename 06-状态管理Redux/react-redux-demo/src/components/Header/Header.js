import React, { PureComponent } from 'react';

import { NavLink } from 'react-router-dom';

import './Header.css';

export default class Header extends PureComponent {
    render() {
        return (
            <header className="header">
                <nav>
                    <NavLink to="/" exact activeClassName={"active"} >首页</NavLink>
                    <NavLink to="/redux" activeClassName="active">Redux</NavLink>
                    <NavLink to="/react-redux" activeClassName="active">React-Redux</NavLink>
                </nav>
            </header>
        );
    }
}