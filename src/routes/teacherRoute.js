/**
 * 教师管理路由层
 * 创建人：高锋
 * 创建时间：2017-7-26
 */
//express组件及路由引入
var express = require('express');
var router = express.Router();
//service层引入
var teacherService = require('../service/teacherService');
var pageUtil = require('../utils/pageUtil');
var pageLib = require('../../lib/pageLib');
var urlUtil = require('../utils/urlUtil');
var tearcherEditJson = {
  state: '',
    msg: ''
};
/* GET home page. */
router.get('/', function(req, res, next) {
    var pageNow = req.query.pageNow || 1;
    var teacherOptions = {
        pageNow:pageNow,
        pageSize:pageLib.pageSize,
        queryParam: null
    };
    if (!req.xhr){
        var param = req.query.paramName || null;
        if(param !=null){
            var paramArray = param.split('-');
            teacherOptions.queryParam = {paramName:paramArray[0],paramValue:paramArray[1]};
        }
        teacherService.queryTeacherList(teacherOptions,function (err, data, count) {
            res.render('teacherList',{teacherList:data,pageHtml:pageUtil.pageHtml(pageNow,count,'/admin/teacherList',teacherOptions.queryParam)});
        });
    } else {
        var paramName = req.query.paramName;
        var paramValue = req.query.paramValue;
        res.json({paramName:paramName,paramValue:paramValue});
    }
});
/**
 * 保存教师信息
 */
router.post('/saveTeacherInfo', function(req, res, next) {
    var id = req.body.id;
    var node = req.body.node;
    var name = req.body.name;
    var department = req.body.department;
    var teachingInfo ={
        id:id,
        node:node,
        name:name,
        department:department
    };
    teacherService.saveTeacherInfo(teachingInfo,function (err, data) {
        if (data == null){
            tearcherEditJson.state = 'error';
            tearcherEditJson.msg = '保存失败';
            res.json(tearcherEditJson);
        }else {
            tearcherEditJson.state = 'success';
            tearcherEditJson.msg = '保存成功';
            res.json(tearcherEditJson);
        }
    });
});
/**
 * 教师信息查询
 */
router.get('/queryInfo', function(req, res, next) {
    teacherService.queryTeacherById(req.query.id,function (err, data) {
        if (data == null){
            res.send("error");
        } else {
            res.json(data);
        }
    });
});
/**
 * 删除教师信息
 */
router.get('/deleteInfo',function (req, res, next) {
   teacherService.deleteTeacherInfo(req.query.id,function (err, data) {
       if (data == null){
           res.send("error");
       } else {
           res.send("success");
       }
   })
});
router.get('/deleteInfoBatch',function (req, res, next) {
    var diarr = req.query.id.split(",");
   for (var i=0;i<diarr.length;i++){
        teacherService.deleteTeacherInfo(diarr[i],function (err, data) {
            if (data == null){
                tearcherEditJson.state = 'error';
                tearcherEditJson.msg = '删除失败';
            } else {
                tearcherEditJson.state = 'success';
                tearcherEditJson.msg = '删除成功';
            }
        })
    }
    res.json(tearcherEditJson);
});
module.exports = router;
