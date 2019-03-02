const router = require('koa-router')();
const RSA = require('../util/RSA.js');
const errorCode = require('../util/errorCode');

router.prefix('/api');

/** 
 * 获取RSA加密的公钥
*/
router.get('/publicKey', async (ctx, next) => {
    ctx.body = {
        result: true,
        code: 10000,
        secret: RSA.publicKey
    }
});


module.exports = router;