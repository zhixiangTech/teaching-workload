/**
 * 部门管理服务层
 * 创建人：华梦青
 * 创建时间：2017/7/26
 */
var departmentDao= require('../dao/departmentDao');

var async = require('async');
/**
 * 通过ID查询部门信息
 * @param id
 * @param callback
 */
exports.queryDepartmentById = function (id, callback) {
    departmentDao.queryDepartmentById(id, function (err, departmentInfo) {
        //console.log(departmentInfo);
        if(departmentInfo==[]){
            callback(id, null);
        }else{
            callback(id, departmentInfo);
        }

    });
};
/**
 * 查询部门列表
 * @param options
 * @param callback
 */
exports.queryDepartmentList = function (options, callback) {
    // departmentDao.queryDepartmentList(options, function (err, departmentList) {
    //     callback(null, departmentList);
    // });
    async.waterfall([
        function (cb) {
            departmentDao.queryDepartmentCount(options, function (count) {
                cb(null,count);
            });
        },
        function (count) {
            departmentDao.queryDepartmentList(options, function (err, departmentList) {
                callback(options, departmentList, count);
            });
        }
    ])
};
/**
 * 保存部门信息
 * @param options
 * @param callback
 */
exports.saveDepartmentInfo = function (options, callback) {
   // console.log(options);
   //  console.log(options.id);
    if(options.id == ''){
        //添加部门信息
        departmentDao.addDepartmentInfo(options, function (err, result) {
            callback(null, result);
        });
    }else{
        //修改部门信息
        departmentDao.updateDepartmentInfo(options, function (err, result) {
            callback(null, result);
        });
    }
};
/**
 * 计算数量
 * @param callback
 */
exports.queryDepartmentCount = function (callback) {
    departmentDao.addDepartmentInfo(function (count) {
        callback(count);
    });
};
/**
 * 删除部门信息
 * @param options
 * @param callback
 */
exports.deleteDepartmentInfo = function (options, callback) {
    console.log(options+"+++++");
    departmentDao.deleteDepartmentInfo(options, function (err, result) {
        callback(null, result);
    });
};