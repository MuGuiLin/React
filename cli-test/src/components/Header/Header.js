import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.scss';

class Header extends Component {
    render() {
        return (
            <header className="header">
                <nav className="nav-box">
                    {/* <Link to="/">首页</Link> <Link to="/about">关于</Link> */}
                    <NavLink to="/" exact activeStyle={{ color: 'green' }}>首页</NavLink>
                    {/* <NavLink to="/" exact activeClassName="active" >首页</NavLink> */}
                    <NavLink to="/about" activeClassName="active">关于</NavLink>
                    <NavLink to="/jsx" activeClassName="active">JSX</NavLink>
                    <NavLink to="/redux" activeClassName="active">Redux</NavLink>
                    <NavLink to="/dish" activeClassName="active">点菜</NavLink>
                </nav>
            </header>
        );
    }
}

export default Header;