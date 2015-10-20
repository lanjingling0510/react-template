import './main.css';

import config from '../config.json';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory.js';

import HomePage from './page/HomePage.jsx';



const history = config.environment === 'production' ? createBrowserHistory() : null;

const Routes = (
    <Router history={history}>
        <Route path="/" component={HomePage}/>
    </Router>
);


(function main() {
    const app = document.createElement('div');
    document.body.appendChild(app);
    ReactDOM.render(Routes, app);
})();
