//引入mysql模块
var mysql = require('mysql');
var connection = mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password: 'root',
    database:'teching_workload'
});
connection.connect();
module.exports = connection;
