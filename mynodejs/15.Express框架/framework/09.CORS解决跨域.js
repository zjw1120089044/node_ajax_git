// npm install cors

// CORS由一系列http响应头组成，这些响应头决定浏览器是否阻止js代码跨域获取资源
// CORS只需要在服务器端配置即可
// CORS存在兼容性，只有支持XHR level2的浏览器才能开启
// CORS存在缓存，在浏览器使用ctrl+shift+delete清除缓存

/*  CORS响应头：
        Access-Control-Allow-Origin    只允许某个域名的请求
           res.setHeader('Accesss-Control-Allow-Origin', 'http://localhost')
        允许所有域名的请求
           res.setHeader('Accesss-Control-Allow-Origin', '*')

        Access-Control-Allow-Header
           默认情况下，CORS仅支持客户端向服务端发送如下9个请求头：
           Accept, Accept-Language, Content-Language, DPR, Downlink, Save-Data, 
           Viewport-Width, Width, Content-Type(值仅限于text/plain, multipart/form-data, application/x-www-form-urlencoded)

           若客户端发送了其他请求头信息，需要额外进行声明，否则请求会失败 (多个请求头用逗号分割)
           res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Custom-Header')

        Access-Control-Allow-Methods
           默认情况，CORS仅支持GET，POST，HEAD请求
                                只允许GET,POST,HEAD,PUT,DELETE方式的请求
           res.setHeader('Access-Control-Allow-Methods', 'GET,POST,HEAD,PUT,DELETE')
           允许所有方式的请求
           res.SetHeader('Access-Control-Allow-Methods', '*')
*/

/*  CORS请求分为两类：
        简单请求：请求方式为GET,POST或HEAD，并且请求头为默认的9种，无自定义请求头

        只要不满足以上任意一个条件，或者发送了application/json格式的数据，都需要进行预检请求
        预检请求：浏览器与服务器正式通信前，浏览器会先发送OPTION请求进行预检测，以获知服务器是否
                允许该实际请求，该OPTION请求被称为预检请求。
                服务器成功响应预检请求后才会发送真正的请求，并携带数据(因此会发生两次请求)

*/