function locationData() {
  var r = location.search;
  let data = {};
  r = r.substr(1).split("&");
  r.forEach(e => {
    let arr = e.split("=");
    data[arr[0]] = arr[1];
  });
  return data;
}

// ——存取本地

function local(key) {
  var data = JSON.parse(localStorage.getItem(key)) || [];
  return data;
}
function save(key, data) {
  var d = JSON.stringify(data);
  localStorage.setItem(key, d);
}

// ——总计算

// _物品总数量
var aggregate = {
  //_总量
  goods: function() {
    let number = 0;
    $(".item-ck:checked")
      .parents(".item")
      .each(function(i, e) {
        let s = $(e)
          .find(".number.fl")
          .val();
        number += parseInt(s);
      });
    $("span.selected").text(number);
  },

  //_总价
  price: function() {
    let price = 0;
    $(".item-ck:checked")
      .parents(".item")
      .each(function(i, e) {
        let s = $(e)
          .find("em.computed")
          .text();
        price += parseInt(s);
      });
    $("span.total-money").text(price);
  }
};
