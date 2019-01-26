const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const index = require('./routes/index')
const article = require('./routes/article')
const website = require('./routes/website')
const login = require('./routes/login')

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

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(article.routes(), article.allowedMethods())
app.use(website.routes(), website.allowedMethods())
app.use(login.routes(), login.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
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


module.exports = app
