const express = require('express')
const app = express()


const router = require('./08.apiRouter');


// 配置解析表单数据的中间件
app.use(express.urlencoded({ extended: false }));


// jsonp解决跨域 ，为防止冲突必须写在cors之前
app.get('/api/jsonp', (req, res) => {
    const funcName = req.query.callback;
    console.log(funcName);
    const data = {
        name: '张三',
        age: 18
    }                               //对象直接用字符串拼接会变成[object,Object]
    const scriptStr = `${funcName}(${ JSON.stringify(data) })`
    
    res.send(scriptStr);
})

// 使用cors中间件解决跨域 ，必须写在路由之前
const cors = require('cors');
app.use(cors());

app.use('/api', router);


app.listen(3000, () => {
    console.log('服务器启动成功')
})