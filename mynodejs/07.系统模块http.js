// 127.0.0.1的域名即为localhost
// 端口号用来区分 服务器 中的每个web服务，http默认端口号 80 可以被省略(https默认443)


const http = require('http');
const server = http.createServer();

    // 只要服务器接收到了请求(request)就会触发该回调函数
server.on('request', (req, res) => {
    console.log('接收到了请求');

    // req是请求对象，包含了客户端的数据和属性
    const str = `请求的url为：${req.url}，请求方式为：${req.method}`


    const url = req.url;
    let content = '<h1>404 Not Found</h1>';
    if(url == '/' || url == '/index.html'){
        content = '<h1>首页</h1>';
    }else if(url == '/list.html'){
        content = '<h1>列表页</h1>';
    }


    // res.writeHead(200, {
    //     'content-type': 'text/html; charset=utf8'
    // });
    res.setHeader('Content-Type', 'text/html; charset=utf-8');  //utf8也可

    res.end(str +'\n'+ content);
})

server.listen(8080, () => {
    console.log('服务器启动成功');
})