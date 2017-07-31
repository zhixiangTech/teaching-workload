/**
 * 字典数据服务层
 * 创建人：华梦青
 * 创建时间：2017-7-27
 */

var dictDao = require('../dao/dictDao');
var async = require('async');

/**
 * 查询字典列表
 * @param options
 * @param callback
 */

exports.queryDictList = function (options, callback) {
    async.waterfall([
        function (cb) {
            dictDao.queryDictCount(options, function (count) {
                cb(null,count);
            });
        },
        function (count) {
            dictDao.queryDictList(options, function (err, queryDictList) {
                callback(options, queryDictList, count);
            });
        }
    ])
};
/**
 * 计算数量
 * @param callback
 */
exports.queryDictCount = function (callback) {
    dictDao.addDictInfo(function (count) {
        callback(count);
    });
};
/**
 * 通过ID查询字典列表
 * @param id
 * @param callback
 */
exports.queryDictById = function (id, callback) {
    dictDao.queryDictById(id, function (err, dictInfo) {
        //console.log(departmentInfo);
        if(dictInfo==[]){
            callback(id, null);
        }else{
            callback(id, dictInfo);
        }

    });
};
/**
 * 保存字典数据
 * @param options
 * @param callback
 */
exports.saveDictInfo = function (options, callback) {
    //console.log(options);
    if(options.id == ''){
        //添加字典数据
        dictDao.addDictInfo(options, function (err, result) {
            callback(null, result);
        });
    }else{
        //修改字典数据
        dictDao.updateDictInfo(options, function (err, result) {
            callback(null, result);
        });
    }
};

/**
 * 删除部门信息
 * @param options
 * @param callback
 */
exports.deleteDictInfo = function (options, callback) {
    dictDao.deleteDictInfo(options, function (err, result) {
        callback(null, result);
    });
};






























// /**
//  * 通过字典类型查询字典
//  * @param type
//  * @param callback
//  */
// exports.queryDictByType = function (type, callback) {
//     dictDao.queryDictByType(options, function (err, dictList) {
//         callback(options, dictList);
//     })
// };
//
// /**
//  * 查询字典标签名
//  * @param options
//  * @param callback
//  */
// exports.queryDictLabel = function (options, callback) {
//     console.log(options.type+'======='+options.value);
//     dictDao.queryDictLabel(options, function (err, dict) {
//         callback(options, dict);
//     })
// };