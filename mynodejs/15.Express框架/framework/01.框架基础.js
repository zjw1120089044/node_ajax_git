// npm install express

// 创建网站服务器  不再需要http来createServer
const express = require('express');
const app = express();



app.get('/', (req, res) => {             //局部中间件  (触发get /request 时，不会触发该中间件)
    console.log('请求走了get');
    res.send('Hello,Express! 测试');
    //通过send()响应 ，能自动识别 响应类型(text/html) 和 编码方式(utf8)   
    //自动设置http状态码(404) 不再需要res.end()
})
// GET请求响应失败时会显示Cannot get ..  (get中间件必须设置url参数)


// app.use中间件 ，匹配所有请求方式(GET/POST)
app.use('/', (req, res, next) => {         //全局中间件(全局中间件'/'参数可省略)
    console.log('请求走了use中间件');
    next();
})
app.use('/request', (req,  res, next) => {  
    console.log('请求走了use /request中间件');
    next();
})

// 中间件：一些用来接收,处理请求,对请求做出响应的方法 ，也可将请求交给下一个中间件
// 默认情况 ，请求从上到下依次匹配中间件 ，一旦成功就终止匹配
// next方法可将请求控制权交给下个中间件 ，直到遇到结束请求
app.get('/request', (req, res, next) => {
    req.name = '张三';
    next();
})
app.get('/request', (req, res) => {
    res.send(req.name);
})


app.get('/list', (req, res) => {
    res.send('/list');
})

app.listen(3000);
console.log('网站服务器启动成功');