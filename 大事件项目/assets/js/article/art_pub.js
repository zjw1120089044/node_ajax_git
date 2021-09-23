$(function(){
    var form = layui.form;
    var layer = layui.layer;

    // 初始化文章分类
    function initCate(){
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: res => {
                if(res.status != 0){
                    return layer.msg('初始化文章分类失败！');
                }
                var htmlstr = template('tpl-cate', res);
                $('[name=cate_id]').html(htmlstr);

                // 必须要重新渲染表单
                form.render();
            }
        })
    }
    initCate();

    // 初始化富文本编辑器
    initEditor();

    // 初始化图片裁剪器
    var img = $('#image');
    var options = {
        aspectRatio: 400/280,
        preview: '.img-preview'
    }
    img.cropper(options)

    // 选择封面按钮点击事件
    $('#btnChooseImage').on('click', function(){
        $('#coverFile').click();
    })
    $('#coverFile').on('change', function(e){
        var files = e.target.files;
        if(files.length == 0){
            return;
        }
        var newImgURL = URL.createObjectURL(files[0]);
        img.cropper('destroy')
           .attr('src', newImgURL)
           .cropper(options)
    })

    // 发布和草稿的提交事件
    var art_state = '已发布';
    $('#btnSave2').on('click', function(){
        art_state = '草稿';
    })
    $('#form-pub').on('submit', function(e){
        e.preventDefault();
        var fd = new FormData($(this)[0]);
        fd.append('state', art_state);
        
        // 将裁剪后的图片输出为文件对象
        img.cropper('getCroppedCanvas', {
            // 创建Canvas画布
            width: 400,
            height: 280
        }).toBlob(function(blob){
            // 将Canvas画布的内容转化为文件对象+
            fd.append('cover_img', blob);


            fd.forEach((value, k)=>{
                console.log(k, value);
            })

            pubArticle(fd);
        })

        // 发布文章请求
        function pubArticle(fd){
            $.ajax({
                method: 'POST',
                url: '/my/article/add',
                data: fd,  
                //由于fd中上传了文件，所以需要以下两行
                contentType: false,
                processData: false,
                success: res => {
                    if(res.status != 0){
                        return layer.msg('文章发布失败！');
                    }
                    layer.msg('文章发布成功!');
                    location.href = 'art_list.html';
                }
            })
        }
        
        
    })
})