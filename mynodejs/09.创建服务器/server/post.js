const http = require('http');
const app = http.createServer();

// 处理请求参数模块
const querystring = require('querystring');

app.on('request', (req, res) => {
    // post参数是通过事件的方式接收的
    
    let postParams = '';

    // 请求参数传递时触发data事件
    req.on('data', params => {
        postParams += params;
    });

    // 参数传递完成时触发end事件
    req.on('end', () => {
        console.log(querystring.parse(postParams));
    });

    res.end('ok');

});
app.listen(3000);
console.log('post服务器启动成功');