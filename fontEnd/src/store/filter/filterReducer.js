import filterActionType from './filterActionType';

let filter = {
    articles: [],
    pageSize: 10,   // 分页数
    nums: 123,      // 总数
    pages: 12,      // 页面总数
    nowPage: 1,     // 当前第几页，从1开始
    filterTitle: '',// 检索的名称
    condition: {},  // 检索的条件
    newestArticles: []
};

export default function counter(state = filter, action) {
    switch (action.type) {
        case filterActionType.GETARTICLES:

            state = [...action.data];

            return state;
        case filterActionType.GETNEWESTARTICLENAME:

        return Object.assign({}, state, {
            newestArticles: [...action.data]
        })
        default:
            return state;
    }
}