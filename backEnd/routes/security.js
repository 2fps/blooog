const router = require('koa-router')();
const RSA = require('../util/RSA.js');

router.prefix('/api');

/** 
 * 获取RSA加密的公钥
*/
router.get('/publicKey', async (ctx, next) => {
    ctx.body = {
        result: true,
        secret: RSA.publicKey
    }
});


module.exports = router;