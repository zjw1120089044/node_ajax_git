const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test2', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('数据库连接成功'))
        .catch(err => console.log('数据库连接失败'))

const User = mongoose.model('User', new mongoose.Schema({
    name: {
        type:String,
        required: true
    }
}));

const Post = mongoose.model('Post', new mongoose.Schema({
    title: {
        type: String
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,    //MongoDB规定的id字段的数据类型
        ref: 'User'
    }
}));

// User.create({name: '张三'})
//     .then(result => {console.log(result);})

// Post.create({title: 'abc', author: '611262ab1cf4e212405e872c'})
//     .then(result => {console.log(result);})

Post.find().populate('author')
    .then(result => {console.log(result);})