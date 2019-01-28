const router = require('koa-router')();
const articleModel = require('../models/articleModel');
const mongoose = require('mongoose');

router.prefix('/api');

router.get('/articles', async (ctx, next) => {
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
        // articleId: 1,
        title: 1,
        publishTime: 1,
        // readNums: 1,
        // likeNums: 1,
        // content: 1,
        // commentNums: 1,
        brief: 1,
        _id: 1
    }).skip(start).limit(end - start).exec();

    changeID(articles);

    ctx.body = {
        result: true,
        msg: '',
        data: articles.slice(0, 10)
    };
});


router.post('/article', function (ctx, next) {
    let query = ctx.request.body,
        title = query.title,
        // author = query.author,
        // commentNums = 0,
        // readNums = 0,
        // likeNums = 0,
        mdContent = query.mdContent,
        htmlContent = query.htmlContent;
    // 检测
    let art = new articleModel({
        title,
        mdContent,
        htmlContent,
        brief: mdContent.slice(0, 10),
        publishTime: +new Date
    });

    art.save();

    ctx.body = {
        result: true
    }
});

router.delete('/article', function(ctx, next) {
    let id = ctx.request.body.articleId;
    
    id = mongoose.Types.ObjectId(id);

    articleModel.deleteOne({
        _id: id
    });

    ctx.body = {
        result: true
    }
});

router.get('/article', async (ctx, next) => {
    let id = ctx.query.articleId;
    
    id = mongoose.Types.ObjectId(id);

    let article = await articleModel.findOne({
        _id: id
    }, {
        title: 1,
        publishTime: 1,
        // readNums: 1,
        // likeNums: 1,
        mdContent: 1,
        htmlContent: 1,
        // commentNums: 1,
        // brief: 1,
        _id: 1
    }).exec();

    ctx.body = {
        result: true,
        data: article
    };

});

router.get('/newest', async (ctx, next) => {
    let newestArticles = await articleModel.find({}, {
        articleId: 1,
        title: 1,
        _id: 1
    }).limit(6).exec();

    changeID(newestArticles);

    ctx.body = {
        result: true,
        data: newestArticles
    }
});


function changeID(arr) {
    arr.forEach(function(item, ind) {
        item.id = item['_id'];
    });
}

module.exports = router;