// _控制器
const fs = require("fs");
const modelData = require("./modelData");
const query = require('querystring');

module.exports = {
    // _首页加载
    indexPage: function (req, res) {
        modelData.getHeroData(function (arr) {
            res.render('index.html', {
                data: arr,
            });
        })
    },
    // _add页面加载
    addPage: function (req, res) {
        fs.readFile("./views/add.html", function (err, data) {
            if (err) return console.log(err.message);
            res.end(data);
        });
    },

    // _edit页面加载
    editPage: function (req, res) {
        modelData.getIdHero(req.id, function (idata) {
            res.render("edit.html", idata);
        });
    },

    // _info页面加载
    infoPage: function (req, res) {
        modelData.getIdHero(req.id, function (idata) {
            res.render("info.html", idata);
        });
    },
    // _添加英雄数据
    addHero: function (req, res) {
        let post = '';
        req.on('data', function (chunk) {
            post += chunk;
        });
        req.on('end', function () {
            let addHeroData = query.parse(post);
            modelData.getHeroData(function (data) {
                addHeroData.id = data.length + 1;
                data.push(addHeroData);
                modelData.writeFile(data, function (err) {
                    if (err) return console.log(err);
                    res.end('添加成功');
                })
            })
        })
    },

    // _修改已有英雄数据数据
    editHero: function (req, res) {
        let post = '';
        req.on('data', function (chunk) {
            post += chunk;
        });
        req.on('end', function () {
            let editHeroData = query.parse(post);
            modelData.getIdHero(req.id, function (idata, i) {
                editHeroData.id = idata.id;
                modelData.getHeroData(function (data) {
                    data.splice(i, 1, editHeroData);
                    modelData.writeFile(data, function (err) {
                        if (err) return console.log(err);
                        res.end('修改成功');
                    })
                });
            })

        })
    },

    // _删除
    removeHero: function (req, res) {

        modelData.getIdHero(req.id, function (idata, i) {
            modelData.getHeroData(function (data) {
                data.splice(i, 1);
                // fs.writeFile('./hero.json', JSON.stringify(data), function (err) {
                //     
                // })
                modelData.writeFile(data, function (err) {
                    if (err) return console.log(err);
                    res.end('删除成功');
                })
            })
        })
    }
};