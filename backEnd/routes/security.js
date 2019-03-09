const router = require('koa-router')();
const RSA = require('../util/RSA.js');
const errorCode = require('../util/errorCode');
const config = require('../config/config');

router.prefix('/api');

/** 
 * 获取RSA加密的公钥
*/
router.get('/publicKey', async (ctx, next) => {
    let res = {};

    if (config.loginEncryption) {
        // 开启登录加密功能
        res = {
            result: true,
            code: 10000,
            secret: RSA.publicKey
        };
    } else {
        // 未开启加密
        res = {
            result: false,
            code: 20000
        };
    }
    ctx.body = res;
});


module.exports = router;