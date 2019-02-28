const router = require('koa-router')();

router.prefix('/api');

/** 
 * 获取tags
*/
router.get('/tags', async (ctx, next) => {
    ctx.body = {
        result: true
    }
});


module.exports = router;