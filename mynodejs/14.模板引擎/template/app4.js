// 模板引擎配置

// 日期格式化模块   npm install dateformat
const template = require('art-template');
const path = require('path');
const dateformat = require('dateformat');

// const views = path.join(__dirname, 'views', 'index4.art');
// 设置模板根目录
template.defaults.root = path.join(__dirname, 'views');
// 设置模板的默认后缀
template.defaults.extname = '.art'

// 导入模板变量  template.defaults.imports.变量名 = 变量值
template.defaults.imports.dateformat = dateformat;

const html = template('index4', {
    time: new Date()
});

console.log(html);