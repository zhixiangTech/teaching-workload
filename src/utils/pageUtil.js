/**
 * 分页工具类
 * 创建人：刘佳乐
 * 创建时间：2017-7-27
 */

var pageLib = require('../../lib/pageLib');

exports.pageHtml = function (pageNow,count,url,queryParam) {

    console.log(queryParam);
    var param = '';
    if (queryParam != null){
        param = '&paramName='+queryParam.paramName+'-'+queryParam.paramValue;
        console.log(param);
    }

   var pageHtml = "<ul class='am-pagination tpl-pagination'>";
    if (pageNow == 1){
        pageHtml = pageHtml + "<li class='am-disabled'><a href='" + url + "?pageNow=1"+param+"'>«&nbsp;首页</a></li>"
    } else {
        pageHtml = pageHtml + "<li><a href='" + url + "?pageNow=1"+param+"'>«&nbsp;首页</a></li>"
    }
    var pageNum = Math.ceil(count/pageLib.pageSize);
    if (pageNum<pageLib.pageShow){
        for (var i = 1;i<=pageNum;i++){
            if (i == pageNow){
                pageHtml=pageHtml + "<li class='am-active'><a href='" + url + "?pageNow=" + i + param +"'>"+i+"</a></li>";
            } else {
                pageHtml=pageHtml + "<li><a href='" + url + "?pageNow=" + i + param + "'>"+i+"</a></li>";
            }
        }
    } else if(pageNum<pageLib.pageShow && pageNow < 3) {
        for (var j = 0;j<=pageNum;j++){
            if (j == pageNow){
                pageHtml=pageHtml + "<li class='am-active'><a href='" + url + "?pageNow=" + j + param + "'>"+j+"</a></li>";
            } else {
                pageHtml=pageHtml + "<li><a href='" + url + "?pageNow=" + j + param + "'>"+j+"</a></li>";
            }
        }
    } else {
        pageHtml=pageHtml + "<li><a href='" + url + "?pageNow=" + (pageNow-2) + param + "'>"+(pageNow-2)+"</a></li>" +
            "<li><a href='" + url + "?pageNow=" + (pageNow-1) + param + "'>"+(pageNow-1)+"</a></li>" +
            "<li class='am-active'><a href='" + url + "?pageNow=" + pageNow + param + "'>"+pageNow+"</a></li>" +
            "<li><a href='" + url + "?pageNow=" + (pageNow+1) + param + "'>"+(pageNow+1)+"</a></li>" +
            "<li><a href='" + url + "?pageNow=" + (pageNow+2) + param + "'>"+(pageNow+2)+"</a></li>";
    }
    if (pageNow == pageNum){
        pageHtml = pageHtml + "<li class='am-disabled'><a href='" + url + "?pageNow="+pageNum+ param +"'>«&nbsp;尾页</a></li>"
    } else {
        pageHtml = pageHtml + "<li><a href='" + url + "?pageNow="+pageNum+ param +"'>«&nbsp;尾页</a></li>"
    }


    return pageHtml;
};