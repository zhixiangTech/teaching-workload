/*
* 课程管理路由层
* 创建人：丁涛
* 创建时间：2017年7月26日
* */

var express = require('express');
var router = express.Router();
var courseService =require('../service/courseService');
var pageUtil = require('../utils/pageUtil');
var pageLib = require('../../lib/pageLib');
var urlUtil = require('../utils/urlUtil');
/*
* 课程管理页
* */
router.get('/', function(req, res, next) {
    var pageNow = req.query.pageNow || 1;
    var courseOptions = {
        pageNow:pageNow,
        pageSize:pageLib.pageSize,
        queryParam: null
    };
    if (!req.xhr){
        var param = req.query.paramName || null;
        if (param != null){
            var paramArray = param.split('-');
            courseOptions.queryParam = {paramName:paramArray[0],paramValue:paramArray[1]};
        }
        courseService.queryCourseList(courseOptions,function (err,data,count) {
            res.render('course',{courseList:data,pageHtml:pageUtil.pageHtml(pageNow,count,'/admin/course',courseOptions.queryParam)});
        });
    } else {
        var paramName = req.query.paramName;
        var paramValue = req.query.paramValue;
        res.json({paramName:paramName,paramValue:paramValue});
    }
});

/*
* 添加课程信息路由管理
* */
router.post('/addCourseInfo',function (req,res,next) {
    var name = req.body.name;
    var formulaType = req.body.formulaType;
    var courseNode = req.body.courseNode;
    var majorNode = req.body.majorNode;
    var courseType = req.body.courseType;
    var id = req.body.id;
    var course ={
        id:id,
        name:name,
        formulaType:formulaType,
        courseNode:courseNode,
        majorNode:majorNode,
        courseType:courseType
    };
    courseService.addCourseInfo(course,function (err,data) {
       res.send('success');
    });
});

/*
* 编辑课程信息路由管理
* */
router.get('/editCourseInfo',function (req,res,next){
    courseService.queryCourseInfoById(req.query.id,function (err,data) {
        if (data == null) {
            res.send('err');
        }
        else {
            res.send(data);
        }
    });
});

/*
* 删除信息路由管理
* */
router.post('/deleteCourseInfo',function (req,res,next) {
    var id = req.query.id;
    courseService.deleteCourseInfo(id,function (err,data) {
        if (data == null){
            res.send("error");
        } else {
            res.send("success");
        }
    });
});

module.exports = router;