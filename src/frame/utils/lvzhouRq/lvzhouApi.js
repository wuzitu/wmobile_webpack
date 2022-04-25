import request from "./request.js"
/* @url:"请求地址"
@method:post，get,delete,put...
@params:拼接到地址栏的参数
@data:body里面传输
*/

export function lvzhouInit(){
    return request({
        url:"",
        method:"get",
        headers:{ "Access-Control-Expose-Headers":"Authorization" }
    })
}

export function lvzhpuceshi(){
    return request({
        url:"/cas/login?service=https%3A%2F%2Foasis.h3c.com%2Fv3%2Fnewweb&loginUrl=https%3A%2F%2Foasis.h3c.com%2Foasis%2Fstable%2Fmix%2Flogin.html",
        method:"get"
    })
}

export function lvzhouTest(params){//测试接口
    return request({
        url:"/oasis/stable/web/static/oasis-rest-notification/restapp/webnotify/getWebnotify",
        method:"get",
        params:params
    })
}

export function getPictureCode(){
    return request({
        url:"/v3/pinserver/getPin",
        method:"get"
    })
}