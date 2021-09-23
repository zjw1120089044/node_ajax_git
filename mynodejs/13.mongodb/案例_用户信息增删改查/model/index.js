const mongoose = require('mongoose');
// 27017为数据库默认端口 ，可省略
mongoose.connect('mongodb://localhost:27017/mydb', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('数据库连接成功'))
        .catch(err => console.log('数据库连接失败'))