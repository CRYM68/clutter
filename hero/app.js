// _引入 模板
const http = require("http");
const br = require('./bindRender');
const router = require('./router');

// _创建服务器
const app = http.createServer();
// _监听端口
app.listen(8080, () => {
    console.log("server is running at http://127.0.0.1:8080");
});
// _注册事件监听用户请求

app.on("request", function (req, res) {
    br(res);
    router(req, res);
});