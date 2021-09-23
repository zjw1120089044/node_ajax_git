$(function(){
    function padZero(n){
        n = n < 10 ? '0'+n : n;
        return n;
    }
    template.defaults.imports.dateFormat = function(date){
                    //传入时间字符串
        var dt = new Date(date);

        var y = dt.getFullYear();
        var m = dt.getMonth() + 1;
        var d = dt.getDate();
        var h = dt.getHours();
        var mm = padZero(dt.getMinutes());
        var s = padZero(dt.getSeconds());

        return y+'-'+m+'-'+d+' '+h+':'+mm+':'+s;
    }

    function getList(){
        $.get('http://www.liulongbin.top:3006/api/news', (res) => {
            if(res.status != 200) return alert('获取新闻列表失败');
            console.log(res);

            // 把每一项的tags属性 ，从字符串转换为数组
            for(var i = 0; i<res.data.length; i++){
                res.data[i].tags = res.data[i].tags.split(',');

            }

            var htmlstr = template('tpl-news', res);
            $('#news-list').html(htmlstr);
        })
    }
    getList();
})