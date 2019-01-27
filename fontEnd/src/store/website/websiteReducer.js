import websiteActionType from './websiteActionType';

let config = {
    siteName: "",       // 站点名称
    subTitle: "",       // 站点副标题
    siteUrl: "",        // 站点url  
    webRecord: "",      // 备案信息
    modifyConfig: {         // setting下修改的配置
        siteName: "",       // 站点名称
        subTitle: "",       // 站点副标题
        siteUrl: "",        // 站点url  
        webRecord: "",      // 备案信息
    }
};

export default function counter(state = config, action) {
    switch (action.type) {
        case websiteActionType.GETCONFIG:
            // 复制一份数据到修改的数据中
            let modifyCon = JSON.parse(JSON.stringify(action.data));

            action.data.modifyConfig = modifyCon;
            
            return Object.assign({}, state, action.data);
        case websiteActionType.MODIFYCONFIG:
            let modifyCo = JSON.parse(JSON.stringify(state.modifyConfig));

            modifyCo[ action.data.key ] = action.data.value;

            return Object.assign({}, state, {
                modifyConfig: modifyCo
            });
        case websiteActionType.SAVECONFIG:
            
        default:
            return state;
    }
}