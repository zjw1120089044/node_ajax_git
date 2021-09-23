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


User.findOneAndDelete({_id: '5c09f2d9aeb04b22f846096b'})
    .then(result => {console.log(result); console.log('============删除一条============');})

// 若传入的对象为空 ，则会删除所有
User.deleteMany({password: '123456'})
    .then(result => {console.log(result); console.log('============删除多条============');})
// 返回结果 {n:删除了几条数据 ，ok:1 删除成功}