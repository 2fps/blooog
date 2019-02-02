const router = require('koa-router')();
const articleModel = require('../models/articleModel');
const mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;

router.prefix('/api');

// 批量获取文章标题，简略信息的接口
router.get('/articles', async (ctx, next) => {
    // 参数处理
    let query = ctx.query,
        start = query.start - 0,
        end = query.end - 0,
        search = query.search;      // 搜索结果

    // 强制赋值查询的范围
    if (!start) {
        start = 0;
    }
    let count = await articleModel.count({}).exec();

    if (!end) {
        end = count;
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
    }).sort({'_id':-1}).skip(start).limit(end - start).exec();

    // changeID(articles);

    ctx.body = {
        result: true,
        msg: '',
        data: articles.slice(0, 10),
        count
    };
});

// 发布新文章的接口
router.post('/article', async (ctx, next) => {
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

    try {
        let aa = await art.save();
        // 其他操作，如发送注册邮件
        ctx.body = {
            result: true,
            msg: '发布成功'
        }
    } catch(err) {
        ctx.body = {
            result: false,
            msg: '发布失败'
        }
    }
});

// 文章删除
router.delete('/article', async (ctx, next) => {
    let id = ctx.query.articleId;
    
    // _id = mongoose.Types.ObjectId(id);
    let result = false;
    
    try {
        articleModel.deleteOne({
            _id: ObjectID(id)
        }).exec();
        result = true;
    } catch(err) {
        result = false;
    }

    ctx.body = {
        result
    }
});

// 获取文章的具体内容
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
// 修改文章内容
router.put('/article', async (ctx, next) => {
    let body = ctx.request.body,
        articleId = body.articleId,
        id = body.articleId,
        title = body.title,
        mdContent = body.mdContent,
        htmlContent = body.htmlContent;
        
        id = mongoose.Types.ObjectId(id);

    articleModel.updateOne({
        "_id": id
    }, {
        title,
        mdContent,
        htmlContent,
        brief: mdContent.slice(0, 10)
    }).exec()

    ctx.body = {
        result: true,
        msg: '更新成功'
    };
});
// 获取最新的文章信息
router.get('/newest', async (ctx, next) => {
    let newestArticles = await articleModel.find({}, {
        articleId: 1,
        title: 1,
        _id: 1
    }).sort({'_id':-1}).limit(6).exec();

    changeID(newestArticles);

    ctx.body = {
        result: true,
        data: newestArticles
    }
});


function changeID(arr) {
    arr.forEach(function(item, ind) {
        item.articleId = item.id;
    });
}

module.exports = router;