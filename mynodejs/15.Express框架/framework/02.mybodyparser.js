// querystring模块，用来处理查询字符串
const qs = require('querystring')


// 如果发送的数据量比较大，客户端会把数据切割，分批发送到服务器
// 因此data事件可能会被触发多次，需要手动对数据进行拼接
const bodyParser = (req, res, next) => {
    let str = '';

    req.on('data', (chunk) => {
        str += chunk;
    })

    req.on('end', () => {
        console.log(str);
        req.body = qs.parse(str);  //将查询字符串转化为JSON对象
        console.log(req.body);
        next();
    })
}

module.exports = bodyParser;