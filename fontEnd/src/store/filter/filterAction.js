import filterActionType from './filterActionType';
import * as Http from '../../api/http';

export default {
    getArticles: (search, start, end) => {
        return dispatch => {
            Http.getArticle(search, start, end).then(function(data) {
                let da = data.data,
                    info = null;

                if (da.result) {
                    info = da.data;
                }
                dispatch({
                    type: filterActionType.GETARTICLES,
                    data: {
                        data: da.data,
                        count: da.count
                    }
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
