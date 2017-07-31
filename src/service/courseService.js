/*
* 课程管理服务层
* 创建人：丁涛
* 创建时间：2017年7月26日
* */
var courseDao = require('../dao/courseDao');
var async = require('async');


exports.queryCourseList = function (options, callback) {
    async.waterfall([
        function (cb) {
            courseDao.queryCourseCount(options, function (count) {
                cb(null,count);
            });
        },
        function (count) {
            courseDao.queryCourseList(options, function (err, courseList) {
                callback(options, courseList, count);
            });
        }
    ])
};

/*
* 添加课程信息
* */
exports.addCourseInfo = function (options,callback) {
    console.log(options.id+"+++++++++++++++++++++++++++++++++++++++++");
    if(options.id!=""){
        courseDao.editCourseInfo(options,function (err,result) {
            callback(options,result);
        });
    }else {
        courseDao.addCourseInfo(options,function (err,result) {
            callback(options,result);
        });
    }
};

/*
* 查询课程数
* */
exports.queryCourseCount = function (callback) {
    courseDao.addCourseInfo(function (count) {
        callback(count);
    });
};

/*
* 通过课程名称查询课程信息
* */
exports.queryCourseInfoById = function (options,callback) {
    courseDao.queryCourseInfoById(options,function (err,result) {
        if(options == []){
            callback(options,null);
        }else {
            callback(options,result);
        }
    });
}



/*
* 删除信息
* */
exports.deleteCourseInfo = function (options,callback) {
    courseDao.deleteCourseInfo(options,function(err,result){
        callback(options,result);
    });
}
