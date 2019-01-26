let mongoose = require('mongoose');

let websiteSchema = new mongoose.Schema({
    siteName: String,           // 站点名称
    subTitle: String,           // 站点副标题
    siteUrl: String,            // 站点url
    webRecord: String           // 备案
}, {
    versionKey: false
});


module.exports = websiteSchema;