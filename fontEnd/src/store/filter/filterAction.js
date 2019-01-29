import filterActionType from './filterActionType';
import * as Http from '../../api/http';

export default {
    getArticles: () => {
        return dispatch => {
            Http.getArticle().then(function(data) {
                let da = data.data,
                    info = null;

                if (da.result) {
                    info = da.data;
                }
                dispatch({
                    type: filterActionType.GETARTICLES,
                    data: info
                });
            });
        }
    },
    // 获取最新的articles信息
    getNewestArticle: () => {
        return dispatch => {
            Http.getNewestArticle().then(function(data) {
                let da = data.data,
                    info = null;

                if (da.result) {
                    info = da.data;
                }
                dispatch({
                    type: filterActionType.GETNEWESTARTICLE,
                    data: info
                });
            });
        };
    },
    getArticleDetail: () => {
        return {
            type: filterActionType.GETARTICLEDETAIL,
            data: {
            }
        }
    },
    changeState: (articleState, modifyId) => {
        return {
            type: filterActionType.CHANGESTATE,
            data: {
                articleState,
                modifyId
            }
        }
    }
}
