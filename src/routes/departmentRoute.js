/**
 * 部门管理的路由层
 * 创建人：华梦青
 * 创建时间：2017/7/26
 */
//express组件及路由引入
var express = require('express');
var router = express.Router();
//service层引入
var departmentService = require('../service/departmentService');
//
var pageUtil = require('../utils/pageUtil');
var pageLib = require('../../lib/pageLib');
var urlUtil = require('../utils/urlUtil')
var loginJson = {
    state: '',
    msg: ''
};
/**
 *跳转到当前页面
 */
router.get('/', function(req, res, next) {
    // var departmentOptions=null;
    // departmentService.queryDepartmentList(departmentOptions, function (err, data) {
    //     res.render('department',{departmentList:data});
    // });
    var pageNow = req.query.pageNow || 1;
    var departmentOptions = {
        pageNow:pageNow,
        pageSize:pageLib.pageSize,
        queryParam: null
    };
    if (!req.xhr){
        var param = req.query.paramName || null;
        if (param != null){
            var paramArray = param.split('-');
            departmentOptions.queryParam = {paramName:paramArray[0],paramValue:paramArray[1]};
        }
        departmentService.queryDepartmentList(departmentOptions,function (err,data,count) {
            res.render('department',{departmentList:data,pageHtml:pageUtil.pageHtml(pageNow,count,'/admin/department',departmentOptions.queryParam)});
        });
    } else {
        var paramName = req.query.paramName;
        var paramValue = req.query.paramValue;
        res.json({paramName:paramName,paramValue:paramValue});
    }

});
/**
 * 通过ID查询部门信息
 */
router.get('/queryInfo', function(req, res, next) {
    departmentService.queryDepartmentById(req.query.id, function (err, data) {
        //console.log(data);
        if(data==null){
            res.send("success");
        }else{
            res.json(data);
            //console.log(data);
        }
    });
});
/**
 *保存部门列表
 */
router.post('/saveDepartment', function (req, res, next) {
    var id=req.body.id;
    var node = req.body.node;
    var name = req.body.name;
    var sort = req.body.sort;
    var departmentInfo={
        id:id,
        node:node,
        name:name,
        sort:sort
    };
    //console.log(departmentInfo);
    departmentService.saveDepartmentInfo(departmentInfo, function (err, result) {
        if (result==null){
            loginJson.state = 'success';
            loginJson.msg = '保存成功';
            res.json(loginJson);
        } else {

                loginJson.state = 'error';
                loginJson.msg = '保存失败';
                res.json(loginJson);
        }
    });
});
/**
 * 删除部门信息
 */
router.post('/deletedepartment', function(req, res, next) {
    console.log(req.query.id+'00000000');
    departmentService.deleteDepartmentInfo(req.query.id, function (err, data) {
        if(data==null){
            res.send("success");
        }else{
            res.send("error");
        }

    });

});
module.exports = router;