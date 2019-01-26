const router = require('koa-router')();
const websiteModel = require('../models/websiteModel');

router.prefix('/api/website');

// 获取站点的一些配置信息
router.get('/', async (ctx, next) => {
    let res = {};
    
    try {
        let website = await websiteModel.findOne({}).exec();

        res = {
            result: true,
            data: {
                siteName: website.siteName,
                subTitle: website.subTitle,
                siteUrl: website.siteUrl,
                webRecord: website.webRecord
            }
        };
    } catch (err) {
        res = {
            result: false,
            msg: '异常'
        };
    }

    ctx.body = res;
});

module.exports = router;
