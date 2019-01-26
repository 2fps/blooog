let mongoose = require('mongoose');
let userSchema = require('../schemas/user');

let userModel = mongoose.model('user', userSchema);

module.exports = userModel;