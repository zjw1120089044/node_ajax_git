const express = require('express');
const app = express();

// 获取GET请求参数
app.get('/index', (req, res) => {
        //获取查询字符串
    res.send(req.query)     // ?id=2&name='zs'  (url参数)
})


// Express路由动态参数获取
        // /list/02/张三/18  (路径参数)
app.get('/list/:id/:name/:age', (req, res) => {
    // 必须传递所有参数才能响应成功
    res.send(req.params)
})


// 获取POST请求参数   Express中获取post请求参数需要借助body-parser模块
// npm install body-parser
const bodyParser = require('body-parser');
// 拦截所有请求
// extended:false 内部使用querystring模块处理请求参数格式
// extended:true 内部使用第三方模块qs模块处理请求参数格式
app.use(bodyParser.urlencoded({extended: false}))  //返回一个函数作为use的回调函数

app.post('/add', (req, res) => {
    res.send(req.body)
})



app.listen(3000);
console.log('网站服务器启动成功');