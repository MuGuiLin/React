import React, { Component } from 'react';
import { connect } from "react-redux";
import logo from '../../logo.svg';
import './Home.scss';

class Home extends Component {
    constructor(){
        super()
        
    }
    componentDidMount() {
        console.log(this.props)
        // this.add()
    }
    render() {
        return (
            <div className="home">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>Edit <code>src/App.js</code> and save to reload.</p>
                    <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer" >
                        Learn React
                    </a>
                </header>
            </div>
        );
    }
}

export default connect( state => state, {
    add:() => {
        return {type: 'ADD', value: 888}
    }
})(Home);
