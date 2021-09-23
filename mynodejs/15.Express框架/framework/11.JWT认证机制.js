// Session认证机制需要配合Cookie，由于Cookie默认不支持跨域，需要做很多额外配置才能实现Session跨域

// JWT(JSON Web Token)跨域认证解决方案
/* 客户端第一次发起登录请求，验证通过后将用户信息加密生成token字符串返回给客户端，
    客户端将token存储到LocalStorage或SessionStorage
    再次发起请求时，通过请求头的Authorization字段，将token发送给服务器
    服务器将token还原为用户信息对象进行认证
*/

// JWT由三部分组成： Header.Payload.Signature    中间用 . 分隔
                 // (头部)(有效载荷)(签名)
/*eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJpZCI6Mjg0NTgsInVzZXJuYW1lIjoiemp3IiwicGFzc3dvcmQiOiIiLCJuaWNrbmFtZSI6Ium7hOixhiIsImVtYWlsIjoiMTEyMDA4OTA0NEBxcS5jb20iLCJ1c2VyX3BpYyI6IiIsImlhdCI6MTYzMDUwMDg1MiwiZXhwIjoxNjMwNTM2ODUyfQ.
GjLEAABZQF-iIT7-VhAGBNAVpRUMQ1Dr-TlQZ_dJzL8*/
// 使用时还需要在前面加上Bearer的前缀

// Payload部分是用户信息经过加密后生成的字符串
// Header和Signature是为了保证token的安全性



// npm install jsonwebtoken   用于生成JWT字符串
// npm install express-jwt    将JWT字符串解析还原为JSON对象

const express = require('express');
const app = express();

const jwt = require('jsonwebtoken');
const expressJWT = require('express-jwt');


app.use(express.urlencoded({ extended: false }))


// 为保证JWT字符串的安全性，需要使用密钥对其进行加密和解密
const secretKey = 'huangdou';


        //将JWT字符串解析还原为JSON对象
app.use(expressJWT({
        secret: secretKey, 
        algorithms: ['HS256']   //设置jwt的算法
    }).unless({
        path: [/^\/api\//]    //不需要进行解析的接口
    })
);
// 该中间件会添加一个新的req.user属性用来存放解析出来的用户信息



// 登录接口
app.post('/api/login', (req, res) => {
    const userinfo = req.body;
    if(userinfo.username != 'admin' || userinfo.password != '123123'){
        return res.send({ status: 400, message: '登录失败，用户名或密码错误' });
    }

                            //为保证安全性，不要把密码放在加密字符串中
    // 生成jwt字符串            (用户信息对象， 密钥， 配置对象：配置token的有效期)
    const tokenStr = jwt.sign({username: userinfo.username}, secretKey, {expiresIn: '30s'});

    res.send({ status: 200, message: '登录成功', token: tokenStr });
})


// 获取用户信息(有权限的接口)
app.get('/admin/getinfo', (req, res) => {
    console.log(req.user);

    res.send({ status: 200, message: '获取用户信息成功', data: req.user })
})


// 捕获token解析失败的错误
app.use((err, req, res, next) => {
                // token解析失败导致的错误
    if(err.name === 'UnauthorizedError'){
        return res.send({ status: 401, message: '无效的token' })
    }

    res.send({ status: 500, message: '未知错误' })
})



app.listen(80, () => {
    console.log('服务器启动成功');
})