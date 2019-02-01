// 注册 admin/admin 的用户
const userModel = require('../models/userModel');
const crypto = require('crypto');

userModel.findOne({}).exec().then((doc) => {
    if (!doc) {
        let hash = crypto.createHash('md5'),
            password = hash.update('admin').digest('base64');
        // 没有用户则新建
        let user = new userModel({
            username: 'admin',
            email: 'admin@admin.com',
            registerTime: '2019-12-12',
            password
        });
    
        user.save();
    }

});