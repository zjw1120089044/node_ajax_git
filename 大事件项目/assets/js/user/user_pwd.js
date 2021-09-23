$(function(){
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须是6-12位的非空格字符'],
        samePwd: function(value){
            if(value == $('[name=oldPwd]').val()){
                return '新旧密码不能相同！';
            }
        },
        rePwd: function(value){
            if(value != $('[name=newPwd]').val()){
                return '两次密码不一致!';
            }
        }
    })

    $('.layui-form').on('submit', function(e){
        e.preventDefault();
        console.log($(this).serialize());
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: res => {
                if(res.status != 0){
                    return layer.msg('更新密码失败！');
                }
                layer.msg('更新密码成功！');
                $('.layui-form')[0].reset();
            }
        })
    })
})