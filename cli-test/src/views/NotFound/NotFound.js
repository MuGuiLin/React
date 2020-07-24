import React, { Component } from 'react';
import './NotFound.scss';
import NotImg from '../../static/img/404.png';

class NotFound extends Component {
    render() {
        return (
            <div className="not-found">
                <img src={NotImg}/>
            </div>
        );
    }
}

export default NotFound;