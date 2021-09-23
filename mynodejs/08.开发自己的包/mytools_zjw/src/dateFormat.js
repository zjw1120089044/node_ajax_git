function dateFormat(date){
    const dt = new Date(date);

    const y = dt.getFullYear();
    const m = dt.getMonth() + 1;
    const d = dt.getDate();
    const h = dt.getHours();
    const mm = padZero(dt.getMinutes());
    const s = padZero(dt.getSeconds());

    return `${y}-${m}-${d} ${h}:${mm}:${s}`
}
function padZero(n){
    return n<10 ? '0'+n : n;
}


module.exports.dateFormat = dateFormat;