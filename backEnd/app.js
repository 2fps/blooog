const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const jwtKoa = require('koa-jwt')
const secret = 'jwt demo'
const log4js = require('./util/log4js')
// const xss = require('node-xss').clean
const middleware = require('./util/middleware.js');
const registerRouter = require('./routes');

// 数据库
require('./config/db.js');

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
    enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
    extension: 'pug'
}))

app.use(jwtKoa({secret}).unless({
    path: [/^\/api\/loginIn/,
        /^\/api\/newest/,
        /^\/api\/articles/,
        /^\/api\/likeArticle/,
        /^\/api\/article/,
        /^\/api\/tag/,
        /^\/api\/publicKey/,
        /^\/api\/website/] //数组中的路径不需要通过jwt验证
}))

// 一些中间件
middleware.use(app);

// logger
app.use(async (ctx, next) => {
    // filterXss(ctx);
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
    log4js.resLogger(ctx, ms)
})

// routes
app.use(registerRouter());

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
    log4js.errLogger(ctx, err)
});



function filterXss(ctx) {
    if (ctx.query) {
        xss(ctx.query);
    }
    if (ctx.request && ctx.request.body) {
        xss(ctx.request.body);
    }
}


module.exports = app
