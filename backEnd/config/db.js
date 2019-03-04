// 数据库连接
let mongoose = require('mongoose'),
    config = require('./config.js'),
    DBUrl = config.DBUrl;

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

// 数据库数据初始化
require('./init.js');