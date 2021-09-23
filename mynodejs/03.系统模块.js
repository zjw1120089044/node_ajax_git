// 文件操作    f: file   s: system
const files = require('fs'); //导入模块

// 读取文件内容
files.readFile('./01.hello.js', 'utf-8', (error, doc)=>{
    // 如果文件读取出错 ，error对象将包含错误信息,doc为undefined
    // 如果读取成功 error为 null
    // doc是文件读取结果
    console.log(`错误信息：${error}`);
    console.log('=====================================');
    if(error == null){
        console.log(doc);
    }
})

// 写入文件       若不存在则会创建
files.writeFile('./test.txt', '要写入的内容', err => {
    if(err){
        console.log('文件写入失败!');
        console.log(err);
        return;
    }
    console.log('文件写入成功');
})



// 路径操作   不同系统路径分隔符不统一
const path = require('path');

const finalPath = path.join('project', 'css', 'a.css');
console.log(finalPath);

/*  在使用命令行时 ，相对路径(./或../)是相对命令行当前的工作目录
    一旦使用 node \desktop\mynodejs\01.hello.js 这种命令执行时相对路径就会失效
    因此大多使用 绝对路径 
*/

// __dirname 可获得当前文件夹的绝对路径  通过path.join()路径拼接可获得绝对路径
console.log(__dirname);
console.log(path.join(__dirname, '01.hello.js'));
            // path.join('a', '/b/c', '../', './d')    a\b\d  ../会抵消一层路径
            // 直接使用+进行字符串拼接，会无法识别./或../
// require方法中的路径就是相对当前文件的路径 ，因此可以使用相对路径


// path.basename()  获取路径最后一部分(即文件名)
const fullpath = '/a/b/c/index.html';
const fullname = path.basename(fullpath);
console.log(fullname);
const filename = path.basename(fullpath, '.html');
console.log(filename);

// path.extname() 获取文件的扩展名
const extraname = path.extname(fullpath);
console.log(extraname);
