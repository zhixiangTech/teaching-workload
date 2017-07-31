/**
 * 文件说明
 * 创建人：华梦青
 * 创建时间：2017/7/30
 */
var express = require('express');
var router = express.Router();
//service层引入
var dictService = require('../service/dictService');
//分页的引入
var pageUtil = require('../utils/pageUtil');
var pageLib = require('../../lib/pageLib');
var urlUtil = require('../utils/urlUtil')
var loginJson = {
    state: '',
    msg: ''
};
router.get('/',function (req,res,next) {
    var pageNow = req.query.pageNow || 1;
    var dictOptions = {
        pageNow:pageNow,
        pageSize:pageLib.pageSize,
        queryParam: null
    };
    if (!req.xhr){
        var param = req.query.paramName || null;
        if (param != null){
            var paramArray = param.split('-');
            dictOptions.queryParam = {paramName:paramArray[0],paramValue:paramArray[1]};
        }
        dictService.queryDictList(dictOptions,function (err,data,count) {
            res.render('dict',{dictList:data,pageHtml:pageUtil.pageHtml(pageNow,count,'/admin/dict',dictOptions.queryParam)});
        });
    } else {
        var paramName = req.query.paramName;
        var paramValue = req.query.paramValue;
        res.json({paramName:paramName,paramValue:paramValue});
    }

});
/**
 * 通过ID查询字典数据
 */
router.get('/queryInfo', function(req, res, next) {
    dictService.queryDictById(req.query.id, function (err, data) {
        if(data==null){
            res.send("success");
        }else{
            res.json(data);
        }
    });
});
/**
 *保存字典数据
 */
router.post('/saveDict', function (req, res, next) {
    var id=req.body.id;
    var value = req.body.value;
    var label = req.body.label;
    var type=req.body.type;
    var description = req.body.description;
    var sort=req.body.sort;
    var dictInfo={
        id:id,
        value:value,
        label:label,
        type:type,
        description:description,
        sort:sort
    };
    dictService.saveDictInfo(dictInfo, function (err, result) {
        console.log("================");
        console.log(result);
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
 * 删除字典数据
 */
router.post('/deletedict', function(req, res, next) {
    dictService.deleteDictInfo(req.query.id, function (err, data) {
        if(data==null){
            res.send("success");
        }else{
            res.send("error");
        }

    });

});

module.exports = router;