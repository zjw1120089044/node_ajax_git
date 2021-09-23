const express = require('express');
const app = express();

const path = require('path');

                // 可通过url直接访问该目录中的文件，但该目录不会出现在url中
app.use(express.static(path.join(__dirname, '06_public')))
// localhost:3000/default.html
// localhost:3000/css/base.css
// 可直接通过链接的方式访问到静态资源

app.use(express.static('./07_views'))  //如果添加了两个静态资源目录，则会按顺序查找所需文件
// app.use('/pub', express.static('./06_public'))  //挂载路径前缀 ，访问资源路径前必须加/pub

app.listen(3000);
console.log('网站服务器启动成功');