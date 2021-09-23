const http = require('http');
const server = http.createServer();

const fs = require('fs');
const path = require('path');


server.on('request', (req, res) => {
    const url = req.url;
    let filepath = '';

    if(url == '/'){
        filepath = path.join(__dirname, './clock/index.html');
    }else{
        filepath = path.join(__dirname, './clock', url);
    }

    fs.readFile(filepath, 'utf8', (err, datastr) => {
        if(err){
            return res.end('404 Not Found');
        } 
        res.end(datastr);
    })
})

server.listen(80, () => {
    console.log('服务器启动成功');
})