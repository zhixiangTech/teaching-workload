/**
 * 教学管理数据持久化操作接口
 * 创建人：高锋
 * 创建时间：2017-7-30
 */
var connection = require('../core/Connection');
var teachingTaskModel = require('../model/teachingTaskModel');
/**
 * 查询教学管理列表
 * @param options
 * @param callback
 */
exports.queryTeachingTaskList = function (options,callback) {
    var queryLimit = ' WHERE ';
    var queryTeachingTaskList = 'SELECT '+ teachingTaskModel+' FROM teaching_task';
    if (options.queryParam != null){
        queryLimit = queryLimit+options.queryParam.paramName + " LIKE '%"+options.queryParam.paramValue+"%'";
        queryTeachingTaskList+=queryLimit;
    }
    queryTeachingTaskList = queryTeachingTaskList + ' LIMIT ' + (options.pageNow - 1)*options.pageSize + ',' + options.pageSize;
    connection.query(queryTeachingTaskList,function(err, result){
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
        }
        callback(options,result);
    });
};
/**
 * 查询教学总数
 * @param options
 * @param callback
 */
exports.queryTeachingTaskCount = function (options, callback) {
    var queryLimit = ' WHERE ';
    var queryTeachingTaskCountSql = 'SELECT COUNT(id) as count FROM teaching_task';
    if (options.queryParam != null){
        queryLimit=queryLimit+options.queryParam.paramName + " LIKE '%"+options.queryParam.paramValue+"%'";
        queryTeachingTaskCountSql+=queryLimit;
    }
    connection.query(queryTeachingTaskCountSql,function (err, count) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
        };
        callback(count[0].count);
    })
};
/**
 * 通过id查询教学信息
 * @param id
 * @param callback
 */
exports.queryTeachingInfoById = function (id, callback) {
    var queryTeachingInfoByIdSql = 'SELECT '+ teachingTaskModel +' FROM teaching_task WHERE id = ?';
    var queryParams = [id];
    connection.query(queryTeachingInfoByIdSql,queryParams,function(err, result){
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
        }
        callback(id, result[0]);
    });
};
/**
 * 保存教学信息
 * @param options
 * @param callback
 */
exports.addTeachingTaskInfo = function (options,callback) {
    var addTeachingTaskInfoSql = 'INSERT INTO teaching_task(tid,year,term,course_node,class_node,class_size,course_number,plan_hours,course_hours,experience_hours,M,exam_method,state) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)';
    var addParams = [options.tid,options.year,options.term,options.courseNode,options.classNode,options.classSize,options.courseNumber,options.planHours,options.courseHours,options.experienceHours,options.M,options.examMethod,options.state];
    connection.query(addTeachingTaskInfoSql,addParams,function (err, result) {
        if(err){
            console.log('[INSERT ERROR] - ',err.message);
            return;
        }
        callback(null, result);
    })
};
/**
 * 修改教学信息
 * @param options
 * @param callback
 */
exports.updateTeachingTaskInfo = function (options,callback) {
    var updateTeachingInfoSql = 'UPDATE teaching_task SET tid=?,year=?,term=?,course_node=?,class_node=?,class_size=?,course_number=?,plan_hours=?,course_hours=?,experience_hours=?,M=?,exam_method=?,state=? WHERE id = ?';
    var updateParams = [options.tid,options.year,options.term,options.courseNode,options.classNode,options.classSize,options.courseNumber,options.planHours,options.courseHours,options.experienceHours,options.M,options.examMethod,options.state,options.id];
    connection.query(updateTeachingInfoSql,updateParams,function (err, result) {
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
exports.deleteTeachingInfo = function (id, callback) {
    var deleteTeachingInfoSql = 'DELETE FROM teaching_task WHERE id=?';
    var deleteParams = [id];
    connection.query(deleteTeachingInfoSql,deleteParams,function (err, result) {
        if(err){
            console.log('[DELETE ERROR] - ',err.message);
            return;
        }
        callback(null, result);
    })
};