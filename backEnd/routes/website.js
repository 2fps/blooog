const router = require('koa-router')();
const websiteModel = require('../models/websiteModel');
const errorCode = require('../util/errorCode');

router.prefix('/api/website');

// 获取站点的一些配置信息
router.get('/', async (ctx, next) => {
    let res = {};
    
    try {
        let website = await websiteModel.findOne({}).exec();

        res = {
            result: true,
            code: 10000,
            msg: errorCode.codeMessage[10000],
            data: {
                siteName: website.siteName,
                subTitle: website.subTitle,
                siteUrl: website.siteUrl,
                webRecord: website.webRecord
            }
        };
    } catch (err) {
        res = errorCode.errorMsg(20006);
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
        },
        res = {
            result: true,
            code: 10000
        };

    try {
        let count = await websiteModel.count({}).exec();
    
        if (count > 0) {
            // 更新
            websiteModel.update({}, data).exec();
        } else {
            let website = new websiteModel(data);
    
            website.save();
        }
    } catch(e) {
        res = errorCode.errorMsg(20000);
    }
        
    ctx.body = res;
});

module.exports = router;
