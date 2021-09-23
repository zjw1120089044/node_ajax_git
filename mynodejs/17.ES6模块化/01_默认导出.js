// 默认导出
let n1 = 10;
let n2 = 20;
function show(){}

export default {
    n1,
    show
}



// 按需导出
export let s1 = 'aaa';
export let s2 = 'bbb';
export function say(){}