// 默认配置
module.exports = {
    pages: 10,
    loginEncryption: true,                      // 登录是否开启加密  RSA  1024位
    username: 'admin',                          // 用户名
    password: 'admin',                          // 密码
    DBUrl: 'mongodb://127.0.0.1:27017/data'     // 数据库路径
};