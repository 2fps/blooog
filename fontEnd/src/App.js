import React, { Component } from 'react';
import { Provider} from 'react-redux';

import store from './store/store';

import {
    BrowserRouter,
    HashRouter,
    Route,
    Redirect
} from 'react-router-dom';

// import 'semantic-ui-css/semantic.min.css';
import './App.css';
import 'element-theme-default';

import index from './pages/Index/Index.js';
import login from './pages/Login/Login.js';
import Default from './pages/Default/Default.js';

class App extends Component {
    render() {
        return (
            <Provider store={ store }>
                <HashRouter>
                    <div>
                        <Route path="/index" component={index}></Route>
                        <Route path="/login" component={login}></Route>
                        <Route path="/default" component={Default}></Route>
                    </div>
                </HashRouter>
            </Provider>
        );
    }
}

export default App;
