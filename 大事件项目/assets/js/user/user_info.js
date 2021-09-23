$(function(){
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        nickname: function(value){
            if(value.length > 12){
                return '昵称长度必须小于12个字符！';
            }
        }
    })

    // 初始化用户的基本信息
    function initUserInfo(){
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: res => {
                if(res.status != 0){
                    return layer.msg('获取用户信息失败！');
                }
                console.log(res);
                // 通过formUserInfo给表单赋值
                form.val('formUserInfo', res.data);
            }
        })
    }
    initUserInfo();

    // 重置按钮
    $('#btnReset').on('click', function(e){
        e.preventDefault();
        // 重新获取用户信息
        initUserInfo();
    })

    $('.layui-form').on('submit', function(e){
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: res => {
                if(res.status != 0){
                    return layer.msg('更新信息失败！');
                }
                layer.msg('更新信息成功！');
                // 调用父页面index中的方法，重新获取用户信息并渲染
                window.parent.getUserInfo();
            }
        })
    })
})