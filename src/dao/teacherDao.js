/**
 * 教师管理数据持久化操作接口
 * 创建人：高锋
 * 创建时间：2017-7-26
 */
var connection = require('../core/Connection');
var teacherModel = require('../model/teacherModel');
/**
 * 查询教师列表
 * @param options
 * @param callback
 */
exports.queryTeacherList = function (options,callback) {
    var queryLimit = ' WHERE ';
    var queryTeacherList = 'SELECT '+ teacherModel+',state FROM teacher left join teaching_year_workload on id=tid';
    if (options.queryParam != null){
        queryLimit = queryLimit+options.queryParam.paramName + " LIKE '%"+options.queryParam.paramValue+"%'";
        queryTeacherList+=queryLimit;
    }
    queryTeacherList = queryTeacherList + ' LIMIT ' + (options.pageNow - 1)*options.pageSize + ',' + options.pageSize;
    connection.query(queryTeacherList,function(err, result){
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
        }
        callback(options,result);
    });
};
/**
 * 查询教师总数
 * @param options
 * @param callback
 */
exports.queryTeacherCount = function (options, callback) {
    var queryLimit = ' WHERE ';
    var queryTeacherCountSql = 'SELECT COUNT(id) as count FROM teacher';
    if (options.queryParam != null){
        queryLimit=queryLimit+options.queryParam.paramName + " LIKE '%"+options.queryParam.paramValue+"%'";
        queryTeacherCountSql+=queryLimit;
    }
    connection.query(queryTeacherCountSql,function (err, count) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
        };
        callback(count[0].count);
    })
};
/**
 * 通过id查询教师信息
 * @param id
 * @param callback
 */
exports.queryTeacherById = function (id, callback) {
    var queryTeacherByIdSql = 'SELECT '+ teacherModel +' FROM teacher WHERE id = ?';
    var queryParams = [id];
    connection.query(queryTeacherByIdSql,queryParams,function(err, result){
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
        }
        callback(id, result[0]);
    });
};
/**
 * 保存教师信息
 * @param options
 * @param callback
 */
exports.addTeacherInfo = function (options,callback) {
    var addTeacherInfoSql = 'INSERT INTO teacher(node,name,department) VALUES(?,?,?)';
    var addParams = [options.node,options.name,options.department];

    connection.query(addTeacherInfoSql,addParams,function (err, result) {
        if(err){
            console.log('[INSERT ERROR] - ',err.message);
            return;
        }
        callback(null, result);
    })
};
/**
 * 修改教师信息
 * @param options
 * @param callback
 */
exports.updateTeacherInfo = function (options,callback) {
    var updateTeacherInfoSql = 'UPDATE teacher SET node = ?,name = ?,department = ? WHERE id = ?';
    var updateParams = [options.node,options.name,options.department,options.id];
    connection.query(updateTeacherInfoSql,updateParams,function (err, result) {
        if(err){
            console.log('[UPDATE ERROR] - ',err.message);
            return;
        }
        callback(null, result);
    })
};
/**
 * 删除教师信息
 * @param id
 * @param callback
 */
exports.deleteTeacherInfo = function (id, callback) {
    var deleteTeacherInfoSql = 'DELETE FROM teacher WHERE id=?';
    var deleteParams = [id];
    connection.query(deleteTeacherInfoSql,deleteParams,function (err, result) {
        if(err){
            console.log('[DELETE ERROR] - ',err.message);
            return;
        }
        callback(null, result);
    })
};