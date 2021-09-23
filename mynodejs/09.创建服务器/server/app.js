// 用于创建网站服务器的模块
const http = require('http');
// app对象即网站服务器对象
const app = http.createServer();

// 用于处理url
const url = require('url');

// 当客户端有请求时
app.on('request', (req, res) => {

    /*
        HTTP状态码
        200请求成功
        404请求资源未找到
        400客户端请求有语法错误 (请求路径写错 ，请求参数不匹配)
        500服务器端错误 (代码有误) 
    */
    /*
        内容类型
        text/plain  纯文本
        text/html
        text/css
        application/javascript
        application/json
        image/jpeg
    */
    res.writeHead(200, {
        'content-type': 'text/html; charset=utf8'  //防止中文乱码
    });

    // res.end('<h2> Hello, user! </h2>');

    // 获取请求方式   GET(请求数据)  POST(发送数据)
    console.log(req.method);
    // 在浏览器中输入网址属于GET方式 ，浏览器会自动发送一个favicon请求，因此会输出两个GET
    // if(req.method == 'POST'){
    //     res.end('post');
    // }else if(req.method == 'GET'){
    //     res.end('get');
    // }
  
    
    // 获取请求报文信息
    // console.log(req.headers);
                    // 通过该方式可查看报文对象中的每一项信息
    // console.log(req.headers['accept']);


    // 获取GET请求参数
    // console.log(url.parse(req.url));  被弃用
    console.log(new URL(req.url, 'http://localhost:3000'));
    const myurl = new URL(req.url, 'http://localhost:3000');
    let params = myurl.searchParams;
    console.log(params);
    console.log(params.get('name'));
    console.log(params.get('age'));

    


    // 获取请求地址
    console.log(req.url);
    let pathname = myurl.pathname;
    if(pathname == '/index' || req.url == '/'){
        res.end('<h2> 欢迎来到首页 </h2>');
    }else if(pathname == '/list'){
        res.end('welcome to list');
    }else{
        res.end('Not found');
    }

    
});
app.listen(3000);
console.log('网站服务器启动成功');
