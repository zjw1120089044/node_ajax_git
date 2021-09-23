const express = require('express');
const app = express();

// 模块化路由
const homeRouter = require('./04_route/home.js'); 
const admin = require('./04_route/admin.js');

// 创建路由对象
// const homeRouter = express.Router();

// 给路由对象匹配请求参数
app.use('/home', homeRouter);

// 创建二级路由
// homeRouter.get('/index', (req, res) => {
//     res.send('欢迎来到/home/index')
// })

app.use('/admin', admin);

app.listen(3000);
console.log('网站服务器启动成功');