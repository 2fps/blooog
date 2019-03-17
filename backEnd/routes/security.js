const router = require('koa-router')();
const RSA = require('../util/RSA.js');
const svgCaptcha = require('svg-captcha');
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

/**
 * 获取登录验证码
 */

router.get('/verificationCode', async (ctx, next) => {
    let res = {
        result: false,
        code: 20000
    };

    if (config.verificationCode) {
        // 开启了登录验证
        let captcha = svgCaptcha.create();

        // 验证码数据存到global，后期看看有啥其他方案。
        global.captcha = config.strictVerification ? captcha.text : captcha.text.toLowerCase();

        res = {
            result: true,
            type: 'svg',
            data: captcha.data
        };
    }

    ctx.body = res;
});


module.exports = router;