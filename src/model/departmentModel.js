/**
 *部门管理的实体类
 * 创建人:华梦青
 * 时间：2017年7月26日
 */

var stringUtils = require('../utils/stringUtils');
var departmentField = [
    'id',
    'node',
    'name',
    'count',
    'sort'
];
var  departmentModel = stringUtils.ArrayToString(departmentField,',');

module.exports = departmentModel;