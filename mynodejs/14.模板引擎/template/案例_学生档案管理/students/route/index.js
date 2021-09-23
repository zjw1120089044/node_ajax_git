// 路由模块  npm install router
const getRouter = require('router');
const router = getRouter();

const querystring = require('querystring');
const template = require('art-template');


const Student = require('../model/user.js');

// 使用GET方式请求add时 ，执行该路由 (呈递页面)
router.get('/add', (req, res) => {
    let html = template('index.art', {});
    res.end(html);
})
router.get('/list', async (req, res) => {
    let students = await Student.find()
    let html = template('list.art', {
        students: students
    });
    res.end(html);
})

// 实现添加功能的路由
router.post('/add', (req, res) => {
    let formData = '';
    req.on('data', param => {
        formData += param;
    })
    req.on('end', async () => {
        await Student.create(querystring.parse(formData));
        res.writeHead(301, {
            Location: '/list'
        })
        res.end();
    })
})

module.exports = router;