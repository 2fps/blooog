import React, { Component } from 'react';
import { Provider} from 'react-redux';

import store from './store/store';

import {
    BrowserRouter,
    HashRouter,
    Route
} from 'react-router-dom';

// import 'semantic-ui-css/semantic.min.css';
import './App.css';

import index from './pages/Index/Index.js';

class App extends Component {
    render() {
        return (
            <Provider store={ store }>
                <HashRouter>
                    <Route path="/" component={index}></Route>
                </HashRouter>
            </Provider>
        );
    }
}

export default App;
