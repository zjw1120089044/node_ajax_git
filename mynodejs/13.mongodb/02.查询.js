const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('数据库连接成功'))
        .catch(err => console.log('数据库连接失败'))

// 导入数据
// mongoimport -d 数据库名 -c集合名(表名) --file 要导入的文件路径

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    password: String,
    hobbies: [String]  //字符串数组
});
const User = mongoose.model('User', userSchema);


// 查询表中所有数据
User.find()
    .then(result => {console.log(result); console.log('==========all===========');})

// find() 返回的结果一定是数组
User.find({_id: '5c09f267aeb04b22f8460968'})
    .then(result => {console.log(result); console.log('=========id============');})

// findone()  返回一个对象 ，默认为表中第一条数据
User.findOne()
    .then(result => {console.log(result); console.log('==========one===========');})

User.findOne({age: 25})
    .then(result => {console.log(result); console.log('==========age25===========');})

// gt大于  lt小于
User.find({age: {$gt: 20, $lt: 50}})
    .then(result => {console.log(result); console.log('=========20<age<50============');})

// in包含
User.find({hobbies: {$in: ['足球']}})
    .then(result => {console.log(result); console.log('==========in足球===========');})

// _id会被默认查询出来  通过 - 去除不想查询的字段
User.find().select('name email -_id')
    .then(result => {console.log(result); console.log('=========select============');})

User.find().sort('age')
.then(result => {console.log(result); console.log('=========sort============');})
// 降序排列
User.find().sort('-age')
    .then(result => {console.log(result); console.log('========= sort- ============');})

        // 跳过多少条数据 ，限制查询数量
User.find().skip(2).limit(2)
    .then(result => {console.log(result); console.log('=========skip limit============');})
