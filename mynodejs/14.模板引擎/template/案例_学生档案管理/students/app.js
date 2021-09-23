const http = require('http');
const app = http.createServer();

const template = require('art-template');
const path = require('path');
const dateformat = require('dateformat');

require('./model/connect.js');
const router = require('./route/index.js');


// 静态资源访问模块  npm install serve-static
const serveStatic = require('serve-static');
const serve = serveStatic(path.join(__dirname, 'public'));

// 配置模板根目录
template.defaults.root = path.join(__dirname, 'views');
// 给模板导入修改日期格式的方法
template.defaults.imports.dateformat = dateformat;



app.on('request', (req, res) => {
    router(req, res, () => {
        // 必填参数，不能省略
    })
    serve(req, res, () => {
        // 必填参数，不能省略
    })
});
app.listen(3000);
console.log('服务器启动成功');