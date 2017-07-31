//引入mysql模块
var mysql = require('mysql');
var connection = mysql.createConnection({
    host:'192.168.1.186',
    user:'root',
    password: 'root',
    database:'teching_workload'
});
connection.connect();
module.exports = connection;
