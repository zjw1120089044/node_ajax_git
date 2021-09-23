// 获取用户基本信息
function getUserInfo(){
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // 请求头配置对象
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: res => {
            if(res.status != 0){
                return layui.layer.msg('获取用户信息失败')
            }
            renderAvatar(res.data);
        },
        // 无论请求是否成功都会调用complete
        // complete: res => {
        //     // 在complete中通过res.responseJSON来获取服务器响应的数据
        //     if(res.responseJSON.status == 1 && res.responseJSON.message == '身份认证失败！'){
        //         localStorage.removeItem('token');
        //         location.href = 'login.html'
        //     }
        // }
    })
}

// 渲染头像
function renderAvatar(user){
    var name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;'+name);
    if(user.user_pic != null){
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    }else{
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }
}


$(function(){  
    getUserInfo();

    var layer = layui.layer;
    // 退出按钮
    $('#btnLogout').on('click', function(){
        layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, function(index){
            // 清除本地存储中的token
            localStorage.removeItem('token');
            location.href = 'login.html';
            layer.close(index);
        });
    })
})