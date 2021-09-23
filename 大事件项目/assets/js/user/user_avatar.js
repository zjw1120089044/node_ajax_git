$(function(){
    var img = $('#img');
    var options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }
    img.cropper(options);

    // 上传按钮绑定点击事件模拟点击input
    $('#btnChooseImg').on('click', function(){
        $('#file').click();
    })

    var layer = layui.layer;
    $('#file').on('change', function(e){
        var filelist = e.target.files
        if(filelist.length == 0){
            return layer.msg('请选择照片')
        }

        var file = e.target.files[0];
        var imgURL = URL.createObjectURL(file);
        img.cropper('destroy') //销毁旧的裁剪区
           .attr('src', imgURL) //设置图片路径
           .cropper(options) //重新初始化裁剪区域
    })

    $('#btnUpload').on('click', function(){
        var dataURL = img.cropper('getCroppedCanvas', {
            // 创建Canvas画布
            width: 100,
            height: 100
        }).toDataURL('image/png') //将Canvas画布的内容转化为base64格式的字符串

        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: res => {
                if(res.status != 0){
                    return layer.msg('更换头像失败!');
                }
                layer.msg('更换头像成功!');
                window.parent.getUserInfo();
            }
        })
    })
})