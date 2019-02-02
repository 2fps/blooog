// 注册 admin/admin 的用户
const userModel = require('../models/userModel');
const crypto = require('crypto');
let initConfig = require('./config.js');
let MD5 = require('../util/MD5').MD5;

userModel.findOne({}).exec().then((doc) => {
    if (!doc) {
        // 没有用户则新建
        let user = new userModel({
            username: initConfig.username,
            email: '',
            registerTime: '',
            password: MD5(initConfig.password)
        });
    
        user.save();
    }

});