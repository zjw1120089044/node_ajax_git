$(function(){
    var layer = layui.layer;
    var form = layui.form;

    function initArtCateList(){
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: res => {
                console.log(res);
                var htmlstr = template('tpl-table', res);
                $('tbody').html(htmlstr)
            }
        })
    }
    initArtCateList();


    // 添加类别按钮弹出框
    var indexAdd = null;
    $('#btnAddCate').on('click', function(){
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        });
    })

    $('body').on('submit', '#form-add', function(e){
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: res => {
                if(res.status != 0){
                    return layer.msg('新增分类失败！');
                }
                layer.msg('新增分类成功！');
                initArtCateList();
                // 根据索引关闭弹出层
                layer.close(indexAdd);
            }
        })
    })

    // 编辑按钮弹出框
    var indexEdit = null;
    $('tbody').on('click', '#btn-edit', function(){
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        });

        var id = $(this).attr('data-id');
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: res => {
                console.log(res);
                form.val('form-edit', res.data);
            }
        })
    })

    $('body').on('submit', '#form-edit', function(e){
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: res => {
                if(res.status != 0){
                    return layer.msg('更新分类数据失败！');
                }
                layer.msg('更新分类数据成功！');
                layer.close(indexEdit);
                initArtCateList();
            }
        })
    })

    // 删除按钮弹出框
    $('tbody').on ('click', '#btn-del', function(){
        var id = $(this).attr('data-id');
        layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: res => {
                    if(res.status != 0){
                        return layer.msg('删除失败!');
                    }
                    layer.msg('删除成功!');
                    layer.close(index);
                    initArtCateList();
                }
            })
            
        });
    })
})