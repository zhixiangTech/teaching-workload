/**
 * 公式管理路由层
 * 创建人：丁涛
 * 创建时间：2017/7/30
 */

var express = require('express');
var router = express.Router();
var formulaService =require('../service/formulaService');
var pageUtil = require('../utils/pageUtil');
var pageLib = require('../../lib/pageLib');
var urlUtil = require('../utils/urlUtil');

router.get('/', function(req, res, next) {
    var pageNow = req.query.pageNow || 1;
    var formulaOptions = {
        pageNow:pageNow,
        pageSize:pageLib.pageSize,
        queryParam: null
    };
    if (!req.xhr){
        var param = req.query.paramName || null;
        if (param != null){
            var paramArray = param.split('-');
            formulaOptions.queryParam = {paramName:paramArray[0],paramValue:paramArray[1]};
        }
        formulaService.queryFormulaList(formulaOptions,function (err,data,count) {
            res.render('formula',{formulaList:data,pageHtml:pageUtil.pageHtml(pageNow,count,'/admin/formula',formulaOptions.queryParam)});
        });
    } else {
        var paramName = req.query.paramName;
        var paramValue = req.query.paramValue;
        res.json({paramName:paramName,paramValue:paramValue});
    }
});

/*
 * 添加信息路由管理
 * */
router.post('/addFormulaInfo',function (req,res,next) {
    var id = req.body.id;
    var formula = req.body.formula;
    var formulaType = req.body.formulaType;
    var description = req.body.description;
    var K = req.body.K;
    var K1 = req.body.K1;
    var K2 = req.body.K2;
    var M = req.body.M;
    var M1 = req.body.M1;
    var M2 = req.body.M2;
    var N = req.body.N;
    var limt =req.body.limt;
    var formula ={
        id:id,
        formula:formula,
        formulaType:formulaType,
        description:description,
        K:K,
        K1:K1,
        K2:K2,
        M:M,
        M1:M1,
        M2:M2,
        N:N,
        limt:limt
    };
    console.log(formula.id+"........000")
    formulaService.addFormulaInfo(formula,function (err,data) {
        res.send('success');
    });
});

/*
 * 编辑信息路由管理
 * */
router.get('/queryFormulaInfo',function (req,res,next){
    formulaService.queryFormulaInfoById(req.query.id,function (err,data) {
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
router.post('/deleteFormulaInfo',function (req,res,next) {
    var id = req.query.id;
    formulaService.deleteFormulaInfo(id,function (err,data) {
        if (data == null){
            res.send("error");
        } else {
            res.send("success");
        }
    });
});


module.exports = router;