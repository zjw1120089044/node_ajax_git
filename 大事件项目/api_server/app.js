const express = require('express')
const app = express()

const joi = require('joi')

// 跨域
const cors = require('cors');
app.use(cors())

// 解析 application/x-www-form-urlencoded 格式的表单数据
app.use(express.urlencoded({ extended: false }))

// 解析token
const expressJWT = require('express-jwt');
const config = require('./config');
app.use(expressJWT({secret: config.jwtSecretKey, algorithms: ['HS256']}).unless({path: [/^\/api\//]}))


// 封装一个返回错误信息的函数
app.use((req, res, next) => {
    // status默认值为1，表示失败
    // err的值可能是错误对象，或描述错误的字符串
    res.cc = (err, status = 1) => {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next();
})


// 调用路由
const userRouter = require('./router/user');
app.use('/api', userRouter);
const userinfoRouter = require('./router/userinfo');
app.use('/my', userinfoRouter);


// 错误处理
app.use((err, req, res, next) => {
    // 验证失败导致的错误
    if(err instanceof joi.ValidationError){
        return res.cc(err);
    }

    // token验证失败
    if(err.name === 'UnauthorizedError'){
        return res.send('身份验证失败');
    }

    // 未知错误
    res.cc(err);
})


app.listen(3000, () => {
    console.log('服务器启动成功')
})