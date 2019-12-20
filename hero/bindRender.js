// _引入模板
const template = require('art-template');
const path = require('path');
// _将渲染方法挂载在res里
module.exports = function (res) {
    res.render = function (url, obj) {
        let html = template(path.join(__dirname, './views/' + url), obj);
        res.end(html);
    }
};