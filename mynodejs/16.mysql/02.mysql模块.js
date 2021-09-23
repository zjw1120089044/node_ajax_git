// npm install mysql

const mysql = require('mysql');

// 建立与数据库的连接 (快捷键：mysql_link)
const db = mysql.createPool({
    host: 'localhost',    //数据库的IP地址
    user: 'root',
    password: 'root',
    database: 'my_db'
})


// 测试mysql模块是否正常工作   SELECT 1 并无实际意义
// db.query('SELECT 1', (err, results) => {
//     if(err){
//         return console.log(err.message);
//     }
//     console.log(results);
// })



// 查询
const sqlStr = 'SELECT * FROM users'
db.query(sqlStr, (err, results) => {
    if(err){
        return console.log(err.message);
    }
    console.log(results);
})



// 插入
const user1 = { username: 'Zjw', password: '123456' }
                                                // 使用 ? 作为占位符
const sqlStr1 = 'INSERT INTO users(username,password) VALUES (?,?)'

// 当对象的每个属性都与数据库字段对应时，可使用简单的方式直接传入对象
// const sqlstr1 = 'INSERT INTO users SET ?'
// db.query(sqlstr1, user1, (err, result)=>{})

                // 通过数组给占位符指定值
db.query(sqlStr1, [user1.username, user1.password], (err, result) => {
    if(err){
        return console.log(err.message);
    }
            // 影响的行
    if(result.affectedRows == 1){
        console.log('插入数据成功');
        // 如果执行的是插入语句，result是一个对象
        console.log(result);
    }
})



// 修改
const user2 = { id: 12, username: 'zjw', password: '000' }
const sqlStr2 = 'UPDATE users SET username=? , password=? WHERE id=?'

// 当对象属性与数据库字段对应时，同样可直接传递对象
// const sqlStr2 = 'UPDATE users SET ? WHERE id=?'
// db.query(sqlStr2, [user2, user2.id], (err, result)=>{})

db.query(sqlStr2, [user2.username, user2.password, user2.id], (err, result) => {
    if(err){
        return console.log(err.message);
    }
    if(result.affectedRows == 1){
        console.log('更新数据成功');
    }
})



// 删除
const sqlStr3 = 'DELETE FROM users WHERE id=?'

            // 如果只有一个占位符可省略数组
db.query(sqlStr3, 9, (err, result) => {
    if(err){
        return console.log(err.message);
    }
    if(result.affectedRows == 1){
        console.log('删除数据成功');
    }
})

// 标记删除  (通过status表示删除状态)
const sqlStr4 = 'UPDATE users SET status=? WHERE id=?'
db.query(sqlStr4, [1, 12], (err, result) => {
    if(err){
        return console.log(err.message);
    }
    if(result.affectedRows == 1){
        console.log('删除状态修改成功');
    }
})