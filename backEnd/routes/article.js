const router = require('koa-router')()

router.prefix('/api/article')

router.get('/', function (ctx, next) {
    // 参数处理
    let query = ctx.query,
        start = query.start - 0,
        end = query.end - 0,
        search = query.search;      // 搜索结果
    
    ctx.body = {
        result: true,
        msg: '',
        data: articles.slice(0, 10)
    };
})

router.post('/', function (ctx, next) {
    let query = ctx.query,
        title = query.title,
        author = query.author,
        commentNums = 0,
        readNums = 0,
        likeNums = 0,
        content = query.content;

    ctx.body = {
        result: true
    }
})

module.exports = router


// 模拟的文章数据，
let articles = [{
    articleId: 123,  // 文章id
    title: "我是文章名1111",
    author: "作者名",
    publishTime: "2019-01-23", // 文章发布时间
    commentNums: 123,  // 评论数量
    readNums: 123,   // 阅读数量
    likeNums: 123,  // 点赞数量
    brief: "文章的简略内容内容内容内容内容"
}, {
    articleId: 1,  // 文章id
    title: "我是文章名2222",
    author: "2fps",
    publishTime: "2019-01-24", // 文章发布时间
    commentNums: 123,  // 评论数量
    readNums: 123,   // 阅读数量
    likeNums: 123,  // 点赞数量
    brief: "文章的简略内容内容内容内容内容"
}, {
    articleId: 2,  // 文章id
    title: "我是文章名3333",
    author: "2fps11",
    publishTime: "2019-01-24", // 文章发布时间
    commentNums: 123,  // 评论数量
    readNums: 123,   // 阅读数量
    likeNums: 123,  // 点赞数量
    brief: "文章的简略内容内容内容内容内容"
}, {
    articleId: 2,  // 文章id
    title: "我是文章名4444",
    author: "2fps11",
    publishTime: "2019-01-24", // 文章发布时间
    commentNums: 123,  // 评论数量
    readNums: 123,   // 阅读数量
    likeNums: 123,  // 点赞数量
    brief: "文章的简略内容内容内容内容内容"
}, {
    articleId: 2,  // 文章id
    title: "我是文章名55555",
    author: "2fps11",
    publishTime: "2019-01-24", // 文章发布时间
    commentNums: 123,  // 评论数量
    readNums: 123,   // 阅读数量
    likeNums: 123,  // 点赞数量
    brief: "文章的简略内容内容内容内容内容"
}, {
    articleId: 2,  // 文章id
    title: "我是文章名66666",
    author: "2fps11",
    publishTime: "2019-01-24", // 文章发布时间
    commentNums: 123,  // 评论数量
    readNums: 123,   // 阅读数量
    likeNums: 123,  // 点赞数量
    brief: "文章的简略内容内容内容内容内容"
}, {
    articleId: 2,  // 文章id
    title: "我是文章名7777",
    author: "2fps11",
    publishTime: "2019-01-24", // 文章发布时间
    commentNums: 123,  // 评论数量
    readNums: 123,   // 阅读数量
    likeNums: 123,  // 点赞数量
    brief: "文章的简略内容内容内容内容内容"
}, {
    articleId: 2,  // 文章id
    title: "我是文章名8888",
    author: "2fps11",
    publishTime: "2019-01-24", // 文章发布时间
    commentNums: 123,  // 评论数量
    readNums: 123,   // 阅读数量
    likeNums: 123,  // 点赞数量
    brief: "文章的简略内容内容内容内容内容"
}, {
    articleId: 2,  // 文章id
    title: "我是文章名99999",
    author: "2fps11",
    publishTime: "2019-01-24", // 文章发布时间
    commentNums: 123,  // 评论数量
    readNums: 123,   // 阅读数量
    likeNums: 123,  // 点赞数量
    brief: "文章的简略内容内容内容内容内容"
}, {
    articleId: 2,  // 文章id
    title: "我是文章名1001010",
    author: "2fps11",
    publishTime: "2019-01-24", // 文章发布时间
    commentNums: 123,  // 评论数量
    readNums: 123,   // 阅读数量
    likeNums: 123,  // 点赞数量
    brief: "文章的简略内容内容内容内容内容"
}, {
    articleId: 2,  // 文章id
    title: "我是文章名121212",
    author: "2fps11",
    publishTime: "2019-01-24", // 文章发布时间
    commentNums: 123,  // 评论数量
    readNums: 123,   // 阅读数量
    likeNums: 123,  // 点赞数量
    brief: "文章的简略内容内容内容内容内容"
}, {
    articleId: 2,  // 文章id
    title: "我是文章名131313",
    author: "2fps11",
    publishTime: "2019-01-24", // 文章发布时间
    commentNums: 123,  // 评论数量
    readNums: 123,   // 阅读数量
    likeNums: 123,  // 点赞数量
    brief: "文章的简略内容内容内容内容内容"
}, {
    articleId: 2,  // 文章id
    title: "我是文章名141414",
    author: "2fps11",
    publishTime: "2019-01-24", // 文章发布时间
    commentNums: 123,  // 评论数量
    readNums: 123,   // 阅读数量
    likeNums: 123,  // 点赞数量
    brief: "文章的简略内容内容内容内容内容"
}, {
    articleId: 2,  // 文章id
    title: "我是文章名151515",
    author: "2fps11",
    publishTime: "2019-01-24", // 文章发布时间
    commentNums: 123,  // 评论数量
    readNums: 123,   // 阅读数量
    likeNums: 123,  // 点赞数量
    brief: "文章的简略内容内容内容内容内容"
}];