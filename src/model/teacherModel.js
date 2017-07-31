/**
 * 教师管理实体类
 * 创建人：高锋
 * 创建时间：2017-7-26
 */
var stringUtils = require('../utils/stringUtils');
var teacherField = [
    'id',
    'node',
    'name',
    'department'
];
var teacherModel = stringUtils.ArrayToString(teacherField,',');
module.exports = teacherModel;