/**
 * 管理员实体类
 * 创建人：刘佳乐
 * 创建时间：2017-7-27
 */
var stringUtils = require('../utils/stringUtils');
var adminField = [
    'id',
    'username',
    'password',
    'permission_node as permissionNode',
    'description',
    'login_time as loginTime'
];
var adminModel = stringUtils.ArrayToString(adminField,',');

module.exports = adminModel;