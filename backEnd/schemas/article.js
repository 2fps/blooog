let mongoose = require('mongoose');

let articleSchema = new mongoose.Schema({
    articleId: Number,          // 文章id号，以时间戳为准
    title: String,              // 文章标题
    mdContent: String,          // markdown文章内容
    htmlContent: String,        // html文章内容
    publishTime: Number,        // 发布时间的时间戳
    // commentNums: String,     // 评论数量
    brief: String,              // 简略内容
    viewNums: {                 // 查看数
        type: Number,
        default: 0
    },
    likeNums: {                 // 赞数
        type: Number,
        default: 0
    }
}, {
    versionKey: false
});

// 用户获取当前所有的文章数量
articleSchema.statics.getArticlesNumber = async function() {
    let num = await this.model('article').countDocuments({}).exec();

    return num;
};

module.exports = articleSchema;