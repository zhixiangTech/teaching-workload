//express组件及路由引入
var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {
    res.redirect('/admin');
});

router.get('/logout', function(req, res, next) {
    delete req.session.admin;
    res.redirect("login");
});

module.exports = router;
