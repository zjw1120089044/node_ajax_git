// 在package.json中手动添加 "type":"module" 来启用ES6模块化语法，不写默认type值为commonjs

// export default 默认导出
// 每个模块中只允许使用一次export default，否则会报错
let n1 = 10;
let n2 = 20;
function show(){}

export default {
    n1,
    show
}

// import obj from './01_默认导出.js'
// console.log(obj);



// 按需导出
export let s1 = 'aaa';
export let s2 = 'bbb';
export function say(){}

// 按需导入  变量名必须保持一致，可使用as重命名
// 可与默认导出搭配使用(默认导出必须放在前面)
import obj, { s1, s2 as str2, say } from "./01.ES6模块化规范";  
console.log(s1);
console.log(str2);
console.log(say);

console.log(obj);

// import * as obj  from './01_默认导出'
// *表示导入所有


// 只运行，而不导入成员，直接使用 import '文件路径' 即可
for(let i = 0; i<5; i++){
    console.log(i);
}