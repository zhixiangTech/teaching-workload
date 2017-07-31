/**
 * 教学管理实体类
 * 创建人：高锋
 * 创建时间：2017-7-30
 */
var stringUtils = require('../utils/stringUtils');
var teachingTaskField = [
    'id',
    'tid',
    'year',
    'term',
    'course_node as courseNode',
    'class_node as classNode',
    'class_size as classSize',
    'course_number as courseNumber',
    'plan_hours as planHours',
    'course_hours as courseHours',
    'experience_hours as experienceHours',
    'M',
    'exam_method as examMethod',
    'state'
];
var teachingTaskModel = stringUtils.ArrayToString(teachingTaskField,',');
module.exports = teachingTaskModel;