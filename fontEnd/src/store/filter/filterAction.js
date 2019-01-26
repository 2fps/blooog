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
                articleId: 123,  // 文章id
                contents: "详细的文章内容详细的文章内容详细的文章内容详细的文章内容详细的文章内容详细的文章内容详细的文章内容详细的文章内容详细的文章内容详细的文章内容详细的文章内容详细的文章内容详细的文章内容详细的文章内容详细的文章内容详细的文章内容详细的文章内容详细的文章内容详细的文章内容详细的文章内容详细的文章内容",
                title: '11111111123',
                author: "作者名",
                publishTime: "2019-01-23", // 文章发布时间
                commentNums: 123,  // 评论数量
                readNums: 123,   // 阅读数量
                likeNums: 123  // 点赞数量
            }
        }
    }
}
