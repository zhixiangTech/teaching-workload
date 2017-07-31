/**
 * 公式管理实体类
 * 创建人：丁涛
 * 创建时间：2017/7/30
 */
var stringUtils = require('../utils/stringUtils');
var formulaField = [
    'id',
    'description',
    'K',
    'K1',
    'K2',
    'M',
    'M1',
    'M2',
    'N',
    'limt',
    'formula',
    'formula_type as formulaType'
];
var formulaModel = stringUtils.ArrayToString(formulaField,',');
module.exports = formulaModel;