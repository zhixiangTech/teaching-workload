/**
 * 字典数据持久化操作接口层
 * 创建人：华梦青
 * 创建时间：2017-7-30
 */

var connection = require('../core/Connection');
var dictModel = require('../model/dictModel');
/**
 * 查询字典列表
 * @param options
 * @param callback
 */
exports.queryDictList = function (options, callback) {
    var queryLimit=' WHERE ';
    var queryDictList = 'SELECT '+ dictModel +' FROM dict';
    if (options.queryParam != null){
        queryLimit=queryLimit+options.queryParam.paramName + " LIKE '%"+options.queryParam.paramValue+"%'";
        queryDictList+=queryLimit;
    }
    queryDictList = queryDictList + ' LIMIT ' + (options.pageNow - 1)*options.pageSize + ',' + options.pageSize;
    connection.query(queryDictList,function (err,result) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
        };
        callback(options,result);
    })
};
/**
 * 计算数量
 * @param options
 * @param callback
 */
exports.queryDictCount = function (options, callback) {
    var queryLimit = ' WHERE ';
    var queryDictCountSql = 'SELECT COUNT(id) as count FROM dict';
    if (options.queryParam != null){
        queryLimit=queryLimit+options.queryParam.paramName + " LIKE '%"+options.queryParam.paramValue+"%'";
        queryDictCountSql+=queryLimit;
    }
    connection.query(queryDictCountSql,function (err, count) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
        };
        callback(count[0].count);
    })
};
/**
 * 通过ID查询字典数据
 * @param id
 * @param callback
 */
exports.queryDictById = function (id, callback) {
    var queryDictById = 'SELECT '+ dictModel +' FROM dict WHERE id = ?';
    var queryParams = [id];
    connection.query(queryDictById,queryParams,function(err, result){
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
        }else{
            //console.log(result);
            callback(id, result[0]);
        }

    });
};
/**
 * 添加字典数据
 * @param options
 * @param callback
 */
exports.addDictInfo = function (options, callback) {
    var addDictInfoSql= 'INSERT INTO dict(value,label,type,description,sort) VALUES (?,?,?,?,?)';
    var addParams = [options.value,options.label,options.type,options.description,options.sort];
    connection.query(addDictInfoSql,addParams, function (err, result) {
        if(err){
            console.log('[INSERT ERROR] - ',err.message);
            return;
        }
        callback(null, result);
        console.log(result);
    });
};
/**
 * 修改字典数据
 * @param options
 * @param callback
 */
exports.updateDictInfo = function (options, callback) {
    var updateDictInfoSql= 'UPDATE dict SET value=?,label = ?,type = ?,description=?,sort=? WHERE id = ?';
    var updateParams = [options.value,options.label,options.type,options.description,options.sort,options.id];
    connection.query(updateDictInfoSql,updateParams, function (err, result) {
        if(err){
            console.log('[UPDATE ERROR] - ',err.message);
            return;
        }
        callback(null, result);
    });
};
/**
 * 删除字典数据
 * @param id
 * @param callback
 */
exports.deleteDictInfo = function (id, callback) {
    var deleteDictInfoSql= 'DELETE  FROM dict WHERE id = ?';
    var dictParams = [id];
    connection.query(deleteDictInfoSql,dictParams, function (err, result) {
        if(err){
            console.log('[DELETE ERROR] - ',err.message);
            return;
        }
        callback(null, result);
    });
};













































// /**
//  * 通过字典类型查询字典
//  * @param type
//  * @param callback
//  */
// exports.queryDictByType = function (type, callback) {
//     var queryDictByTypeSql = 'SELECT '+ dictModel +' FROM dict WHERE type = ?';
//     var queryParams = [type];
//     connection.query(queryDictByTypeSql,queryParams,function (err, result) {
//         if(err){
//             console.log('[SELECT ERROR] - ',err.message);
//             return;
//         };
//         callback(options, result);
//     })
// };
//
// /**
//  * 查询字典标签名
//  * @param options
//  * @param callback
//  */
// exports.queryDictLabel = function (options, callback) {
//     var queryDictLabelSql = 'SELECT '+ dictModel +' FROM dict WHERE type = ? and value = ?';
//     var queryParams = [options.type,options.value];
//     connection.query(queryDictLabelSql,queryParams,function (err, result) {
//         if(err){
//             console.log('[SELECT ERROR] - ',err.message);
//             return;
//         };
//         callback(options, result[0]);
//     })
// };