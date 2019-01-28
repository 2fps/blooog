let mongoose = require('mongoose');

let articleSchema = new mongoose.Schema({
    articleId: {            // 文章id号
        type: Number,
        default: 0
    },
    title: String,          // 文章标题
    mdContent: String,      // markdown文章内容
    htmlContent: String,    // html文章内容
    publishTime: Number,    // 发布时间
    // commentNums: String,    // 评论数量
    brief: String          // 简略内容
/*     readNums: {             // 查看数
        type: Number,
        default: 0
    },
    likeNums: {              // 赞数
        type: Number,
        default: 0
    } */
}, {
    versionKey: false
});


module.exports = articleSchema;