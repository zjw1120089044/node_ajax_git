console.log('这是导出模块');

console.log(module);

// 通过挂载的方式导出时，exports和module.exports等价
exports.username = '张三';
const age = 20;
module.exports.userage = age;

module.exports.sayhello = (name) => {
    console.log(`Hello ${name}`);
};



// 当 module.exports和 exports指向不同对象时(不同的内存地址)，以 module.exports为准
// 之前挂载的属性也会被覆盖

// module.exports = {
//     name: '李四'
// }
// exports = {
//     age: 20
// }

// 默认情况下exports和module.exports指向同一个对象地址，若仅修改exports的地址，最终仍以module.exports为准

console.log(module);