import websiteActionType from './websiteActionType';

import * as Http from '../../api/http';

export default {
    getConfig: () => {
        return dispatch => {
            Http.getWebsiteConfig().then(function(result) {
                dispatch({
                    type: websiteActionType.GETCONFIG,
                    data: result.data
                });
            });
        }
    }
}
