import websiteActionType from './websiteActionType';

import * as Http from '../../api/http';

export default {
    getConfig: () => {
        return dispatch => {
            Http.getWebsiteConfig().then(function(data) {
                let da = data.data,
                    info = null;

                if (da.result) {
                    info = da.data;
                }
                dispatch({
                    type: websiteActionType.GETCONFIG,
                    data: info
                });
            });
        }
    },
    // 根据setting中的数据修改redux中的显示数据
    modifyWebsiteConfig: (key, value) => {
        return dispatch => {
            dispatch({
                type: websiteActionType.MODIFYCONFIG,
                data: {
                    key,
                    value
                }
            });
        }
    },
    saveWebsiteConfig: (condition) => {
        return dispatch => {
            Http.saveWebsiteConfig(condition).then(function(data) {
                let da = data.data;

/*                 if (da.result) {
                    
                } else {

                } */
                dispatch({
                    type: websiteActionType.GETCONFIG,
                    data: condition
                });
            });
        }
    }
}
