// 防止用户输入html标签
function htmlEscape(htmlstr){
    return htmlstr.replace(/<|>|"|&/g, (match) => {
        switch(match){
            case '<':
                return '&lt;'
            case '>':
                return '&gt;'
            case '"':
                return '&quot;'
            case '&':
                return '&amp;'
        }
    })
}
function htmlUnEscape(htmlstr){
    return htmlstr.replace(/&lt;|&gt;|&quot;|&amp;/g, (match) => {
        switch(match){
            case '&lt;':
                return '<'
            case '&gt;':
                return '>'
            case '&quot;':
                return '"'
            case '&amp;':
                return '&'
        }
    })
}



module.exports.htmlEscape = htmlEscape;
module.exports.htmlUnEscape = htmlUnEscape;