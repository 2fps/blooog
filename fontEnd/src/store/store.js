import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import website from './website/websiteReducer';
import tags from './tags/tagsReducer';
import filter from './filter/filterReducer';

let store = createStore(
    combineReducers({
        website,
        tags,
        filter
    }),
    applyMiddleware(thunk)
);

export default store;