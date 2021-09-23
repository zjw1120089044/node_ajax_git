const express = require('express');
// 创建路由对象
const admin = express.Router();

// 创建二级路由
admin.get('/index', (req, res) => {
    res.send('欢迎来到/admin/index')
})

module.exports = admin;