import websiteActionType from './websiteActionType';

let config = {
    siteName: "前端驿站",
    subTitle: "Just for fun",
    siteUrl: "http://www.zhuyuntao.cn",
    numInpage: 10, //一页多少个文章
    CDNPath: "启动cdn后的路径，不填表示无",
    webRecord: "苏123456789"
};

export default function counter(state = config, action) {
    switch (action.type) {
        case websiteActionType.GETCONFIG:

            return Object.assign({}, state, action.data);
        default:
            return state;
    }
}