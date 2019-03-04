// 注册 admin/admin 的用户
const UserModel = require('../models/userModel');

let initConfig = require('./config.js');
let MD5 = require('../util/MD5').MD5;
// 检测用户
UserModel.findOne({}).exec().then((doc) => {
    if (!doc) {
        // 没有用户则新建
        let user = new UserModel({
            username: initConfig.username,
            email: '',
            registerTime: '',
            password: MD5(initConfig.password)
        });
        try {
            user.save();
        } catch (e) {

        }
    }
});

// 
// TagModel.findOne({}).exec().then((doc) => {

// });