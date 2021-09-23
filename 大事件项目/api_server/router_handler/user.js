// 路由处理函数

const db = require('../db/index');

// npm install bcryptjs  加密模块
const bcrypt = require('bcryptjs');

const config = require('../config');
const jwt = require('jsonwebtoken');



// 注册新用户的处理函数
exports.regUser = (req, res) => {
    const userinfo = req.body;

    // if(!userinfo.username || !userinfo.password){
    //     return res.send({ status: 1, message: '用户名或密码不合法！' });
    // }

    // 查询用户名是否已存在
    const sqlStr = 'SELECT * FROM ev_users WHERE username=?'
    db.query(sqlStr, userinfo.username, (err, results) => {
        // sql语句执行失败
        if(err){
            // return res.send({ status: 1, message: err.message });
            return res.cc(err)
        }

        // 用户名是否被占用
        if(results.length > 0){
            // return res.send({ status: 1, message: '当前用户名已被占用，请更换其他用户名' });
            return res.cc('当前用户名已被占用，请更换其他用户名' )
        }

        // 验证成功，对密码进行加密                             随机盐长度，提高安全性
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)
        console.log(userinfo.password);

        // 插入新用户
        const sql = 'INSERT INTO ev_users SET ?'
        db.query(sql, {username: userinfo.username, password: userinfo.password}, (err, result) => {
            if(err){
                // return res.send({ status: 1, message: err.message })
                return res.cc(err)
            }
            if(result.affectedRows != 1){
                // return res.send({ status: 1, message: '注册用户失败，请稍后再试' })
                return res.cc('注册用户失败，请稍后再试')
            }
            
            // res.send({ status: 0, message: '注册成功！' });
            res.cc('注册成功！', 0)
        })
    })


}

// 登录的处理函数
exports.login = (req, res) => {
    const userinfo = req.body;

    const sql = 'SELECT * FROM ev_users WHERE username=?'

    db.query(sql, userinfo.username, (err, results) => {
        if(err){
            return res.cc(err)
        }
        if(results.length != 1){
            return res.cc('登录失败，未查询到用户名')
        }

        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
        if(!compareResult){
            return res.cc('密码错误')
        }

        // 生成Token字符串，            提出密码和头像
        const user = {...results[0], password: '', user_pic: ''}
        const tokenStr = jwt.sign(user, config.jwtSecretKey, {expiresIn: config.expiresIn})

        res.send({
            status: 0,
            message: '登录成功',
            token: 'Bearer '+tokenStr
        });
    })

}