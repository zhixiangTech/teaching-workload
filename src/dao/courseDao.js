/**
 *  课程管理信息数据持久化操作接口层
 *  创建人：丁涛
 *  创建时间：2017年7月26日
 */
var connection = require('../core/Connection');
var courseModel = require('../model/courseModel');

/*
* 查询数据库course表
* */
exports.queryCourseList = function (options, callback) {
    var queryLimit = ' WHERE ';
    var queryCourseList = 'SELECT '+ courseModel +' FROM course';
    if (options.queryParam != null){
        queryLimit=queryLimit+options.queryParam.paramName + " LIKE '%"+options.queryParam.paramValue+"%'";
        queryCourseList+=queryLimit;
    }
    queryCourseList = queryCourseList + ' LIMIT ' + (options.pageNow - 1)*options.pageSize + ',' + options.pageSize;
    connection.query(queryCourseList,function (err, result) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
        };
        callback(options, result);
    })
};

/*
* 模糊查询
* */
exports.queryCourseCount = function (options, callback) {
    var queryLimit = ' WHERE ';
    var queryCourseCountSql = 'SELECT COUNT(id) as count FROM course';
    if (options.queryParam != null){
        queryLimit=queryLimit+options.queryParam.paramName + " LIKE '%"+options.queryParam.paramValue+"%'";
        queryCourseCountSql+=queryLimit;
    }
    connection.query(queryCourseCountSql,function (err, count) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
        };
        callback(count[0].count);
    })
};

/*
* 添加课程数据
* */
exports.addCourseInfo = function (options,callback) {
    var addCourseInfoSQL = 'INSERT INTO course (name,formula_type,course_node,major_node,course_type) VALUES (?,?,?,?,?)';
    var addParams = [options.name,options.formulaType,options.courseNode,options.majorNode,options.courseType];
    connection.query(addCourseInfoSQL,addParams,function (err, result) {
        if(err){
            console.log('[INSERT ERROR] - ',err.message);
            return;
        };
        callback(options, result);
    });
};

/*
* 编辑课程数据
* */
exports.editCourseInfo = function (options,callback) {
    var editCourseSQL = "UPDATE course SET course_node=?,name=?,formula_type=?,major_node=?,course_type=? WHERE id=?";
    var editParams = [options.courseNode,options.name,options.formulaType,options.majorNode,options.courseType,options.id];
    connection.query(editCourseSQL,editParams,function (err, result) {
        if(err){
            console.log('[UPDATE ERROR] - ',err.message);
            return;
        };
        callback(options, result);
    });
};

/*
* 通过Id查询课程信息
* */
exports.queryCourseInfoById = function (options,callback) {
    var queryCourseByIdSQL = "SELECT "+courseModel+" FROM course WHERE id ="+ options;
    connection.query(queryCourseByIdSQL,function(err,result){
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
        };
        callback(options,result[0]);
    });
};

/*
* 删除课程信息
* */
exports.deleteCourseInfo = function (options,callback) {
    var deleteCourseInfoSQL = 'DELETE FROM course ';
    var deleteParams = 'WHERE id = '+ options;
    deleteCourseInfoSQL+=deleteParams;
    connection.query(deleteCourseInfoSQL,function (err,result) {
        if(err){
            console.log('[DELETE ERROR] - ',err.message);
            return;
        };
        callback(options,result);
    });
};
