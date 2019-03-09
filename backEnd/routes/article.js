const router = require('koa-router')();
const articleModel = require('../models/articleModel');
const TagModel = require('../models/tagModel');
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
            code: 10000,
            msg: errorCode.codeMessage[10000]
        },
        count = 0,
        articles = null,
        search = query.search;      // 搜索结果

    // 强制赋值查询的范围
    if (!start) {
        start = 0;
    }
    
    try {
        count = await articleModel.countDocuments({}).exec();
        
        if (!end) {
            end = count;
        }
        articles = await articleModel.find({}, {
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

        res.data = articles.slice(0, 10);
        res.count = count;
    } catch (e) {
        res = errorCode.errorMsg(20000);
    }

    ctx.body = res;
});

// 发布新文章的接口
router.post('/article', async (ctx, next) => {
    let body = ctx.request.body,
        title = body.title,
        brief = body.brief,
        // commentNums = 0,
        mdContent = body.mdContent,
        htmlContent = body.htmlContent,
        tagsId = body.tagsId,
        timeStamp = +new Date(),
        res = {
            result: true,
            code: 10000,
            msg: errorCode.codeMessage[10000]
        };
    // 检测
    let art = new articleModel({
        title,
        mdContent,
        htmlContent,
        tagsId,
        articleId: timeStamp,
        publishTime: timeStamp,
        brief
    });

    // 更新数据库
    try {
        // 此处万一只有一个sql成功了呢？咋搞？是个问题？
        // 保存文章
        await art.save();
        // tags 计数
        tagsId.forEach((id) => {
            TagModel.addCounter(id);
        });

    } catch(err) {
        res = errorCode.errorMsg(20003);
    }

    ctx.body = res;
});

// 文章删除
router.delete('/article', async (ctx, next) => {
    let articleId = ctx.query.articleId - 0,
        res = {
            result: true,
            code: 10000,
            msg: errorCode.codeMessage[10000]
        },
        article = null;    // 保存要删除文章的tags
    
    try {
        article = await articleModel.findOne({
            articleId
        });
        await articleModel.deleteOne({
            articleId
        }).exec();
        // 根据被删除文章的tag id号，去tags 集合中减少对应的量
        article.tagsId.forEach((id) => {
            TagModel.addCounter(id, -1);
        });
    } catch(err) {
        res = errorCode.errorMsg(20004);
    }

    ctx.body = res;
});

// 获取文章的具体内容
router.get('/article', async (ctx, next) => {
    let articleId = ctx.query.articleId,
        isRead = ctx.query.isRead,          // 是否是前端的阅读，而不是后端的编辑
        res = {
            result: true,
            code: 10000,
            data: null
        };
        
    // 查看记录次数加一
    try {
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
            tagsId: 1,
            // commentNums: 1,
            // brief: 1,
            _id: 0
        }).exec();

        if (isRead) {
            // 如果是阅读， 自增 viewNums
            articleModel.updateOne({
                articleId
            }, {
                viewNums: ++article.viewNums || 0
            }).exec();
        }

        res.data = article;
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
        brief = body.brief,
        newTags = body.tagsId,
        res = {
            result: true,
            code: 10000
        },
        oldTags = null;     // 记录老的 tags
    try {
        let article = await articleModel.findOne({
            articleId
        });
        oldTags = article.tagsId;

        // 对比新老tag有啥变化，逐步变化
        let changeArr = compareTagId(oldTags, newTags);

        changeArr.del.forEach((id) => {
            TagModel.addCounter(id, -1);
        });
        changeArr.add.forEach((id) => {
            TagModel.addCounter(id, 1);
        });

        articleModel.updateOne({
            articleId
        }, {
            title,
            mdContent,
            htmlContent,
            tagsId: newTags,
            brief
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
        };

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

// 对比arr1到arr2，增加的有多少，减少的有多少
// 返回一个对象，包含add数组记录增加的数据，remove数组记录减少的数据
function compareTagId(arr1, arr2) {
    let res = {
        add: [],
        del: []
    };

    arr1.forEach((item) => {
        // arr1中存在，arr2不存在，即为减少的
        if (!~arr2.indexOf(item)) {
            res.del.push(item);
        }
    });

    arr2.forEach((item) => {
        // arr2中有，arr1中无则是新增的
        if (!~arr1.indexOf(item)) {
            res.add.push(item);
        }
    });

    return res;
}

module.exports = router;