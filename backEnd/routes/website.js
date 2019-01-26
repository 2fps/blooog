const router = require('koa-router')();

router.prefix('/api/website');

// 获取站点的一些配置信息
router.get('/', function (ctx, next) {
    ctx.body = {
        siteName: "前端驿站",
        subTitle: "Just For Fun",
        siteUrl: "http://127.0.0.1:3000",
        webRecord: "苏1234567890"
    };
});

module.exports = router;
