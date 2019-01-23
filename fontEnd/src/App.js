import React, { Component } from 'react';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import {
    BrowserRouter,
    HashRouter,
    Route
} from 'react-router-dom';

import index from './pages/Index/Index.js';

class App extends Component {
    render() {
        return (
            <HashRouter>
                <Route path="/" component={index}></Route>
            </HashRouter>
        );
    }
}

export default App;
