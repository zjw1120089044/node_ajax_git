// npm install art-template   腾讯模板引擎

const template = require('art-template');
const path = require('path');


const views = path.join(__dirname, 'views', 'index.art')
// template方法是用来拼接字符串的
// 模板路径要使用绝对路径 ，要在模板中显示的数据(对象类型)
const html = template(views, {
    name: '张三',
    age: 15,
    content: '<h1>标题</h1>'
})

// 标准语法: {{数据}}
// 原始语法: <%=数据 %>
console.log(html);



const views2 = path.join(__dirname, 'views', 'index2.art')
const html2 = template(views2, {
    users: [{
        name: '张三',
        age: 20,
        sex: '男'
    },{
        name: '李四',
        age: 30,
        sex: '男'
    },{
        name: '王五',
        age: 15,
        sex: '女'
    }]
})
console.log(html2);