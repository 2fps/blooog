// 默认配置
module.exports = {
    pages: 10,      // 次配置还未生效
    loginEncryption: true,                      // 登录是否开启加密  RSA  1024位
    verificationCode: false,                    // 是否开启登录验证码功能
    strictVerification: false,                  // 验证码严格匹配，英文大小写严格匹配，当 verificationCode 为true时生效
    username: 'admin',                          // 用户名
    password: 'admin',                          // 密码
    DBUrl: 'mongodb://127.0.0.1:27017/zircon'   // 数据库路径
};