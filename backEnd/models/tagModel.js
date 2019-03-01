let mongoose = require('mongoose');
let tagSchema = require('../schemas/tag');

let tagModel = mongoose.model('tag', tagSchema);

module.exports = tagModel;