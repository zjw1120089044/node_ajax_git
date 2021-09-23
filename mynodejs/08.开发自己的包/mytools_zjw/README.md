## 安装
```
npm install mytools_zjw
```

## 导入
```js
const mytools = require('mytools_zjw')
```

## 格式化时间
```js
const date = mytools.dateFormat(new Date());
console.log(date);
```


## 转义特殊字符
```js
const htmlstr = '<h1 title="aaa">这是h1标签</h1>';
const str = mytools.htmlEscape(htmlstr);
console.log(str);
```

## 还原特殊字符
```js
const str2 = mytools.htmlUnEscape(str);
console.log(str2);
```


## 开源协议
ISC
