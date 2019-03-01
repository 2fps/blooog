let mongoose = require('mongoose');

let catalogSchema = new mongoose.Schema({
    catalogId: {
        type: Number,
        default: +new Date
    },
    catalogName: String,
    catalogNum: {
        type: Number,
        default: 0
    },
    parentId: Number
}, {
    versionKey: false
});

catalogSchema.statics.getCatalogNum = async function() {
    let count = await this.count({}).exec();

    return count;
};

catalogSchema.statics.getAllCatalog = function(start, end) {
    if (0 === start && 0 === end) {
        // 返回所有
        end = await this.getCatalogNum();
    }
    let tags = await this.find({}, {_id: 0})
        .skip(start)
        .limit(end - start).exec();

    return tags;
};





module.exports = catalogSchema;