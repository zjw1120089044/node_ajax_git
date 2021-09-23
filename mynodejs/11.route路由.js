// 路由是指客户端请求地址与服务器端程序代码的映射关系

const http = require('http');
const app = http.createServer();

app.on('request', (req, res) => {
    const method = req.method.toLowerCase();

    const myurl = new URL(req.url, 'http://localhost:3000');
    let pathname = myurl.pathname;

    res.writeHead(200, {
        'content-type': 'text/html; charset=utf8'
    })

    if(method == 'get'){
        if(pathname == '/' || pathname == '/index'){
            res.end('欢迎来到首页');
        }else if(pathname == '/list'){
            res.end('欢迎来到列表页');
        }else{
            res.end('您访问的页面不存在');
        }
    }else if(method == 'post'){

    }
});
app.listen(3000);
console.log('服务器启动成功');