import websiteActionType from './websiteActionType';

let config = {

};

export default function counter(state = config, action) {
    switch (action.type) {
        case websiteActionType.GETCONFIG:

            return Object.assign({}, state, action.data);
        default:
            return state;
    }
}