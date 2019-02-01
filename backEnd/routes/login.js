const router = require('koa-router')();
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

router.prefix('/api');

router.post('/loginIn', async (ctx, next) => {
    const crypto = require('crypto');
    let hash = crypto.createHash('md5'),
        query = ctx.request.body,
        username = query.username,
        password = hash.update(query.password).digest('base64'),
        res = null;

    let info = await userModel.findOne({username}).exec();

    if (info && info.password === password) {
        let userToken = {
            name: username
        }
        const token = jwt.sign(userToken, 'jwt demo', {expiresIn: '1h'})  //token签名 有效期为1小时
        res = {
            result: true,
            msg: '登录成功',
            token
        };
    } else {
        res = {
            result: false,
            msg: '用户名或密码错误'
        };
    }

    ctx.body = res;
});

router.post('/loginOut', async (ctx, next) => {
    ctx.body = 'koa2 string'
});

router.put('/user', async (ctx, next) => {
    let query = ctx.request.body,
        username = query.username,
        oldpass = MD5(query.oldpass),
        newpass = MD5(query.newpass),
        res = null;

    let hasUser = await userModel.findOne({username}).exec();

    if (hasUser && oldpass == hasUser.password) {
        // 校验老密码，正确
        userModel.updateOne({username}, {
            password: newpass
        }).exec();
        res = {result: true};
    } else {
        res = {result: false};
        // 老密码错误
    }
    ctx.body = res;
});

function MD5(str) {
    let crypto = require('crypto'),
        hash = crypto.createHash('md5'),
        res = hash.update(str).digest('base64');

    return res;
}

module.exports = router
