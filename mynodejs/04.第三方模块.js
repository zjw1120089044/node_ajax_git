// npm(node package manager) 第三方模块管理工具

// 在上传项目时，一定要把node_modules添加到.gitignore中


// 本地安装 ：只在该项目能使用
// npm install 模块名     模块安装
// npm i 模块名           简写形式
// npm uninstall 模块名   模块卸载

// 全局安装 ：
// npm install 模块名 -g
// 安装目录：C:\Users\皇豆\AppData\Roaming\npm


// i5ting_toc   md文档转化为html的模块
// npm i i5ting_toc -g 
// i5ting_toc -f 要转化的md文件的路径 -o

// nodemon模块  保存后可自动执行代码   ctrl + c 退出
// npm install nodemon -g

// nrm模块   npm下载地址切换工具
// npm i nrm -g   全局下载nrm模块
// nrm ls   查询下载地址列表  *表示当前的下载地址
// nrm use下载地址名称   切换npm的下载地址


// gulp模块 
// gulp.src()  获取任务要处理的文件
// gulp.dest()  输出文件
// gulp.task()  建立gulp任务
// gulp.watch()  监控文件的变化

// gulp-cli模块  gulp的命令行工具

// gulp相关插件
// gulp-htmlmin  html文件压缩
// gulp-csso  压缩css文件
// gulp-babel  javascript语法ES6转换为ES5
// gulp-less   less转css
// gulp-uglify  压缩混淆JavaScript
// gulp-file-include  公共文件包含
// browsersync  浏览器实时同步