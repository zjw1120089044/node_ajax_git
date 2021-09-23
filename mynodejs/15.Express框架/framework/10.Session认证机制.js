// 服务器端渲染多使用session认证机制
// 前后端分离多使用JWT认证机制

// HTTP协议的无状态性：每次http请求都是独立的，没有直接关系，服务器不会主动保留http请求状态

/*  Cookie(身份认证标识)：存储在用户浏览器中不超过 4KB 的字符串，
        它由name，value和用于控制Cookie有效期，安全性，使用范围的可选属性组成
        不同域名下Cookie各自独立，不能互相访问，
        每当客户端发起请求时，会自动把 当前域名下 所有未过期的Cookie一同发送到服务器
*/

/*  客户端第一次请求服务器时，服务器会通过 响应头 的方式向客户端发送一个身份认证的Cookie，
     客户端自动保存在浏览器中，之后每次请求都会自动将Cookie通过请求头的方式发给服务器
*/

// Cookie不具有安全性，很容易被伪造，因此不建议存储重要的隐私数据
// 在服务器端通过 认证Cookie 的方式来提高安全性

// Session认证机制需要配合Cookie，由于Cookie默认不支持跨域，需要做很多额外配置才能实现Session跨域


// npm install express-session

const express = require('express')
const app = express()

const session = require('express-session')

app.use(express.static('./10_pages'))

app.use(express.urlencoded({ extended: false }))

app.use(session({
    secret: 'cat',    //任意字符串，负责加密
    resave: false,
    saveUninitialized: true
}))

// 当express-session中间件配置成功后，req中会新增一个session属性来访问和使用session对象

app.post('/api/login', (req, res) => {
    // 验证用户登录信息
    if(req.body.username != 'admin' || req.body.password != '123123'){
        return res.send({ status: 400, msg: '登录失败，用户名或密码错误' });
    }

    req.session.user = req.body;  //存储用户信息到session中
    req.session.isLogin = true;   //存储用户登录状态

    res.send({ status: 200, msg: '登录成功' })
})


// 获取用户姓名
app.get('/api/username', (req, res) => {
    // 判断用户是否登录
    if(req.session.isLogin != true){
        return res.send({ status: 400, msg: '未登录' })
    }
    res.send({ status: 200, msg: 'success', username: req.session.user.username })
})


// req.session.destroy() 清空session (只会清空当前用户的session)

// 退出登录
app.post('/api/logout', (req, res) => {
    req.session.destroy()
    res.send({ status: 200, msg: '退出登录成功'})
})


app.listen(80, () => {
    console.log('服务器启动成功');
})