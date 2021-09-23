const mongoose = require('mongoose');

const Student = mongoose.model('Student', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 10
    },
    age: {
        type: Number,
        min: 10,
        max: 60
    },
    sex: {
        type: String,
        // enum: ['男', '女']
    },
    email: String,
    hobbies: [String],
    collage: String,
    enterDate: {
        type: Date,
        default: Date.now
    }
}));

module.exports = Student;