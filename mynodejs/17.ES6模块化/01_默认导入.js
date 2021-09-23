// 默认导入
// import obj from './01_默认导出.js'
// console.log(obj);



// 按需导入
import info, { s1, s2 as str2, say } from "./01_默认导出.js";  
console.log(s1);
console.log(str2);
console.log(say);

console.log(info);


// import './01.ES6模块化规范.js';