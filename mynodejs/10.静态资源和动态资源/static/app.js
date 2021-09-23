const http = require('http');
const app = http.createServer();

const url = require('url');
const path = require('path');
const fs = require('fs');
const mime = require('mime');

app.on('request', (req, res) => {

    // 获取用户请求路径
    const myurl = new URL(req.url, 'http://localhost:3000');
    let pathname = myurl.pathname;

    pathname = pathname == '/' ? '/default.html' : pathname;
    console.log(pathname);

    // 将请求的路径转换为实际的硬盘路径
    let realPath = path.join(__dirname, 'public' + pathname);
    // console.log(realPath);

    // 根据路径返回文件类型
    let type = mime.getType(realPath);
    console.log(type);

    fs.readFile(realPath, (error, result) => {
        if(error){
            res.writeHead(404, {
                'content-type': 'text/html; charset=utf8'
            })
            res.end('文件读取失败');
            return;
        }

        res.writeHead(200, {
            // 由于网页在执行过程中外链有css，js，image等类型文件 ，不能只写text/html类型
            // mime模块 能根据路径返回文件类型  (高版本浏览器能自动识别文件类型)
            'content-type': type
        })

        res.end(result);
    })

});
app.listen(3000);
console.log('服务器启动成功');