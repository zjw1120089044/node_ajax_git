const mongoose = require('mongoose');  //js缓存机制 ，第二次引入模块不会造成浪费

const User = mongoose.model('User', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    age: {
        type: Number,
        min: 18,
        max: 80
    },
    password: String,
    email: String,
    hobbies: [String]
}))

module.exports = User;