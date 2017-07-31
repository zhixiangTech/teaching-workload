//express组件及路由引入
var express = require('express');
var router = express.Router();
//工具类引入
var encryptionUtil = require('../utils/encryptionUtil');
//service层引入
var adminService = require('../service/adminService');

var loginJson = {
  state: '',
    msg: ''
};

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login');
});

router.post('/', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var rememberMe = req.body.rememberMe;
    var encryptionPwd = encryptionUtil.MD5(password);
    console.log(username+"====="+password+"====="+encryptionPwd+"====="+rememberMe);
    adminService.queryAdminByUsername(username, function (err, data) {
        if (data == null){
            loginJson.state = 'error';
            loginJson.msg = '账号不存在，请检查后重新输入';
            res.json(loginJson);
        } else {
            if (data.password == encryptionPwd){
                loginJson.state = 'success';
                loginJson.msg = '登录成功';
                req.session.admin = data;
                res.json(loginJson);
            } else {
                loginJson.state = 'error';
                loginJson.msg = '账号密码错误，请检查后重新输入';
                res.json(loginJson);
            }
        }
    });
});

module.exports = router;
