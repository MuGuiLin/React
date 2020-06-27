import React, { Component } from "react";
import "./index.scss";

import logo from '../../static/images/logo.svg';


export default class Self extends Component {

    constructor() {
        super();

    };

    componentDidMount() {

    };

    render() {
        return (
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
        </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
        </a>
            </header>
        );
    }
};