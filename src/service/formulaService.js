/**
 * 公式管理服务层
 * 创建人：丁涛
 * 创建时间：2017/7/30
 */
var formulaDao = require('../dao/formulaDao');
var async = require('async');

exports.queryFormulaList = function (options, callback) {
    async.waterfall([
        function (cb) {
            formulaDao.queryFormulaCount(options, function (count) {
                cb(null,count);
            });
        },
        function (count) {
            formulaDao.queryFormulaList(options, function (err, formulaList) {
                callback(options, formulaList, count);
            });
        }
    ])
};

/*
 * 添加信息
 * */
exports.addFormulaInfo = function (options,callback) {
    console.log('======================'+options.id+"============================");
    if(options.id!=""){
        console.log('edit++++++++++++++++++++++++++');
        formulaDao.editFormulaInfo(options,function (err,result) {
            callback(options,result);
        });
    }else {
        console.log('add++++++++++++++++++++++++++');
        formulaDao.addFormulaInfo(options,function (err,result) {
            callback(options,result);
        });
    }
};

/*
* 查询信息
* */
exports.queryFormulaInfoById = function (options,callback) {
    formulaDao.queryFormulaInfoById(options,function (err,result) {
        if(options == []){
            callback(options,null);
        }else {
            callback(options,result);
        }
    });
}



exports.deleteFormulaInfo =function (options,callback) {
    formulaDao.deleteFormulaInfo(options,function(err,result){
        callback(options,result);
    });
}
