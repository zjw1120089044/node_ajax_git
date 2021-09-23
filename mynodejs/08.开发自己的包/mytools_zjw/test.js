const mytools = require('../mytools_zjw');   //默认会通过package中的main入口去查找
// const datestr = require('./index');

const date = mytools.dateFormat(new Date());

console.log(date);



const htmlstr = '<h1>这是h1标签</h1>';
const str = mytools.htmlEscape(htmlstr);
console.log(str);
const str2 = mytools.htmlUnEscape(str);
console.log(str2);


// 发布包之前必须用 nrm use npm 切换包路径
// npm login
// npm publish

// 删除已发布的包(72小时以内发布的包，删除后24小时内不允许重复发布)
// npm unpublish 包名 --force