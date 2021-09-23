const express = require('express');
const app = express();

// 网站公告
// app.use((req, res) => {
//     res.send('当前网站正在维护...');
// })


app.use('/admin', (req, res, next) => {
    let isLogin = false;
    if(isLogin){
        next();
    }else{
        res.send('您还未登录 ，请登录后再访问该页面')
    }
})
app.get('/admin', (req, res) => {
    res.send('已登录 ，欢迎访问');
})


// 自定义404页面  (注意书写位置)
app.use((req, res) => {
    res.status(404).send('您访问的页面不存在');
    //修改状态码(浏览器默认访问成功状态码为200)  可以链式调用
})

app.listen(3000);
console.log('网站服务器启动成功');