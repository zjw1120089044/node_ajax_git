// 路由模块

const express = require('express');
const router = express.Router();


// 导入路由处理函数模块
const user_handler = require('../router_handler/user');


// 导入数据验证模块
const expressJoi = require('@escook/express-joi');
const {reg_login_schema} = require('../schema/user');


// 注册
router.post('/reguser', expressJoi(reg_login_schema), user_handler.regUser)


// 登录
router.post('/login', expressJoi(reg_login_schema), user_handler.login)

module.exports = router;