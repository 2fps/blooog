const router = require('koa-router')();
const articleModel = require('../models/articleModel');
const errorCode = require('../util/errorCode');


router.prefix('/api');

// 批量获取文章标题，简略信息的接口
router.get('/articles', async (ctx, next) => {
    // 参数处理
    let query = ctx.query,
        start = query.start - 0,
        end = query.end - 0,
        res = {
            result: true,
            code: 10000
        }
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
        viewNums: 1,
        likeNums: 1,
        // content: 1,
        // commentNums: 1,
        _id: 0,
        brief: 1,
        articleId: 1
    }).sort({'_id':-1}).skip(start).limit(end - start).exec();

    // changeID(articles);

    ctx.body = {
        code: 10000,
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
        mdContent = query.mdContent,
        htmlContent = query.htmlContent,
        timeStamp = +new Date();
    // 检测
    let art = new articleModel({
        title,
        mdContent,
        htmlContent,
        articleId: timeStamp,
        publishTime: timeStamp,
        brief: mdContent.slice(0, 110)
    });

    try {
        await art.save();
        // 其他操作，如发送注册邮件
        ctx.body = {
            result: true,
            code: 10000,
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
    let articleId = ctx.query.articleId,
        res = {
            result: true,
            code: 10000
        };
    
    try {
        articleModel.deleteOne({
            articleId
        }).exec();
    } catch(err) {
        res = errorCode.errorMsg(20004);
    }

    ctx.body = res;
});

// 获取文章的具体内容
router.get('/article', async (ctx, next) => {
    let articleId = ctx.query.articleId;

    let article = await articleModel.findOne({
        articleId
    }, {
        title: 1,
        publishTime: 1,
        articleId: 1,
        viewNums: 1,
        likeNums: 1,
        mdContent: 1,
        htmlContent: 1,
        // commentNums: 1,
        // brief: 1,
        _id: 0
    }).exec(),
        res = {
            result: true,
            code: 10000,
            data: article
        };

    // 查看记录次数加一
    try {
        // 自增 viewNums
        articleModel.updateOne({
            articleId
        }, {
            viewNums: ++article.viewNums || 0
        }).exec();
    } catch(e) {
        res = errorCode.errorMsg(20000);
    }

    ctx.body = res;
});
// 修改文章内容
router.put('/article', async (ctx, next) => {
    let body = ctx.request.body,
        articleId = body.articleId,
        title = body.title,
        mdContent = body.mdContent,
        htmlContent = body.htmlContent,
        res = {
            result: true,
            code: 10000
        };
    try {
        articleModel.updateOne({
            articleId
        }, {
            title,
            mdContent,
            htmlContent,
            brief: mdContent.slice(0, 110)
        }).exec();
    } catch (e) {
        res = errorCode.errorMsg(20005);
    }

    ctx.body = res;
});
// 获取最新的文章信息
router.get('/newest', async (ctx, next) => {
    let res = {
        result: true,
        code: 10000
    };
    try {
        let newestArticles = await articleModel.find({}, {
            articleId: 1,
            title: 1,
            articleId: 1,
            _id: 0
        }).sort({'_id':-1}).limit(6).exec();
        res.data = newestArticles;
    } catch (e) {
        res = errorCode.errorMsg(20000);
    }

    ctx.body = res;
});

// 点赞+1
router.get('/likeArticle', async (ctx, next) => {
    let query = ctx.query,
        articleId = query.articleId,
        art = null,
        res = {
            result: true,
            code: 10000
        }

    try {
        // 查找到对应的数据
        art = await articleModel.findOne({
            articleId
        }).exec();
        // 自增 likeview
        articleModel.updateOne({
            articleId
        }, {
            likeNums: ++art.likeNums || 0
        }).exec();
    } catch(e) {
        res = errorCode.errorMsg(20000);
    }
    ctx.body = res;
});

// 获取当前文章的数量
router.get('/articlesNum', async (ctx, next) => {
    let res = {
        result: true,
        code: 10000
    },
        num;

    try {
        num = await articleModel.getArticlesNumber();
        res.data = {
            num
        };
    } catch (e) {
        res = errorCode.errorMsg(20000);
    }

    ctx.body = res;
});

module.exports = router;