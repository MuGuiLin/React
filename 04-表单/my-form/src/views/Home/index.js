import React, { Component } from 'react';

import "./index.css";
import logo from '../../logo.svg';

export default class Home extends Component {
    render() {
        return (
            <div className="home">
                <header className="home-header">
                    <img src={logo} className="home-logo" alt="logo" />
                    <p>Edit <code>src/home.js</code> and save to reload.</p>
                    <a className="home-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer" >
                    Learn React
                    </a>
                </header>
            </div>
        );
    }
}