const express = require('express');
const app = express();

const files = require('fs');

app.get('/errtest', (req, res, next) => {
    // throw new Error('程序发生了未知错误');   //抛出错误
    files.readFile('./demo.txt', 'utf8', (err, result) => {
        if(err != null){
            next(err);       //通过调用next()方法并传入参数 ，来返回异步代码抛出的错误
        }else{
            res.send(result);
        }
    })
})

// 对于异步函数只能使用try catch方式捕获错误(错误发生后，后续代码仍能正常执行)
// try catch可捕获异步函数和同步代码的错误 ，但不能捕获其他类型API的错误
const promisify = require('util').promisify;
const readFile = promisify(files.readFile);
app.get('/try', async (req, res, next) => {
    try{
        await readFile('/demo.txt')
    }catch(ex){
        next(ex);
    }
})

app.use((err, req, res, next) => {
    res.status(500).send(err.message);   //捕获错误(只能捕获同步代码抛出的错误)
})

app.listen(3000);
console.log('网站服务器启动成功');