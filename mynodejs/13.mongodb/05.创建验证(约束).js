const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('数据库连接成功'))
        .catch(err => console.log('数据库连接失败'))

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, '请传入文章标题'],   //非空约束(必须传入数据)  , 返回错误信息
        minlength: [2, '标题长度不能小于2'],
        maxlength: 5,
        trim: true    //去除两端所有空格
    },
    age: {
        type: Number,
        min: 18,        //数字型最小值
        max: 100        //数字型最大值
    },
    publishDate: {
        type: Date,
        default: Date.now       //默认值
    },
    category: {
        type: String,
        enum: {
            values: ['html', 'css', 'javascript', 'nodejs'],  //枚举 当前字段可传入的值
            message: '分类名称不在范围内'
        }
    },
    author: {
        type: String,
        validate: {    //自定义验证器
            validator: v => {
                //v 要验证的值
                //返回布尔值
                return v && v.length > 4
            },
            message: '传入的值不符合验证规则'
        }
    }
});
const Post = mongoose.model('Post', postSchema);

Post.create({title: 'a', age: 20, category: 'java', author: 'ccc'})
    .then(result => console.log(result))  //ValidationError 验证错误
    .catch(err => {
        // 获取错误信息对象
        const errs = err.errors;
        // 循环输出错误信息
        for(var attr in errs){
            console.log(errs[attr]['message']);
        }
    })