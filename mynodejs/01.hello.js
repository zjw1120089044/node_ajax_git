var a = 'Hello world!'
console.log(a);

if(1){
    console.log('Tab可自动补全文件名');
}

// 浏览器中包含渲染引擎和js解析引擎
// 浏览器是js的前端运行环境，nodejs是js的后端运行环境
// nodejs无法调用DOM，BOM和浏览器内置API
console.log('nodejs由ECMA和nodeAPI组成，是基于Chrome V8引擎的js运行环境');

global.console.log('Nodejs中的全局对象是global');  //浏览器中的是window
global.setTimeout(function(){
    console.log('3秒到了');
}, 3000);

/* global的方法：
        console.log()
        setTimeout()
        clearTimeout()
        setInterval()
        clearInterval()
*/

