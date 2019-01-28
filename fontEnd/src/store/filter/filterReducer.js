import filterActionType from './filterActionType';

let filter = {
    articles: [],
    article: {},    // 当前文章的内容
    pageSize: 10,   // 分页数
    nums: 123,      // 总数
    pages: 12,      // 页面总数
    nowPage: 1,     // 当前第几页，从1开始
    filterTitle: '',// 检索的名称
    condition: {},  // 检索的条件
    newestArticles: [],
    articleState: '',// 当前状态，空表示新些文章，'modify' 表示编辑文章中
    modifyId: ''     // 修改的文章的id号
};

export default function counter(state = filter, action) {
    switch (action.type) {
        case filterActionType.GETARTICLES:

            return Object.assign({}, state, {
                articles: [...action.data]
            });
        case filterActionType.GETNEWESTARTICLE:

            return Object.assign({}, state, {
                newestArticles: [...action.data]
            });
        case filterActionType.GETARTICLEDETAIL:

            state.article = action.data;
            
            return Object.assign({}, state, {
                article: action.data
            });
        case filterActionType.CHANGESTATE:
            
            return Object.assign({}, state, {
                articleState: action.data.articleState,
                modifyId: action.data.modifyId
            });
        default:
            return state;
    }
}