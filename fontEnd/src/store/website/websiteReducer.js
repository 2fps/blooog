import websiteActionType from './websiteActionType';

let config = {
    siteName: "",       // 站点名称
    subTitle: "",       // 站点副标题
    siteUrl: "",        // 站点url  
    webRecord: ""       // 备案信息
};

export default function counter(state = config, action) {
    switch (action.type) {
        case websiteActionType.GETCONFIG:
            return Object.assign({}, state, action.data);
        default:
            return state;
    }
}