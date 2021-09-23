// 异步API无法通过返回值的方式得到结果
function getMessage(){
    setTimeout(function(){
         return 'Hello nodejs'
    }, 2000)
}
const msg = getMessage();
console.log(msg);  //undefined

// 通过回调函数拿到异步API执行的结果
function getMessage2(callback){
    setTimeout(function(){
        callback('2s到了');
    }, 2000)
}
getMessage2(function(data){
    console.log(data);
});


// callbackhell 回调地狱
const fs = require('fs');

// 当第一个文件读取完成后，会执行回调函数
// fs.readFile('12_1.txt', 'utf8', (err, result1) => {
//     console.log(result1);
//     fs.readFile('12_2.txt', 'utf8', (err, result2) => {
//         console.log(result2);
//         fs.readFile('12_3.txt', 'utf8', (err, result3) => {
//             console.log(result3);
//         })
//     })
// })
// 使用这种回调函数嵌套的方式可以完成依次调用的效果 ，但是不易维护

// ES6中提供了Promise解决回调地狱的问题    读取成功调用resolve传出参数 ，失败调用reject
let promise = new Promise((resolve, reject)=>{
    fs.readFile('12_1.txt', 'utf8', (err, result)=>{
        if(err != null){
            reject(err);
        }else{
            resolve(result);
        }
    })
})
// 获取成功调用then中的方法 ，失败调用catch中的方法
promise.then((result)=>{
    console.log(result + ' =======promise.then=========');
}).catch((err)=>{
    console.log(err);
})


// 使用Promise解决回调地狱
function readF(path){
    return new Promise((resolve, reject)=>{   //将异步代码封装为promise对象
        fs.readFile(path, 'utf8', (err, result)=>{
            if(err){
                return reject(err);
            }
            resolve(result);
        })
    });
}
const p1 = readF('./12_1.txt')
const p2 = readF('./12_2.txt')
const p3 = readF('./12_3.txt')


p1.then(r1 => {
    console.log(r1 + '  Promise解决回调地狱');
    return p2;        //返回promise对象给下一个then
}).then(r2 => {
    console.log(r2 + '  Promise解决回调地狱');
    return p3;
}).then(r3 => {
    console.log(r3 + '  Promise解决回调地狱');
}).catch(err => {
    console.log(err.message);
})


// 由于fs仅支持回调函数的形式读取文件，不支持Promise的方式
// npm install then-fs  该模块可支持Promise的方式读取文件
const thenFs = require('then-fs');

const promiseArr = [
    thenFs.readFile('./12_1.txt', 'utf8'),
    thenFs.readFile('./12_2.txt', 'utf8'),
    thenFs.readFile('./12_3.txt', 'utf8')
]

// Promise.all() 方法会发起并行的Promise异步操作，等执行完才会执行 .then()
Promise.all(promiseArr)
       .then(result => {
           console.log(result);   //输出结果是数组形式
       })
       .catch(err => {
           console.log(err.message);
       })
// Promise.race()  方法只要任何一个异步操作执行完成，就会执行 .then()   赛跑机制





// ES8中新增了异步函数async ，将异步代码写成同步形式 ，不再有回调函数嵌套 ，使代码更加清晰
// 异步函数默认返回值是promise对象，可使用其内置方法.then().catch()
// async function fn(){
//     throw '发生了错误';   //throw后的代码不会执行
//     return 123;
// }
// fn().then(data => {
//     console.log(data);
// }).catch(err => {
//     console.log(err);
// })

// 使用Promise包装异步代码 -> 在其返回的promise对象前加await -> 使用async异步函数包装await
// await只能在异步函数中使用 ，后面只能写promise对象
// 可以暂停异步函数向下执行 ，直到promise返回结果
async function fn1(){
    return 'p1';
}
async function fn2(){
    return 'p2';
}
async function fn3(){
    return 'p3';
}
async function run(){
    console.log(await fn1());   //暂停run()函数向下执行 ，直到fn1返回结果
    console.log(await fn2());
    console.log(await fn3());
}
run();



const promisify = require('util').promisify; //util模块下的promisify方法
const readFile = promisify(fs.readFile);   //包装异步API使其返回promise对象
async function run1(){
    console.log(await readFile('12_1.txt', 'utf8') + '  异步函数async'); 
    console.log(await readFile('12_2.txt', 'utf8') + '  异步函数async'); 
    console.log(await readFile('12_3.txt', 'utf8') + '  异步函数async'); 
}
run1();

// await之后的代码都会被异步执行
console.log('A');
async function test(){
    console.log('B');

    const r1 = await thenFs.readFile('./12_1.txt', 'utf8');
    console.log(r1 + '  await之后的代码');
    console.log('D' + '  await之后的代码');
}
test();
console.log('C');    //执行结果为 A B C r1 D


console.log(11);
thenFs.readFile('./12_1.txt').then(r=>{  //相当于在微任务中嵌套了宏任务readFile
    console.log(22)
    console.log(r);
})
setTimeout(()=>{
    console.log(33);
})
console.log(44);
//微任务.then需要等待宏任务readFile读写完成
// setTimeout进入宏任务队列 -> 同步结束执行微任务.then等待 r -> readFile宏任务进入队列 -> 得到 r执行.then的回调 