const fs = require('fs');

fs.readFile('./案例_成绩.txt', 'utf8', (err, datastr) => {
    if(err){
        return console.log('读取失败！' + err.message);
    }
    // console.log('读取成功'+datastr);
    const arr = datastr.split(' ');  //以空格分割字符串
    const newArr = [];
    arr.forEach(item => {
        newArr.push(item.replace('=', ': '));
    })
    const newStr = newArr.join('\r\n');
    console.log(newStr);

    fs.writeFile('./案例_成绩(已整理).txt', newStr, err => {
        if(err){
            return console.log('文件写入失败！'+err.message);
        }
        console.log('文件写入成功!');
    })
})

