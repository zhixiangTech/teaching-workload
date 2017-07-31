//Nodejs核心引入
var path = require('path');
var fs = require('fs');

//Express
var express = require('express');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//session
var cookieSession = require("cookie-session");

//路由引入
var loginRoute = require('./src/routes/loginRoute');
var indexRedirect = require('./src/routes/indexRedirect');
var adminRoute = require('./src/routes/adminRoute');
var teacherRoute = require('./src/routes/teacherRoute');
var courseList = require('./src/routes/courseRoute');
var departmentRoute=require('./src/routes/departmentRoute');
var formulaRoute = require('./src/routes/formulaRoute');
var departmentRoute = require('./src/routes/departmentRoute');
var teachingTaskRoute = require('./src/routes/teachingTaskRoute');
var dictRoute=require('./src/routes/dictRoute');


//初始化
var app = express();

//视图模板引擎-handerbars
var tag = require('./src/core/tag');
var handlebars = require("express3-handlebars").create({
    defaultLayout: "main",
    extname: ".html",
    helpers:tag
});

// view engine setup---开发项目适合很多我们要保护的项目的技术特征
app.disable("x-powered-by");

//模板路径
app.set('views', path.join(__dirname, 'views'));
app.engine("html",handlebars.engine);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
//组件注册--解析和获取参数的
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//cookie注册
app.use(cookieParser());
app.use(cookieSession({
    name: 'teching-workload',
    secret: '1234567890ABCEDFJHIJKLQWERTYZ',//jsessionId
    resave: true,
    saveUninitialized:true,
    cookie: {maxAge: 1000*60*60*24*30}
}));

//静态资源路径
app.use(express.static(path.join(__dirname, 'public')));

//登录拦截
app.use(function(req,res,next){
    var json = req.session.admin;
    var url = req.url;
    if(url.indexOf("admin")!=-1){//是需要拦截的,如果你URL地址包含admin这个关键词
        if(!json){//如果没有登录
            if(req.xhr){
                res.send("logout");
            }  else{
                res.redirect("/login");
            }
        }
    }
    res.locals.admin = json;
    next();
});

//路由注册
app.use('/', indexRedirect);
app.use('/login', loginRoute);
app.use('/admin', adminRoute);
app.use('/admin/teacherList', teacherRoute);
app.use('/admin/course', courseList);
app.use('/admin/department', departmentRoute);
app.use('/admin/formula', formulaRoute);
app.use('/admin/teachingTask', teachingTaskRoute);
app.use('/admin/dict',dictRoute);


//404异常处理
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//服务器500错误
app.use(function(req, res, next) {
    var err = new Error('服务器错误');
    err.status = 500;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
