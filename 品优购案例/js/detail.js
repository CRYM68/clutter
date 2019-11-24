var data = locationData();
var target = phoneData.find(function(e) {
  return data.id == e.pID;
});

$("div.summary-price em").text(`￥${target.price}`);
$(".preview-img img").attr("src", `${target.imgSrc}`);
$(".sku-name").html(`${target.name}`);

//parting line------------------------
$(".addshopcar").on("click", function() {
  let number = $(".choose-number").val();
  if (number.trim().length === 0 || isNaN(number) || parseInt(number) <= 0) {
    alert("error");
    return;
  }

  let arr = local("cartListData");
  let exist = arr.find(e => {
    return e.pID == data.id;
  });
  console.log(data.id);

  console.log(exist);

  number = parseInt(number);
  if (exist) {
    exist.number += number;
  } else {
    let obj = {
      pID: target.pID,
      isChecked: true,
      imgSrc: target.imgSrc,
      name: target.name,
      price: target.price,
      number: number
    };
    arr.push(obj);
  }

  save("cartListData", arr);
  console.log(arr);
});
