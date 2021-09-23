const http = require('http');
const app = http.createServer();
const querystring = require('querystring');

require('./model/index.js');
const User = require('./model/user.js');


app.on('request', async (req, res) => {
    const method = req.method;
    const myurl = new URL(req.url, 'http://localhost:3000');
    let pathname = myurl.pathname;
    let query = myurl.searchParams;
    // console.log(query.get('id'));

    if(method == 'GET'){
        if(pathname == '/list'){  //返回列表页

            // 查询所有user信息
            let users = await User.find();
            console.log(users);

            let list = `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>用户列表</title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
            </head>
            <body>
                <div class="container">
                    <h6>
                        <a href="/add" class="btn btn-primary">添加用户</a>
                    </h6>
                    <table class="table table-striped table-bordered">
                        <tr>
                            <td>用户名</td>
                            <td>年龄</td>
                            <td>爱好</td>
                            <td>邮箱</td>
                            <td>操作</td>
                        </tr>`

            users.forEach(item => {
                list += `
                    <tr>
                        <td>${item.name}</td>
                        <td>${item.age}</td>
                        <td>`
                
                item.hobbies.forEach(item => {
                    list += `<span>${item}</span> `
                })
                            
                list +=`</td>
                        <td>${item.email}</td>
                        <td>
                            <a href="/delete?id=${item._id}" class="btn btn-danger btn-xs">删除</a>
                            <a href="/update?id=${item._id}" class="btn btn-success btn-xs">修改</a>
                        </td>
                    </tr>`       
            })

            list += `
                </table>
            </div>
            </body>
            </html>`

            res.end(list);
        }else if(pathname == '/add'){
            let add = `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>用户列表</title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
            </head>
            <body>
                <div class="container">
                    <h3>添加用户</h3>
                    <form method="post" action="/add">
                      <div class="form-group">
                        <label>用户名</label>
                        <input name="name" type="text" class="form-control" placeholder="请填写用户名">
                      </div>
                      <div class="form-group">
                        <label>密码</label>
                        <input name="password" type="password" class="form-control" placeholder="请输入密码">
                      </div>
                      <div class="form-group">
                        <label>年龄</label>
                        <input name="age" type="text" class="form-control" placeholder="请填写邮箱">
                      </div>
                      <div class="form-group">
                        <label>邮箱</label>
                        <input name="email" type="email" class="form-control" placeholder="请填写邮箱">
                      </div>
                      <div class="form-group">
                        <label>请选择爱好</label>
                        <div>
                            <label class="checkbox-inline">
                              <input name="hobbies" type="checkbox" value="足球"> 足球
                            </label>
                            <label class="checkbox-inline">
                              <input name="hobbies" type="checkbox" value="篮球"> 篮球
                            </label>
                            <label class="checkbox-inline">
                              <input name="hobbies" type="checkbox" value="橄榄球"> 橄榄球
                            </label>
                            <label class="checkbox-inline">
                              <input name="hobbies" type="checkbox" value="敲代码"> 敲代码
                            </label>
                            <label class="checkbox-inline">
                              <input name="hobbies" type="checkbox" value="抽烟"> 抽烟
                            </label>
                            <label class="checkbox-inline">
                              <input name="hobbies" type="checkbox" value="喝酒"> 喝酒
                            </label>
                            <label class="checkbox-inline">
                              <input name="hobbies" type="checkbox" value="烫头"> 烫头
                            </label>
                        </div>
                      </div>
                      <button type="submit" class="btn btn-primary">确认添加</button>
                    </form>
                </div>
            </body>
            </html>`;
            res.end(add);
        }else if(pathname == '/update'){
            let user = await User.findOne({_id: query.get('id')})  //返回结果要变为对象类型 ，因此使用findone
            let hobbies = ['足球', '篮球', '橄榄球', '敲代码', '抽烟', '喝酒', '烫头', '吃饭', '睡觉', '打豆豆']

            let update = `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>修改用户</title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
            </head>
            <body>
                <div class="container">
                    <h3>修改用户</h3>
                    <form method="post" action="/update?id=${user._id}">
                      <div class="form-group">
                        <label>用户名</label>
                        <input name="name" value="${user.name}" type="text" class="form-control" placeholder="请填写用户名">
                      </div>
                      <div class="form-group">
                        <label>密码</label>
                        <input name="password" value="${user.password}" type="password" class="form-control" placeholder="请输入密码">
                      </div>
                      <div class="form-group">
                        <label>年龄</label>
                        <input name="age" value="${user.age}" type="text" class="form-control" placeholder="请填写邮箱">
                      </div>
                      <div class="form-group">
                        <label>邮箱</label>
                        <input name="email" value="${user.email}" type="email" class="form-control" placeholder="请填写邮箱">
                      </div>
                      <div class="form-group">
                        <label>请选择爱好</label>
                        <div>`

            hobbies.forEach(item => {
                            // 判断item是否包含在user的hobbies[]中
                let isHobby = user.hobbies.includes(item);
                if(isHobby){
                    update += `
                        <label class="checkbox-inline">
                            <input name="hobbies" type="checkbox" value="${item}" checked> ${item}
                        </label>`
                }else{
                    update += `
                        <label class="checkbox-inline">
                            <input name="hobbies" type="checkbox" value="${item}"> ${item}
                        </label>`
                }
            })

            update += `</div>
                      </div>
                      <button type="submit" class="btn btn-primary">确认修改</button>
                    </form>
                </div>
            </body>
            </html>`;
                        
            res.end(update);
        }else if(pathname == '/delete'){
            await User.findOneAndDelete({_id: query.get('id')});
            res.writeHead(301, {
                Location: '/list'
            });
            res.end();
        }
    }else if(method == 'POST'){
        if(pathname == '/add'){
            let formData = '';
            req.on('data', param => {
                formData += param;
            })
            req.on('end', async() => {  //async 只能作用在最外层的孩子上
                let user = querystring.parse(formData);
                await User.create(user);

                // 301表示重定向
                res.writeHead(301, {
                    Location: '/list'
                })
                res.end();
            })
        }else if(pathname == '/update'){
            let formData = '';
            req.on('data', param => {
                formData += param;
            })
            req.on('end', async() => {  
                let user = querystring.parse(formData);
                await User.updateOne({_id: query.get('id')}, user);

                res.writeHead(301, {
                    Location: '/list'
                })
                res.end();
            })
        }
    }
})

app.listen(3000);