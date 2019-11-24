var arr = local("cartListData");
if (arr.local != 0) {
  $(".empty-tip.tc").hide();
  $(".cart-header.hidden").show();
  arr.forEach(e => {
    let html = $(`<div class="item" data-id="${e.pID}">
          <div class="row">
              <div class="cell col-1 row">
                  <div class="cell col-1">
                      <input type="checkbox" class="item-ck" ${
                        e.isChecked ? "checked" : ""
                      }>
                  </div>
                  <div class="cell col-4">
                    <img src="${e.imgSrc}" alt="">
                  </div>
                      </div>
                      <div class="cell col-4 row">
                          <div class="item-name">${e.name}</div>
                      </div>
                      <div class="cell col-1 tc lh70">
                          <span>￥</span>
                          <em class="price">${e.price}</em>
                      </div>
                      <div class="cell col-1 tc lh70">
                          <div class="item-count">
                              <a href="javascript:void(0);" class="reduce fl">-</a>
                              <input autocomplete="off" type="text" class="number fl" value="${
                                e.number
                              }">
                                  <a href="javascript:void(0);" class="add fl">+</a>
                            </div>
                          </div>
                          <div class="cell col-1 tc lh70">
                              <span>￥</span>
                              <em class="computed">${e.price * e.number}</em>
                          </div>
                          <div class="cell col-1">
                              <a href="javascript:void(0);" class="item-del">从购物车中移除</a>
                          </div>
                      </div>
                  </div>`);
    $(".item-list").append(html);
  });
  $(".total-of.hidden").show();

  //_判断全选否

  let ckall = arr.find(function(e) {
    return !e.isChecked;
  });
  if (ckall) {
    $(".pick-all").prop("checked", false);
  }
  aggregate.goods();
  aggregate.price();

  // ——页面勾选操作

  // _全选
  $(".pick-all").click(function() {
    let status = $(this).prop("checked");
    $(".pick-all").prop("checked", status);
    $(".item-ck").prop("checked", status);

    // 数据同步
    arr = local("cartListData");
    arr.forEach(function(e) {
      e.isChecked = status;
    });
    save("cartListData", arr);
    aggregate.goods();
    aggregate.price();
  });

  // _单选判全选

  $(".item-ck").click(function() {
    let status = $(".item-ck").length == $(".item-ck:checked").length;
    $(".pick-all").prop("checked", status);

    // 数据同步
    arr = local("cartListData");
    let pID = $(this)
      .parents(".item")
      .attr("data-id");
    arr.forEach(e => {
      if (e.pID === pID) {
        e.isChecked = $(this).prop("checked");
      }
    });
    aggregate.goods();
    aggregate.price();
  });
}

//单件物品数量加减

//减
$(".reduce.fl").click(function() {
  let n = $(this)[0].nextElementSibling.value;
  n--;
  $(this)[0].nextElementSibling.value = n;
  $(this)
    .parents(".item")
    .find("em.computed")
    .text(
      n *
        parseInt(
          $(this)
            .parents(".item")
            .find("em.price")
            .text()
        )
    );

  //数据同步
  aggregate.goods();
  aggregate.price();
  arr = local("cartListData");
  let pID = $(this)
    .parents(".item")
    .attr("data-id");
  arr.forEach(function(e, i) {
    if (e.pID == pID) {
      e.number = n;
    }
  });
  save("cartListData", arr);
});

//加
$(".add.fl").click(function() {
  let n = $(this)[0].previousElementSibling.value;
  n++;
  $(this)[0].previousElementSibling.value = n;
  $(this)
    .parents(".item")
    .find("em.computed")
    .text(
      n *
        parseInt(
          $(this)
            .parents(".item")
            .find("em.price")
            .text()
        )
    );
  aggregate.goods();
  aggregate.price();
  arr = local("cartListData");
  let pID = $(this)
    .parents(".item")
    .attr("data-id");
  arr.forEach(function(e, i) {
    if (e.pID == pID) {
      e.number = n;
    }
  });
  save("cartListData", arr);
});

//_输入数目
var amount;
$(".number.fl").focus(function() {
  amount = $(this).val();
});
$(".number.fl").blur(function() {
  let n = this.value;
  if (n.trim().length === 0 || isNaN(n) || parseInt(n) <= 0) {
    alert("error");
    this.value = amount;
  }
  aggregate.goods();
  aggregate.price();
  arr = local("cartListData");
  let pID = $(this)
    .parents(".item")
    .attr("data-id");
  arr.forEach(e => {
    if (e.pID == pID) {
      e.number = this.value;
    }
  });
  save("cartListData", arr);
});
