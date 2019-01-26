import userActionType from './userActionType';

let user = {
    username: '',           // 登录的用户名称
    isLogined: false        // 是否已经登录
};

export default function counter(state = user, action) {
    switch (action.type) {
        case userActionType.LOGININ:
            return Object.assign({}, state, {
                username: action.data.username,
                isLogined: true
            });
        default:
            return state;
    }
}