let mongoose = require('mongoose');
let catalogSchema = require('../schemas/catalog');

let catalogModel = mongoose.model('catalog', catalogSchema);

module.exports = catalogModel;