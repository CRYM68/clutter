// _路由
const urlModel = require('url');
const fs = require('fs');
const Ctrl = require('./controlle');

module.exports = function (req, res) {
    let method = req.method;
    let url = req.url;
    let pathname = urlModel.parse(url).pathname;
    req.id = urlModel.parse(req.url, true).query.id;


    // _首页加载
    if (method === "GET" && pathname === '/index.html') {
        Ctrl.indexPage(req, res);
    }
    // _添加页加载
    else if (method === "GET" && pathname === "/add.html") {
        Ctrl.addPage(req, res);
    }
    // _编辑页加载
    else if (method === "GET" && pathname === "/edit.html") {
        Ctrl.editPage(req, res);
    }

    // _详情页加载
    else if (method === "GET" && pathname === "/info.html") {
        Ctrl.infoPage(req, res);
    }
    // _添加hero
    else if (method === 'POST' && pathname === '/addHero') {
        Ctrl.addHero(req, res);
    }
    // _修改hero
    else if (method === 'POST' && pathname === '/editHero') {
        Ctrl.editHero(req, res);
    }
    // _删除hero
    else if (method === 'GET' && pathname === '/removeHero') {
        Ctrl.removeHero(req, res);
    }
    // _资源加载
    else if (method === "GET" && pathname.startsWith('/node_modules')) {
        fs.readFile('.' + pathname, function (err, data) {
            if (err) return console.log(err.message);
            res.end(data);
        })
    } else {
        res.end("404");
    }
}