

var adminDao = require('../dao/adminDao');

/**
 * 通过ID查询管理员信息
 * @param id
 * @param callback
 */
exports.queryAdminById = function (id, callback) {
    adminDao.queryAdminById(id, function (err, adminInfo) {
        callback(id, adminInfo);
    });
};
/**
 * 通过用户名查询管理员信息
 * @param username
 * @param callback
 */
exports.queryAdminByUsername = function (username, callback) {
   adminDao.queryAdminByUsername(username, function (err, adminInfo) {
       if (adminInfo == []){
           callback(username, null);
       } else {
           callback(username, adminInfo);
       }
   });
};
/**
 * 查询管理员列表
 * @param options
 * @param callback
 */
exports.queryAdminList = function (options, callback) {
    adminDao.queryAdminList(options, function (err, adminList) {
        callback(null, adminList);
    });
};

/**
 * 保存管理员信息
 * @param options
 * @param callback
 */
exports.saveAdminInfo = function (options, callback) {
    adminDao.saveAdminInfo(options, function (err, result) {
        callback(null, result);
    });
};