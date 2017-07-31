/**
 * 文件说明
 * 创建人：刘佳乐
 * 创建时间：2017-7-27
 */

exports.urlParam = function GetQueryString(url,name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = url.match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}