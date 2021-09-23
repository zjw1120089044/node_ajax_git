const db = require('../db/index');

const bcrypt = require('bcryptjs');


// 获取用户基本信息
exports.getUserInfo = (req, res) => {
                            // 剔除密码
    const sql = 'SELECT id,username,nickname,email,user_pic FROM ev_users WHERE id=?'
    db.query(sql, req.user.id, (err, results) => {
        if(err){
            return res.cc(err);
        }
        if(results.length != 1){
            return res.cc('获取用户信息失败!')
        }

        res.send({
            status: 0,
            message: '获取用户数据成功',
            data: results[0]
        })
    })
}

// 修改用户信息
exports.updateUserInfo = (req, res) => {
    const sql = 'UPDATE ev_users SET ? WHERE id=?'
    db.query(sql, [req.body, req.body.id], (err, result) => {
        if(err){
            return res.cc(err);
        }
        if(result.affectedRows != 1){
            return res.cc('更新用户信息失败！');
        }

        res.cc('更新用户信息成功！', 0);
    })
}

// 修改用户密码
exports.updatePassword = (req, res) => {
    const sql = 'SELECT * FROM ev_users WHERE id=?'
    db.query(sql, req.user.id, (err, results) => {
        if(err){
            return res.cc(err);
        }
        if(results.length != 1){
            return res.cc('用户不存在')
        }

        // 判断密码是否正确
        const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password);
        if(!compareResult){
            return res.cc('旧密码错误')
        }


        const sql = 'UPDATE ev_users SET password=? WHERE id=?'
        const newPwd = bcrypt.hashSync(req.body.newPwd, 10);
        db.query(sql, [newPwd, req.user.id], (err, result) => {
            if(err){
                return res.cc(err);
            }
            if(result.affectedRows != 1){
                return res.cc('更新密码失败')
            }

            res.cc('更新密码成功', 0);
        })

    })
}

// 修改头像
exports.updateAvatar = (req, res) => {
    const sql = 'UPDATE ev_users SET user_pic=? WHERE id=?'
    db.query(sql, [req.body.avatar, req.user.id], (err, result) => {
        if(err){
            return res.cc(err)
        }
        if(result.affectedRows != 1){
            return res.cc('更新头像失败');
        }

        res.cc('更新头像成功', 0);
    })
}