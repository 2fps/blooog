/** 
 * 此文件存放独立的过滤器
*/
const checkFormat = require('./paramsFormat').checkFormat;
const xss = require('xss');

let use = (app) => {
    // 数据校验中间件
    app.use(async (ctx, next) => {
        let result = {};
    
        try {
            // 检查数据
            // 数据格式再paramsFormat.js文件中
            result = checkFormat(ctx);
        } catch(e) {
            result.error = true;
        }
    
        if (result.error) {
            ctx.body = {
                result: false,
                error: ''
            };
    
            return;
        }
        await next(); 
    });
    // 防xss中间件
    app.use(async (ctx, next) => {
        const params = ['get', 'delete'];
        let data = {};

        if (~params.indexOf( ctx.method.toLowerCase() )) {
            // 检验参数
            data = ctx.query;
        } else {
            data = ctx.request.body;
        }
        data = check(data);

        await next(); 
    });
};


module.exports = {
    use
};

/**
 * 利用xss库处理xss问题
 * @param {Object} data 参数数据
 */
function check(data) {
    let config = {
        whiteList: [],
        stripIgnoreTag: false, // filter out all HTML not in the whilelist
        stripIgnoreTagBody: ["<>"],
    };

    for (let key in data) {
        let val = data[ key ];

        if (val.constructor === Object || val.constructor === Array) {
            check(val);
        } else {
            if (typeof val === 'string') {
                val = xss(val, config);
            }
            // 常量类型
            data[ key ] = val;
        }
    }

    return data;
}