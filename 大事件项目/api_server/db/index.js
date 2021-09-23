// 配置数据库

const mysql = require('mysql')

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'bigevent'
})


module.exports = db; 