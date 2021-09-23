$(function(){
    var form = layui.form;
    var layer = layui.layer;

    // 格式化时间过滤器
    template.defaults.imports.dateFormat = function(date){
        var dt = new Date(date);

        var y = dt.getFullYear();
        var m = dt.getMonth() + 1;
        var d = dt.getDate();
        var h = dt.getHours();
        var mm = padZero(dt.getMinutes());
        var s = padZero(dt.getSeconds());

        return `${y}-${m}-${d} ${h}:${mm}:${s}`;
    }
    function padZero(n){
        return n<10 ? '0'+n : n;
    }

    // 查询参数对象
    var q = {
        pagenum: 1,   //页码值，默认第一页
        pagesize: 4,  //每页显示几条数据
        cate_id: '',  //文章分类id
        state: ''     //文章发布状态
    }

    // 获取文章列表
    function initList(){
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: res => {
                console.log(res);
                if(res.status != 0){
                    return layer.msg('获取文章列表失败！');
                }
                var htmlstr = template('tpl-list', res);
                $('tbody').html(htmlstr);

                renderPage(res.total);
            }
        })
    }
    initList();

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


                // layui的渲染机制无法监听到动态添加的选项
                // 必须要重新渲染表单
                form.render();
            }
        })
    }
    initCate();

    // 筛选表单提交事件
    $('#form-search').on('submit', function(e){
        e.preventDefault();
        var cate_id = $('[name=cate_id]').val();
        var state = $('[name=state]').val();
        q.cate_id = cate_id;
        q.state = state;
        initList();
    })

    // 渲染分页
    var laypage = layui.laypage;
    function renderPage(total){
        console.log(total);
        laypage.render({
            elem: 'pagebox',    //分页容器id
            count: total,       //总数据条数
            limit: q.pagesize,  //每页显示几条
            curr: q.pagenum,    //默认选中的页码
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],  //自定义分页组件
            limits: [3,4,5,10],
            jump: function(obj, first){   //分页发生切换时触发jump
                q.pagenum = obj.curr;  //将选中的页码返回给q
                q.pagesize = obj.limit; //返回条目数


                // initList();  直接调用会导致死循环
                /* first参数为true表示调用触发的
                        为undefined表示点击页码触发
                */
                if(first == undefined){
                   initList();
                }
            }
        })
    }

    // 删除按钮点击事件
    
    $('tbody').on('click', '#btn-del', function(){
        var id = $(this).attr('data-id');
        var len = $('#btn-del').length;   //删除按钮个数
        layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/'+id,
                success: res => {
                    if(res.status != 0){
                        return layer.msg('文章删除失败！');
                    }
                    layer.msg('文章删除成功！');

                    // 判断当前页是否还有数据，没有则让页码-1
                    if(len == 1){  //若按钮个数只有1个时，即删除后页面将没有数据
                        q.pagenum = q.pagenum==1 ? 1 : q.pagenum-1;
                    }

                    initList();
                }
            })
            
            layer.close(index);
        });
    })

})