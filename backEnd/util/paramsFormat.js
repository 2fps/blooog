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
            start: Joi.number().integer(),
            end: Joi.number().integer()
        },
        articles: {
            start: Joi.string(),
            end: Joi.string(),
            search: Joi.string()
        },
        article: {
            articleId: Joi.number()
        },
        publicKey: {},
        newest: {},
        likeArticle: {
            articleId: Joi.number()
        },
        articlesNum: {}
    },
    post: {
        website: {
            siteName: Joi.string(),
            subTitle: Joi.string(),
            siteUrl: Joi.string(),
            webRecord: Joi.string()
        },
        // 保存标签
        tag: {
            tagName: Joi.string(),
            tagNum: Joi.number().integer()
        },
        loginIn: {
            username: Joi.string(),
            password: Joi.string()
        },
        article: {
            title: Joi.string(),
            mdContent: Joi.string(),
            htmlContent: Joi.string(),
            tagsId: Joi.array().items(
                Joi.number().integer()
            )
        }
    },
    put: {
        tag: {
            tagName: Joi.string(),
            newName: Joi.string()
        },
        user: {
            username: Joi.string(),
            oldpass: Joi.string(),
            newpass: Joi.string()
        },
        article: {
            articleId: Joi.number(),
            title: Joi.string(),
            mdContent: Joi.string(),
            htmlContent: Joi.string(),
            tagsId: Joi.array().items(
                Joi.number().integer()
            )
        }
    },
    delete: {
        tag: {
            tagName: Joi.string()
        },
        article: {
            articleId: Joi.number()
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

    if (!path) {
        return {
            error: true
        };
    }
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