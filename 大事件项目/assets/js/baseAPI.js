// 在每次调用$.get() ，$.post() ，$.ajax()之前都会调用该函数
// 通过该函数拼接url
$.ajaxPrefilter(function(options){
    
    // 统一给有权限的接口设置请求头
    if(options.url.startsWith('/my/')){
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;
    
    // 统一给有权限的接口设置请求头
    // if(options.url.indexOf('/my/') != -1){
    //     options.headers = {
    //         Authorization: localStorage.getItem('token') || ''
    //     }
    // }

    options.complete = function(res) {
        // 在complete中通过res.responseJSON来获取服务器响应的数据
        if(res.responseJSON.status == 1 && res.responseJSON.message == '身份认证失败！'){
            localStorage.removeItem('token');
            location.href = 'login.html'
        }
    }
})