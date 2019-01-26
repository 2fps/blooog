const router = require('koa-router')();
const userModel = require('../models/userModel');

router.prefix('/api');

router.post('/loginIn', async (ctx, next) => {
    let query = ctx.request.body,
        username = query.username,
        password = query.password,
        res = null;

    let info = await userModel.findOne({username}).exec();

    if (info && info.password === password) {
        res = {
            result: true,
            msg: '登录成功'
        };
    } else {
        res = {
            result: false,
            msg: '用户名或密码错误'
        };
    }

    ctx.body = res;
})

router.post('/loginOut', async (ctx, next) => {
    ctx.body = 'koa2 string'
})

module.exports = router
