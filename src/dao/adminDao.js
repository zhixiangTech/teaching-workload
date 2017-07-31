/**
 * 管理员用户数据持久化操作接口层
 * 创建人：
 */
var connection = require('../core/Connection');
var adminModel = require('../model/adminModel');

/**
 * 通过ID查询管理员信息
 * @param id
 * @param callback
 */
exports.queryAdminById = function (id, callback) {
    var queryAdminById = 'SELECT '+ adminModel +' FROM admin WHERE id = ?';
    var queryParams = [id];
    connection.query(queryAdminById,queryParams,function(err, result){
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
        }
        callback(id, result[0]);
    });
};
/**
 * 通过用户名查询管理员信息
 * @param username
 * @param callback
 */
exports.queryAdminByUsername = function (username, callback) {
    var queryAdminById = 'SELECT '+ adminModel +' FROM admin WHERE username = ?';
    var queryParams = [username];
    connection.query(queryAdminById,queryParams,function(err, result){
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
        }
        callback(username, result[0]);
    });
};
/**
 * 查询管理员列表
 * @param options
 * @param callback
 */
exports.queryAdminList = function (options, callback) {
    var queryAdminList = 'SELECT '+ adminModel +' FROM admin';
    connection.query(queryAdminList,function (err, result) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
        };
        callback(options, result);
    })
};

/**
 * 保存管理员信息
 * @param options
 * @param callback
 */
exports.saveAdminInfo = function (options, callback) {
    var saveAdminInfo = 'INSERT INTO admin(username,password,permission_node,description) VALUES (?,?,?,?)';
    var saveParams = [options.username,options.password,options.permission_node,options.description];
    connection.query(saveAdminInfo,saveParams, function (err, result) {
        if(err){
            console.log('[INSERT ERROR] - ',err.message);
            return;
        }
        callback(null, result);
    });
};
