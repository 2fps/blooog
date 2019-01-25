import tagsActionType from './tagsActionType';

let tags = [];

export default function counter(state = tags, action) {
    switch (action.type) {
        case tagsActionType.GETTAGS:

            state = [...action.data];

            return state;
        default:
            return state;
    }
}