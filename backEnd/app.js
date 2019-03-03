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
const xss = require('node-xss').clean

const article = require('./routes/article')
const website = require('./routes/website')
const login = require('./routes/login')
const security = require('./routes/security')
const tag = require('./routes/tag')

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
app.use(article.routes(), article.allowedMethods())
app.use(website.routes(), website.allowedMethods())
app.use(login.routes(), login.allowedMethods())
app.use(security.routes(), security.allowedMethods())
app.use(tag.routes(), tag.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
  log4js.errLogger(ctx, err)
});

// 数据库连接
let mongoose = require('mongoose'),
    DBUrl = 'mongodb://127.0.0.1:27017/data';

// 连接
mongoose.connect(DBUrl);

// 连接成功
mongoose.connection.on('connected', function () {
    console.log('Mongoose connection open to ' + DBUrl);
});

// 连接异常
mongoose.connection.on('error',function (err) {
    console.log('Mongoose connection error: ' + err);
});

// 连接断开
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose connection disconnected');
});

require('./config/init.js');


function filterXss(ctx) {
  if (ctx.query) {
    xss(ctx.query);
  }
  if (ctx.request && ctx.request.body) {
    xss(ctx.request.body);
  }
}


module.exports = app
