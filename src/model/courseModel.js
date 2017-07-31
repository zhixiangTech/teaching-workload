/**
 * 课程管理实体类
 * 创建人：丁涛
 * 创建时间：2017年7月26日
 */
var stringUtils = require('../utils/stringUtils');
var courseField = [
    'id',
    'name',
    'formula_type as formulaType',
    'course_node as courseNode',
    'major_node as majorNode',
    'course_type as courseType'
];
var courseModel = stringUtils.ArrayToString(courseField,',');

module.exports = courseModel;


