// 解析表单数据

const express = require('express')
const app = express()

// 导入自己封装的中间件模块
const bodyParser = require('./02.mybodyparser')


app.use(bodyParser)

app.post('/add', (req, res) => {
    res.send(req.body);
})

app.listen(3000, () => {
    console.log('服务器启动成功')
})