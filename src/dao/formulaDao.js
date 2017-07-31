/**
 * 公式管理信息数据持久化操作接口层
 * 创建人：丁涛
 * 创建时间：2017/7/30
 */
var connection = require('../core/Connection');
var formulaModel = require('../model/formulaModel');

exports.queryFormulaList = function (options, callback) {
    var queryLimit = ' WHERE ';
    var queryFormulaList = 'SELECT '+ formulaModel +' FROM formula';
    if (options.queryParam != null){
        queryLimit=queryLimit+options.queryParam.paramName + " LIKE '%"+options.queryParam.paramValue+"%'";
        queryFormulaList+=queryLimit;
    }
    queryFormulaList = queryFormulaList + ' LIMIT ' + (options.pageNow - 1)*options.pageSize + ',' + options.pageSize;
    connection.query(queryFormulaList,function (err, result) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
        };
        callback(options, result);
    })
};

/*
 * 模糊查询
 * */
exports.queryFormulaCount = function (options, callback) {
    var queryLimit = ' WHERE ';
    var queryFormulaCountSql = 'SELECT COUNT(id) as count FROM formula';
    if (options.queryParam != null){
        queryLimit=queryLimit+options.queryParam.paramName + " LIKE '%"+options.queryParam.paramValue+"%'";
        queryFormulaCountSql+=queryLimit;
    }
    connection.query(queryFormulaCountSql,function (err, count) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
        };
        callback(count[0].count);
    })
};

exports.queryFormulaInfoById = function (options,callback) {
    var queryFormulaInfoSQL = "SELECT "+formulaModel+" FROM formula WHERE id ="+ options;
    connection.query(queryFormulaInfoSQL,function(err,result){
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
        };
        callback(options,result[0]);
    });
};

/*
* 添加信息
* */
exports.addFormulaInfo = function (options,callback) {
    var addFormulaInfoSQL = 'INSERT INTO formula (description,K,K1,K2,M,M1,M2,N,limt,formula,formula_type) VALUES (?,?,?,?,?,?,?,?,?,?,?)';
    var addParams = [options.description,options.K,options.K1,options.K2,options.M,options.M1,options.M2,options.N,options.limt,options.formula,options.formulaType];
    connection.query(addFormulaInfoSQL,addParams,function (err, result) {
        if(err){
            console.log('[INSERT ERROR] - ',err.message);
            return;
        };
        callback(options, result);
    });
};

/*
* 删除信息
* */
exports.deleteFormulaInfo = function (options,callback) {
    var deleteFormulaInfoSQL = 'DELETE FROM formula ';
    var deleteParams = 'WHERE id = '+ options;
    deleteFormulaInfoSQL+=deleteParams;
    connection.query(deleteFormulaInfoSQL,function (err,result) {
        if(err){
            console.log('[DELETE ERROR] - ',err.message);
            return;
        };
        callback(options,result);
    });
};


exports.editFormulaInfo = function (options,callback) {
    var editFormulaInfoSQL = "UPDATE formula SET description=?,K=?,K1=?,K2=?,M=?,M1=?,M2=?,N=?,limt=?,formula=?,formula_type=? WHERE id=?";
    var editParams =[options.description,options.K,options.K1,options.K2,options.M,options.M1,options.M2,options.N,options.limt,options.formula,options.formulaType,options.id]
    connection.query(editFormulaInfoSQL,editParams,function (err, result) {
        if(err){
            console.log('[UPDATE ERROR] - ',err.message);
            return;
        };
        callback(options, result);
    });
}