//express组件及路由引入
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render("index",{testData:'testData'});
});

router.get('/toLogin', function(req, res, next) {
    res.redirect("login");
});

router.get('/login', function(req, res, next) {
    res.render("login",{testData:'testLoginData'});
});

module.exports = router;
