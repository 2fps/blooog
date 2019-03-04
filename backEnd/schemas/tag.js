let mongoose = require('mongoose');

let tagSchema = new mongoose.Schema({
    tagId: Number,
    tagName: String,
    tagNum: {
        type: Number,
        default: 0
    }
}, {
    versionKey: false
});
/** 
 * 获取tag标签的个数
*/
tagSchema.statics.getTagsNum = async function() {
    let count = await this.countDocuments({}).exec();

    return count;
};

/** 
 * 获取详细的标签内容
 * 当start和end是0的时候，默认返回全部数据
*/
tagSchema.statics.getTags = async function(start, end) {
    if (0 === start && 0 === end) {
        // 返回所有
        end = await this.getTagsNum();
    }
    let tags = await this.find({}, {_id: 0})
        .skip(start)
        .limit(end - start).exec();

    return tags;
};
/** 
 * 更新tag的名称
*/
tagSchema.statics.updateTagName = async function(oldName, newName) {
    await this.updateOne({
        tagName: oldName
    }, {
        tagName: newName
    }).exec();
};
/** 
 * 删除tag标签
*/
tagSchema.statics.removeTag = async function(tagName) {
    await this.deleteOne({
        tagName
    }).exec();
};

/** 
 * 数量累加
*/
tagSchema.statics.addCounter = async function(tagId, num = 1) {
    let data = await this.findOne({
        tagId
    }).exec();
    // 存在tag已经被删除的情况
    if (!data) {
        return;
    }
    num = data.tagNum + num;

    // 设置新的数量
    await this.updateOne({
        tagId
    }, {
        tagNum: num
    }).exec();
}

/** 
 * 判断该标签数据中是否存在
*/
tagSchema.statics.tagExists = async function(tagName) {
    let count = await this.model('tag').countDocuments({
        tagName
    }).exec();

    return count > 0 ? true : false;
}


module.exports = tagSchema;