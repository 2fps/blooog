let mongoose = require('mongoose');
let websiteSchema = require('../schemas/website');

let websiteModel = mongoose.model('website', websiteSchema);

module.exports = websiteModel;