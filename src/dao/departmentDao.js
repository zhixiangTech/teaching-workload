/**
 *部门管理的数据持久化操作接口层
 * 创建人:华梦青
 * 时间：2017年7月26日
 */
var connection = require('../core/Connection');
var departmentModel = require('../model/departmentModel');
/**
 * 通过ID查询部门信息
 * @param id
 * @param callback
 */
exports.queryDepartmentById = function (id, callback) {
    var queryDepartmentById = 'SELECT '+ departmentModel +' FROM department WHERE id = ?';
    var queryParams = [id];
    //console.log(id);
    connection.query(queryDepartmentById,queryParams,function(err, result){
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
 * 查询部门列表
 * @param options
 * @param callback
 */
exports.queryDepartmentList = function (options, callback) {
    var queryLimit=' WHERE ';
    var queryDepartmentList = 'SELECT '+ departmentModel +' FROM department';
    // if(options!=null){
    //     if(options.name){
    //         queryLimit=queryLimit+'name ='+options.name;
    //     }
    //     if(options.node){
    //         queryLimit=queryLimit+'node ='+options.node;
    //     }
    //     queryDepartmentList+=queryLimit;
    // }
    //connection.query(queryDepartmentList,function (err, result) {
    //     if(err){
    //         console.log('[SELECT ERROR] - ',err.message);
    //         return;
    //     };
    //     //console.log(result);
    //     callback(options, result);
    // })
    if (options.queryParam != null){
        queryLimit=queryLimit+options.queryParam.paramName + " LIKE '%"+options.queryParam.paramValue+"%'";
        queryDepartmentList+=queryLimit;
    }
    queryDepartmentList = queryDepartmentList + ' LIMIT ' + (options.pageNow - 1)*options.pageSize + ',' + options.pageSize;
    connection.query(queryDepartmentList,function (err, result) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
        };
        callback(options, result);
    })
};
/**
 * 计算数量
 * @param options
 * @param callback
 */
exports.queryDepartmentCount = function (options, callback) {
    var queryLimit = ' WHERE ';
    var queryDepartmentCountSql = 'SELECT COUNT(id) as count FROM department';
    if (options.queryParam != null){
        queryLimit=queryLimit+options.queryParam.paramName + " LIKE '%"+options.queryParam.paramValue+"%'";
        queryDepartmentCountSql+=queryLimit;
    }
    connection.query(queryDepartmentCountSql,function (err, count) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
        };
        callback(count[0].count);
    })
};
/**
 * 添加部门信息
 * @param options
 * @param callback
 */
exports.addDepartmentInfo = function (options, callback) {
    var addDepartmentInfoSql= 'INSERT INTO department(node,name,sort) VALUES (?,?,?)';
    var addParams = [options.node,options.name,options.sort];
    //console.log(addDepartmentInfoSql);
    connection.query(addDepartmentInfoSql,addParams, function (err, result) {
        if(err){
            console.log('[INSERT ERROR] - ',err.message);
            return;
        }
        callback(null, result);
    });
};
/**
 * 修改部门信息
 * @param options
 * @param callback
 */
exports.updateDepartmentInfo = function (options, callback) {
    var updateDepartmentInfoSql= 'UPDATE department SET node=?,name = ?,sort = ? WHERE id = ?';
    var updateParams = [options.node,options.name,options.sort,options.id];
    //console.log(updateDepartmentInfoSql);
    connection.query(updateDepartmentInfoSql,updateParams, function (err, result) {
        if(err){
            console.log('[UPDATE ERROR] - ',err.message);
            return;
        }
        callback(null, result);
    });
};
/**
 * 删除部门信息
 * @param id
 * @param callback
 */
exports.deleteDepartmentInfo = function (id, callback) {
    var deleteDepartmentInfoSql= 'DELETE  FROM department WHERE id = ?';
    var deleteParams = [id];
    console.log(deleteParams);
    //console.log(updateDepartmentInfoSql);
    connection.query(deleteDepartmentInfoSql,deleteParams, function (err, result) {
        if(err){
            console.log('[DELETE ERROR] - ',err.message);
            return;
        }
        callback(null, result);
    });
};