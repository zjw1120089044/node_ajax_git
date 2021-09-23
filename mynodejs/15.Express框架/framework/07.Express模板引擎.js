// npm install art-template express-art-template
const express = require('express');
const app = express();

const path = require('path');


                    // 使用的模板引擎
app.engine('art', require('express-art-template'))
//     固定的配置项 ， 模板存放的位置
app.set('views', path.join(__dirname, '07_views'))
                    // 默认的后缀
app.set('view engine', 'art')


// 设置公共属性 ，所有模板都可获取到
app.locals.users = [{
    name: '张三',
    age: 20
},{
    name: '李四',
    age: 18
}]

app.get('/index', (req, res) => {
    // 拼接了模板的路径和后缀 ，将结果响应给客户端
    res.render('index.art', {
        msg: 'index page'
    })
})

app.get('/list', (req, res) => {
    res.render('list', {
        msg: 'list page'
    })
})

app.listen(3000);
console.log('服务器启动成功');