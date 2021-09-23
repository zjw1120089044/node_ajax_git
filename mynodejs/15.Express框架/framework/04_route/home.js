const express = require('express');
// 创建路由对象
const homeRouter = express.Router();

// 创建二级路由
homeRouter.get('/index', (req, res) => {
    res.send('欢迎来到/home/index')
})

homeRouter.post('/add', (req, res) => {
    res.send('提交到了/home/add')
})

module.exports = homeRouter;

// module.exports.homeRouter = homeRouter
// 使用这种方式导出时，在导入时需要使用require('./').homeRouter的方式