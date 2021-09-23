$(function(){
    // 点击去注册
    $('#toReg').on('click', function(){
        $('.login-box').hide();
        $('.reg-box').show();
    })

    // 点击去登录
    $('#toLogin').on('click', function(){
        $('.reg-box').hide();
        $('.login-box').show();
        
    })

    // 通过layui获取元素
    // var form = layui.form;
    var {form, layer} = layui;   //对象解构
    // 自定义校验规则
    form.verify({
        // 自定义了名为pwd的校验规则
        pwd: [/^[\S]{6,}$/, '密码必须6位以上，且非空格'],
        repwd: function(value){
                    // value拿到的是确认密码框中的内容
            var pwd = $('.reg-box [name=password]').val();
            if(pwd != value) return '密码不一致!';
        }
    })

    // 注册提交事件
    // var layer = layui.layer;
    $('#form_reg').on('submit', function(e){
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url:'/api/reguser',
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            },
            success: res => {
                if(res.status != 0){
                    return layer.msg(res.message);
                }
                layer.msg('注册成功!');
                $('#toLogin').click();
            }
        })
    })

    // 登录提交事件
    $('#form_login').on('submit', function(e){
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);
                if(res.status !== 0){
                    return layer.msg('登录失败!');
                }
                layer.msg('登录成功!');
                
                // 服务器返回的token值用来判断用户是否有权限
                console.log(res.token);
                localStorage.setItem('token', res.token);

                location.href = 'index.html'
            }
        })
    })


})