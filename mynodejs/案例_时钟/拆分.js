const fs = require('fs');
const path = require('path');

                // 匹配style中的任意字符
const regStyle = /<style>[\s\S]{0,}<\/style>/
const regScript = /<script>[\s\S]{0,}<\/script>/

fs.readFile(path.join(__dirname, '/index.html'), 'utf8', (err, datastr) => {
    if(err){
        return console.log('读取文件失败！'+err.message);
    }
    resoveCss(datastr);
    resoveJs(datastr);
    resoveHtml(datastr);
})

// 处理css代码
function resoveCss(htmlstr){
    const cssStr = regStyle.exec(htmlstr);
    // console.log(cssStr);

    const newCss = cssStr[0].replace('<style>', '').replace('</style>', '');

    fs.writeFile(path.join(__dirname, '/clock/index.css'), newCss, err => {
        if(err){
            return console.log('写入css失败！'+err.message);
        }
        console.log('写入css成功！');
    })
}

// 处理js代码
function resoveJs(htmlstr){
    const jsStr = regScript.exec(htmlstr);
    
    const newJs = jsStr[0].replace('<script>', '').replace('</script>', '');

    fs.writeFile(path.join(__dirname, '/clock/index.js'), newJs, err => {
        if(err){
            return console.log('写入js失败！'+err.message);
        }
        console.log('写入js成功！');
    })
}

// 处理html代码
function resoveHtml(htmlstr){
    const newHtml = htmlstr.replace(regStyle, '<link rel="stylesheet" href="./index.css"></link>')
                           .replace(regScript, '<script src="./index.js"></script>')
    fs.writeFile(path.join(__dirname, './clock/index.html'), newHtml, err => {
        if(err){
            return console.log('写入html失败！'+err.message);
        }
        console.log('写入html成功!');
    })
}