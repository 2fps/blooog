exports.MD5 = function(str) {
    let crypto = require('crypto'),
        hash = crypto.createHash('md5'),
        res = hash.update(str).digest('base64');

    return res;
}