function resolveData(data){
    // var arr = [];
    // for(var k in data){
    //     var str = k + '=' + data[k];
    //     arr.push(str);
    // }
    // return arr.join('&');
    return new URLSearchParams(data).toString();
}
// console.log(resolveData({name: '张三', age: 20}));

function myAjax(options){
    var xhr = new XMLHttpRequest();
    var querystring = resolveData(options.data);  //JSON.stringify()
                    // 对象转换为查询字符串


    // 判断请求类型
    if(options.method == 'GET'){
        xhr.open('GET', options.url + '?' + querystring);
        xhr.send();
    }else if(options.method == 'POST'){
        xhr.open('POST', options.url);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(querystring);
    }


    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            var result = JSON.parse(xhr.responseText);
            options.success(result);
        }
    }
}