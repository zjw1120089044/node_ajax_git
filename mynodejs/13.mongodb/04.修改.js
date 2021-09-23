const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('数据库连接成功'))
        .catch(err => console.log('数据库连接失败'))

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    password: String,
    hobbies: [String]
});
const User = mongoose.model('User', userSchema);

User.updateOne({name: '李四'}, {name: '李一'})
    .then(result => {console.log(result); console.log('=========更新单个=============');})

User.updateMany({}, {password: 123})
    .then(result => {console.log(result); console.log('=========更新多个=============');})
// 返回结果  n:表示受影响的数据  Modified:表示修改了几条数据   ok:1 表示语句执行成功