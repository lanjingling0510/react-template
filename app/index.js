import './main.css';

import config from '../config.json';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import HomePage from './page/HomePage';
import TestPage from './page/TestPage';
import FormPage from './page/FormPage';
import Perf from 'react-addons-perf';

window.Perf = Perf;
window.React = React;

const history = config.environment === 'production' ? createBrowserHistory() : null;

const Routes = (
    <Router history={history}>
        <Route path="/" component={HomePage}/>
        <Route path="/test" component={TestPage}/>
        <Route path="/form" component={FormPage}/>
    </Router>
);


(function main() {
    const app = document.createElement('div');
    document.body.appendChild(app);
    ReactDOM.render(Routes, app);
})();


