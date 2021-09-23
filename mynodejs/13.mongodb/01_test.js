const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true })  
                                    //若找不到数据库名 ，则会创建该数据库
        .then(() => {console.log('数据库连接成功');})
        .catch(err => {console.log(err, '数据库连接失败');})

// 在MongoDB中不需要显式的去创建数据库 ，如果使用的数据库不存在会自动创建
// 与数据库操作相关的 , 都是异步操作


// 创建集合规则
const courseSchema = new mongoose.Schema({
    name: String,          //课程名
    author: String,        //教师名
    isPublished: Boolean   //发布状态
});

// 使用规则创建集合 (返回一个构造函数)
const Course = mongoose.model('Course', courseSchema) //实际名字是courses

// 插入数据
const course = new Course({
    name: 'nodejs基础',
    author: '张三',
    isPublished: true
});
course.save();

// Course.create({name:'javascript', author:'李四', isPublished:false}, (err, result) => {
//     console.log(err);
//     console.log(result);
// });

// create方法可返回异步对象promise
Course.create({name:'javascript', author:'李四', isPublished:false})
    .then(result => {console.log(result);})
    .catch(err => {console.log(err);})


// 导入数据
// mongoimport -d 数据库名 -c集合名(表名) --file 要导入的文件路径
