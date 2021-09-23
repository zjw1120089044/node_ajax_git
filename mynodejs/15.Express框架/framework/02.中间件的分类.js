// 应用级别的中间件
// 通过app.use() ，app.get() ，app.post() 绑定到app上的中间件

// 路由级别的中间件
// 绑定到express.Router()的实例router上的中间件

// 错误级别的中间件
// 用来捕获整个项目发生的异常，从而防止崩溃
// 错误级别的中间件处理函数中形参必须有四个 (err, req, res, next)


// Express内置中间件
// express.static()  托管静态资源
// express.json()  解析JSON格式的请求体数据
// express.urlencoded()  解析URL-encoded格式的请求体数据

const express = require('express')
const app = express()

// 解析表单中JSON格式的数据
app.use(express.json())
// 解析表单中url-encoded格式的数据
app.use(express.urlencoded({ extended: false }))

app.post('/add', (req, res) => {
    // 在服务器中可以使用req.body来接收客户端发送来的请求体数据
    // 若不配置解析表单数据的中间件，req.body默认为undefined
    console.log(req.body);
    res.send('OK');
})

app.listen(80, () => {
    console.log('服务器启动成功');
})


// 第三方中间件

// body-parser(被弃用)   与 express.urlencoded 用法一致
// const parser = require('body-parser')
// app.use(parser.urlencoded({ extended: false }))



// 全局中间件：使用use注册的中间件

// 局部中间件：不使用use注册的中间件(通过调用中间件函数)
// const mw = (req, res, next) => {
//     console.log('调用了局部中间件');
//     next();
// }
// app.get('/', mw, (req, res) => {
//     res.send('主页');
// })                                         //若将局部的get改为全局的use则可触发
// app.get('/user', (req, res) => {   //请求url为'/user'时，不会触发局部的 get '/'
//     res.send('用户页');
// })