/**
 * 教师管理服务层
 * 创建人：高锋
 * 创建时间：2017-7-26
 */
var teacherDao = require('../dao/teacherDao');
var async = require('async');
/**
 * 查询教师列表
 * @param options
 * @param callback
 */
exports.queryTeacherList = function (options, callback) {
    async.waterfall([
        function (cb) {
            teacherDao.queryTeacherCount(options,function (count) {
                cb(null,count);
            })
        },
        function (count) {
            teacherDao.queryTeacherList(options,function (err, teacherList) {
                callback(options, teacherList,count);
            })
        }
    ]);
};
/**
 * 通过id查询教师信息
 * @param id
 * @param callback
 */
exports.queryTeacherById = function (id, callback) {
    teacherDao.queryTeacherById(id, function (err, teacherInfo) {
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
exports.saveTeacherInfo = function (options, callback) {
    if (options.id == ''){
        teacherDao.addTeacherInfo(options, function (err, result) {
           callback(options, result);
        })
    }else{
        teacherDao.updateTeacherInfo(options,function (err,result) {
            callback(options, result);
        })
    }

};
/**
 * 删除教师信息
 * @param id
 * @param callback
 */
exports.deleteTeacherInfo = function (id, callback) {
    teacherDao.deleteTeacherInfo(id,function (err, result) {
        callback(id,result);
    })
};