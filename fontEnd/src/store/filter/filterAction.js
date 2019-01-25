import filterActionType from './filterActionType';

export default {
    getArticles: () => {
    },
    getNewestArticleName: () => {
        return {
            type: filterActionType.GETNEWESTARTICLENAME,
            data: [{
                name: '123',
                articleId: 12
            }, {
                name: '测试',
                articleId: 11
            }]
        };
    }
}
