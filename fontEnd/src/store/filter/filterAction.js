import filterActionType from './filterActionType';

export default {
    getArticles: () => {
    },
    getNewestArticleName: () => {
        return {
            type: filterActionType.GETNEWESTARTICLENAME,
            data: [{
                articleId: 123,  // 文章id
                title: "我是文章名",
                author: "作者名",
                publishTime: "2019-01-23", // 文章发布时间
                commentNums: 123,  // 评论数量
                readNums: 123,   // 阅读数量
                likeNums: 123,  // 点赞数量
                brief: "文章的简略内容内容内容内容内容"
            }, {
                articleId: 1,  // 文章id
                title: "测试测试测试",
                author: "2fps",
                publishTime: "2019-01-24", // 文章发布时间
                commentNums: 123,  // 评论数量
                readNums: 123,   // 阅读数量
                likeNums: 123,  // 点赞数量
                brief: "文章的简略内容内容内容内容内容"
            }, {
                articleId: 2,  // 文章id
                title: "测试测试测试1111",
                author: "2fps11",
                publishTime: "2019-01-24", // 文章发布时间
                commentNums: 123,  // 评论数量
                readNums: 123,   // 阅读数量
                likeNums: 123,  // 点赞数量
                brief: "文章的简略内容内容内容内容内容"
            }]
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
