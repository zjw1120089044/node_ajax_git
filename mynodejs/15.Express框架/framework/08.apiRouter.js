const express = require('express');
const router = express.Router();


router.get('/get', (req, res) => {
    console.log(req.query);
    const query = req.query;
    res.send({
        status: 0,
        msg: 'GET请求成功',
        data: query
    })
})

router.post('/post', (req, res) => {
    console.log(req.body);
    const body = req.body;
    res.send({
        status: 0,
        msg: 'POST请求成功',
        data: body
    })
})

router.delete('/delete', (req, res) => {
    res.send({
        status: 0,
        msg: 'DELETE请求成功'
    })
})

module.exports = router;