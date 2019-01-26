const router = require('koa-router')();
const articleModel = require('../models/articleModel');

router.prefix('/api/articles');

router.get('/', async (ctx, next) => {
    // 参数处理
    let query = ctx.query,
        start = query.start - 0,
        end = query.end - 0,
        search = query.search;      // 搜索结果

    if (!start) {
        start = 0;
    }
    if (!end) {
        end = 10;
    }

    let articles = await articleModel.find({}, {
        articleId: 1,
        title: 1,
        publishTime: 1,
        readNums: 1,
        likeNums: 1,
        content: 1,
        commentNums: 1,
        brief: 1
    }).skip(start).limit(end - start).exec();

    ctx.body = {
        result: true,
        msg: '',
        data: articles.slice(0, 10)
    };
});

router.get('/newest', async (ctx, next) => {
    let newestArticles = await articleModel.find({}, {
        articleId: 1,
        title: 1
    }).limit(6).exec();

    ctx.body = {
        result: true,
        data: newestArticles
    }
});

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