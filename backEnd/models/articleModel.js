let mongoose = require('mongoose');
let articleSchema = require('../schemas/article');

let articleModel = mongoose.model('article', articleSchema);

module.exports = articleModel;