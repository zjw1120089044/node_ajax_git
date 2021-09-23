// 包入口文件

const date = require('./src/dateFormat');
const excape = require('./src/htmlEscape'); 

module.exports = {
    ...date,
    ...excape
}