import './main.css';
import 'babel-polyfill';
import config from '../config.json';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute} from 'react-router';
import {syncReduxAndRouter} from 'redux-simple-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import createHashHistory from 'history/lib/createHashHistory';

import configureStore from './configureStore.js';

import BaseLayout from './layout/BaseLayout';
import MenuBar from './layout/MenuBar';
import LoginPage from './page/LoginPage';
import MapListPage from './page/map/MapListPage';
import MapCreatePage from './page/map/MapCreatePage';
import MapEditPage from './page/map/edit/MapEditPage';

import LayerClassCreatePage from './page/layerClass/LayerClassCreatePage.js';

import TagListPage from './page/tag/TagListPage.js';
import TagEditPage from './page/tag/TagEditPage.js';

import ARDeviceListPage from './page/ARDevice/ARDeviceListPage.js';
import ARDeviceEditPage from './page/ARDevice/ARDeviceEditPage.js';

import JCCaseListPage from './page/JCCase/JCCaseListPage.js';
import JCCaseEditPage from './page/JCCase/JCCaseEditPage.js';

import UserListPage from './page/account/UserListPage.js';
import UserEditPage from './page/account/UserEditPage.js';
import AdminListPage from './page/account/AdminListPage.js';
import FormPage from './page/FormPage';

const store = configureStore();
const history = config.environment === 'production' ? createBrowserHistory() : createHashHistory();

window.React = React;
syncReduxAndRouter(history, store);

const Routes = (
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={BaseLayout}>
                <Route component={MenuBar}>
                    <IndexRoute component={MapListPage} />
                    <Route path="map" component={MapListPage}/>
                    <Route path="map/create" component={MapCreatePage}/>
                    <Route path="map/:_id" component={MapEditPage}/>
                    <Route path="layerClass/create" component={LayerClassCreatePage}/>
                    <Route path="tag" component={TagListPage}/>
                    <Route path="tag/:_id" component={TagEditPage}/>
                    <Route path="ARDevice" component={ARDeviceListPage}/>
                    <Route path="ARDevice/:_id" component={ARDeviceEditPage}/>
                    <Route path="JCCase" component={JCCaseListPage}/>
                    <Route path="JCCase/:_id" component={JCCaseEditPage}/>
                    <Route path="account/user" component={UserListPage} />
                    <Route path="account/user/:_id" component={UserEditPage} />
                    <Route path="account/admin" component={AdminListPage} />
                    <Route path="form" component={FormPage}/>
                </Route>
                <Route path="login" component={LoginPage}/>
            </Route>
        </Router>
    </Provider>
);


(function main() {
    const app = document.createElement('div');
    app.style.height = '100%';
    document.body.appendChild(app);
    ReactDOM.render(Routes, app);
})();
