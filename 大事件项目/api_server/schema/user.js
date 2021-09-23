// 第三方数据验证模块

// npm install joi              为表单每个数据项定义验证规则
// npm install @escook/express-joi    实现自动对表单数据进行验证的功能

const joi = require('joi');


const username = joi.string().alphanum().min(1).max(20).required();
const password = joi.string().pattern(/^[\S]{6,18}$/).required();

const id = joi.number().integer().min(1).required();
const nickname = joi.string().required();
const user_email = joi.string().email().required();

const avatar = joi.string().dataUri().required();
                         //检查是否为base64格式


// 对req.body中的数据进行验证
exports.reg_login_schema = {
    body: {
        username,
        password
    }
}

// 修改用户信息
exports.update_userinfo_schema = {
    body: {
        id,    //属性名与规则名相同时可省略
        nickname: nickname,
        email: user_email
    }
}

// 修改密码
exports.update_password_schema = {
    body: {
        oldPwd: password,
        newPwd: joi.not(joi.ref('oldPwd')).concat(password)
                //  不  与oldPwd保持一致      合并第二种规则
    }
}

// 修改头像
exports.update_avatar_schema = {
    body: {
        avatar
    }
}