/**
 * 教学管理服务层
 * 创建人：高锋
 * 创建时间：2017-7-30
 */
var teachingTaskDao = require('../dao/teachingTaskDao');
var async = require('async');
/**
 * 查询教学列表
 * @param options
 * @param callback
 */
exports.queryTeachingTaskList = function (options,callback) {
    async.waterfall([
        function (cb) {
            teachingTaskDao.queryTeachingTaskCount(options,function (count) {
                cb(null,count);
            })
        },
        function (count) {
            teachingTaskDao.queryTeachingTaskList(options,function (err, result) {
                callback(options,result,count);
            })
        }
    ]);
};
/**
 * 通过id查询教师信息
 * @param id
 * @param callback
 */
exports.queryTeachingInfoById = function (id, callback) {
    teachingTaskDao.queryTeachingInfoById(id, function (err, teacherInfo) {
        if(teacherInfo == []){
            callback(id, null);
        }else {
            callback(id, teacherInfo);
        }
    });
};
/**
 * 保存教师信息
 * @param options
 * @param callback
 */
exports.saveTeachingTaskInfo = function (options, callback) {
    if (options.id == ''){
        teachingTaskDao.addTeachingTaskInfo(options, function (err, result) {
            callback(options, result);
        })
    }else{
        teachingTaskDao.updateTeachingTaskInfo(options,function (err,result) {
            callback(options, result);
        })
    }

};
/**
 * 删除教师信息
 * @param id
 * @param callback
 */
exports.deleteTeachingInfo = function (id, callback) {
    teachingTaskDao.deleteTeachingInfo(id,function (err, result) {
        callback(id,result);
    })
};