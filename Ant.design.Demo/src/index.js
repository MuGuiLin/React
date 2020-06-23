import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './store';

import './static/css/base.less';
import App from './views/App';
import * as serviceWorker from './serviceWorker';

import Axios from 'axios';
import Api from './config';
import Ajax from './config/Ajax';

React.Axios = Axios;
React.Api = Api;
React.Ajax = Ajax;

ReactDOM.render(
    <Provider store={store} >
        <App />
    </Provider>, 
document.getElementById('Root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();