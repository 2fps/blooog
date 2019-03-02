/** 
 * 处理错误码
*/
let codeMessage = {
    // 成功类型
    10000: '获取成功',
    10001: '操作成功',
    10002: '创建成功',
    10003: '删除成功',
    10004: '修改成功',

    // 失败类型
    20000: '操作失败',
    20001: '数据重复',
    20002: '没有该数据',
    20003: '创建失败',
    20004: '删除失败',
    20005: '修改失败',
    20006: '获取失败',
    20007: '用户名或密码错误',
    20008: '原密码错误',


    // 警告类型
};

let errorMsg = (code) => {
    return {
        result: false,
        code,
        msg: codeMessage[ code ]
    }
}

module.exports = {
    codeMessage,
    errorMsg
};