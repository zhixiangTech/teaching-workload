/**
 * 字典实体类
 * 创建人：刘佳乐
 * 创建时间：2017-7-27
 */
var stringUtils = require('../utils/stringUtils');
var dictField = [
    'id',
    'value',
    'label',
    'type',
    'description',
    'sort'
];
var dictModel = stringUtils.ArrayToString(dictField,',');

module.exports = dictModel;
