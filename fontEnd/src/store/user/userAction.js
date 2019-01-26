import userActionType from './userActionType';

import * as Http from '../../api/http';

export default {
    loginIn: (username, password) => {
        return dispatch => {
            Http.loginIn(username, password).then(function(data) {
                let da = data.data,
                    info = null;

                if (da.result) {
                    info = da.data;
                }
                dispatch({
                    type: userActionType.LOGININ,
                    data: {
                        username: username
                    }
                });
            });
        }
    }
}
