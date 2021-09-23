// 模板继承
const template = require('art-template');
const path = require('path');


const views = path.join(__dirname, 'views', 'index3.art')

const html = template(views, {
    message: '主体内容部分'
})

console.log(html);