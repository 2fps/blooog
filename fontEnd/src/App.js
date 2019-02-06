import React, { Component } from 'react';
import { Provider} from 'react-redux';

import store from './store/store';

import {
    HashRouter,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import './App.css';
import 'element-theme-default';

import index from './pages/Index/Index.js';
import login from './pages/Login/Login.js';
import Default from './pages/Default/Default.js';
import Authority from './routers/authority';

class App extends Component {
    render() {
        return (
            <Provider store={ store }>
                <HashRouter>
                    <Switch>
                        <Redirect exact from='/' to='/index/main' />
                        <Route path="/index" component={index}></Route>
                        <Route exact path="/login" component={login}></Route>
                        <Authority path="/default" component={Default} />
                        {/* <Route path="/default" component={Default}></Route> */}
                    </Switch>
                </HashRouter>
            </Provider>
        );
    }
}

export default App;
