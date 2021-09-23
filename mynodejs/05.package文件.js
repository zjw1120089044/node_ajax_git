// npm init  创建模块依赖描述文件package.json    (文件夹的名字必须是英文，不能有中文和空格)
// npm init -y  在创建package时将所有值设置为默认值
// npm install  会根据package.json去下载项目所需要的模块依赖 ：项目依赖(dependencies)和开发依赖(devDependencies)


// 开发依赖  只在开发阶段需要的模块依赖  
// 使用npm install 包名 --save-dev   安装包，并记录到devDependencies节点
// npm i 包名 -D   简写形式

// npm install --production  仅下载项目依赖


// package-lock.json   记录模块与模块之间的依赖关系
// 锁定包的版本 ，加快下载速度(因为其中记录了包的树状结构和下载地址)

// package 中的 scripts 存放命令的别名(针对一些名字比较长的命令)
            // 通过  npm run 别名  来执行
        // name(包名)  version(版本号)  main(包的入口)