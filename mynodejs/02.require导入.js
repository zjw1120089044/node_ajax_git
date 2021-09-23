console.log('这是导入模块');

const a = require('./02.exports导出.js');  //require会执行导出的js，返回值默认为exports的值


// 模块作用域(避免了变量污染)：在模块内部定义的变量成员，无法被其他模块访问(没有exports的情况)


// console.log(a.sayhello('李四'));

console.log(a);