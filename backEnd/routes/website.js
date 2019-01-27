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

router.post('/', async (ctx, next) => {
    let body = ctx.request.body,
        data = {
            siteName: body.siteName,
            subTitle: body.subTitle,
            siteUrl: body.siteUrl,
            webRecord: body.webRecord
        };
        
    let error = await websiteModel.update({}, data).exec();
    
    ctx.body = {
        result: true,
        msg: ''
    };
});

module.exports = router;
