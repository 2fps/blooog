const router = require('koa-router')();
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const RSA = require('../util/RSA.js');
const errorCode = require('../util/errorCode');

router.prefix('/api');

router.post('/loginIn', async (ctx, next) => {
    let crypto = require('crypto'),
        hash = crypto.createHash('md5'),
        query = ctx.request.body,
        username = query.username,
        password = query.password,
        // RSA解密
        decrypted = RSA.key.decrypt(password, 'utf8');

    // console.log('decrypted: ', decrypted);
    password = hash.update(decrypted).digest('base64');

    let info = await userModel.findOne({username}).exec();

    if (info && info.password === password) {
        let userToken = {
            name: username
        }
        const token = jwt.sign(userToken, 'jwt demo', {expiresIn: '1h'})  //token签名 有效期为1小时
        res = {
            result: true,
            code: 10000,
            msg: '登录成功',
            token
        };
    } else {
        res = errorCode.errorMsg(20007);
    }

    ctx.body = res;
});

router.post('/loginOut', async (ctx, next) => {
    ctx.body = {
        result: true,
        code: 10005,
        msg: errorCode.codeMessage[10005]
    };
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
        res = {result: true, code: 10000};
    } else {
        res = errorCode.errorMsg(20008);
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
