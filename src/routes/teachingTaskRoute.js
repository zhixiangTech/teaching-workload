/**
 * 教学管理路由层
 * 创建人：高锋
 * 创建时间：2017-7-30
 */
//express组件及路由引入
var express = require('express');
var router = express.Router();
//service层引入
var teachingTaskService = require('../service/teachingTaskService');
var pageUtil = require('../utils/pageUtil');
var pageLib = require('../../lib/pageLib');
var urlUtil = require('../utils/urlUtil');
var tearchingEditJson = {
    state: '',
    msg: ''
};
/* GET home page. */
router.get('/', function(req, res, next) {
    var pageNow = req.query.pageNow || 1;
    var teachingTaskOptions = {
        pageNow:pageNow,
        pageSize:pageLib.pageSize,
        queryParam: null
    };
    if (!req.xhr){
        var param = req.query.paramName || null;
        if(param !=null){
            var paramArray = param.split('-');
            teachingTaskOptions.queryParam = {paramName:paramArray[0],paramValue:paramArray[1]};
        }
        teachingTaskService.queryTeachingTaskList(teachingTaskOptions,function (err, data, count) {
            res.render('teachingTask',{teachingTaskList:data,pageHtml:pageUtil.pageHtml(pageNow,count,'/admin/teachingTask',teachingTaskOptions.queryParam)});
        });
    } else {
        var paramName = req.query.paramName;
        var paramValue = req.query.paramValue;
        res.json({paramName:paramName,paramValue:paramValue});
    }
});
/**
 * 保存教学信息
 */
router.post('/saveTeachingTackInfo', function(req, res, next) {
    var id = req.body.id;
    var courseNode = req.body.courseNode;
    var tid = req.body.tid;
    var year = req.body.year;
    var term = req.body.term;
    var classNode = req.body.classNode;
    var classSize = req.body.classSize;
    var courseNumber = req.body.courseNumber;
    var planHours = req.body.planHours;
    var courseHours = req.body.courseHours;
    var experienceHours = req.body.experienceHours;
    var M = req.body.M;
    var examMethod = req.body.examMethod;
    var state = req.body.state;

    var teachingInfo ={
        id:id,
        courseNode:courseNode,
        tid:tid,
        year:year,
        term:term,
        classNode:classNode,
        classSize:classSize,
        courseNumber:courseNumber,
        planHours:planHours,
        courseHours:courseHours,
        experienceHours:experienceHours,
        M:M,
        examMethod:examMethod,
        state:state
    };
    teachingTaskService.saveTeachingTaskInfo(teachingInfo,function (err, data) {
        if (data == null){
            tearchingEditJson.state = 'error';
            tearchingEditJson.msg = '保存失败';
            res.json(tearchingEditJson);
        }else {
            tearchingEditJson.state = 'success';
            tearchingEditJson.msg = '保存成功';
            res.json(tearchingEditJson);
        }
    });
});
/**
 * 教学信息查询
 */
router.get('/queryTeachingInfoById', function(req, res, next) {
    teachingTaskService.queryTeachingInfoById(req.query.id,function (err, data) {
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
router.get('/deleteTeachingInfo',function (req, res, next) {
    teachingTaskService.deleteTeachingInfo(req.query.id,function (err, data) {
        if (data == null){
            res.send("error");
        } else {
            res.send("success");
        }
    })
});
router.get('/deleteTeachingInfoBatch',function (req, res, next) {
    var diarr = req.query.id.split(",");
    for (var i=0;i<diarr.length;i++){
        teachingTaskService.deleteTeachingInfo(diarr[i],function (err, data) {
            if (data == null){
                tearchingEditJson.state = 'error';
                tearchingEditJson.msg = '删除失败';
            } else {
                tearchingEditJson.state = 'success';
                tearchingEditJson.msg = '删除成功';
            }
        })
    }
    res.json(tearchingEditJson);
});
module.exports = router;
