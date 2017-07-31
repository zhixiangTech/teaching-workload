/**
 * 密码工具类
 */
var crypto = require('crypto');

var salt = 'HNCUedu_';

/**
 * 进行 SHA1 加密
 * @param {String} value 原值
 * @return {String} SHA1 值
 */
exports.SHA1 = function (value) {
    var sha1 = crypto.createHash('sha1');
    sha1.update(salt+value);
    return sha1.digest('hex');
};

exports.MD5 = function (value) {
    var sha1 = crypto.createHash('md5');
    sha1.update(salt+value);
    return sha1.digest('hex');
};