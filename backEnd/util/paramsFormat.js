/**
 * 此文件是基于 joi ，设置每个接口的参数格式
 * https://github.com/hapijs/joi
 */

const Joi = require('joi');

let paramsFormat = {
    get: {
        website: {},
        // 获取标签
        tag: {
            start: Joi.string(),
            end: Joi.string()
        },
        // 获取总文章
        articles: {
            start: Joi.number(),
            end: Joi.number(),
            search: Joi.string()
        },
        // 获取文章详细信息
        article: {
            articleId: Joi.string()
        },
        // 获取公钥
        publicKey: {},
        // 获取最新的几条信息
        newest: {},
        // 文章的赞功能
        likeArticle: {
            articleId: Joi.string()
        },
        // 获取总文章的数量
        articlesNum: {}
    },
    post: {
        // 保存标签
        tag: {
            tagName: Joi.string(),
            tagNum: Joi.number()
        },
        // 登录接口
        loginIn: {
            username: Joi.string(),
            password: Joi.string()
        },
        // 写文章
        article: {
            title: Joi.string(),
            mdContent: Joi.string(),
            htmlContent: Joi.string(),
            brief: Joi.string(),
            tagsId: Joi.array().items(
                Joi.number()
            )
        }
    },
    put: {
        // 修改文章站点信息
        website: {
            siteName: Joi.string(),
            subTitle: Joi.string(),
            siteUrl: Joi.string(),
            webRecord: Joi.string().allow('')
        },
        // 修改 tag 名称
        tag: {
            tagName: Joi.string(),
            newName: Joi.string()
        },
        // 修改用户信息
        user: {
            username: Joi.string(),
            oldpass: Joi.string(),
            newpass: Joi.string()
        },
        // 修改文章信息
        article: {
            articleId: Joi.string(),
            title: Joi.string(),
            mdContent: Joi.string(),
            htmlContent: Joi.string(),
            brief: Joi.string(),
            tagsId: Joi.array().items(
                Joi.number()
            )
        }
    },
    delete: {
        // 删除tag
        tag: {
            tagName: Joi.string()
        },
        // 删除文章
        article: {
            articleId: Joi.string()
        }
    }
};

let query = ['get', 'delete'],
    requestBody = ['post', 'put'];

// 检测参数
let checkFormat = function(ctx) {
    let method = ctx.method.toLowerCase(),
        lastIndexStart = ctx.url.lastIndexOf('/'),
        lastIndexEnd = ctx.url.lastIndexOf('?') > -1 ? ctx.url.lastIndexOf('?') : ctx.url.length,
        path = ctx.url.substring(lastIndexStart + 1, lastIndexEnd),
        test = null;
    // 没有path，则异常
    if (!path) {
        return {
            error: true
        };
    }
    // 根据请求方式，判断不同的数据位置
    if (~query.indexOf(method)) {
        test = ctx.query;
    } else {
        test = ctx.request.body;
    }
    
    let value = Joi.validate(test, paramsFormat[ method ][ path ], { allowUnknown: true, abortEarly: true });

    return value;
}

module.exports = {
    checkFormat
};