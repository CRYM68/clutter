// _引入模块
const fs = require('fs');

// _ 数据操作
module.exports = {
    // _获取所有数据，进行操作
    getHeroData: function (fn) {
        fs.readFile('./hero.json', function (err, data) {
            if (err) return console.log(err.message);
            let heroAll = JSON.parse(data);
            if (fn) fn(heroAll);
        })
    },

    // _根据id查找英雄数据，进行相应操作
    getIdHero: function (id, fn) {
        this.getHeroData(function (data) {
            data.forEach((e, i) => {
                if (id == e.id) {
                    if (fn) fn(e, i);
                }
            });
        })
    },

    // _重写json
    writeFile: function (data, fn) {
        fs.writeFile('./hero.json', JSON.stringify(data), fn)
    }
};