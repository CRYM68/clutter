// ——————————时间类—————————— \\

//-\\   //-\\   //-\\   //-\\   //-\\   //-\\   //-\\   //-\\   //-\\   //-\\  //-\\   //-\\
//_————格式化时间
function formatTime() {
  var date = new Date();
  var year = date.getFullYear(); //-年
  var month = date.getMonth() + 1; //-月
  var day = date.getDate(); //-日
  var hour = date.getHours(); //-时
  var minutes = date.getMinutes(); //-分
  var second = date.getSeconds(); //-秒
  //_未到10加零
  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;
  hour = hour < 10 ? "0" + hour : hour;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  second = second < 10 ? "0" + second : second;
  var week = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六"
  ];
  var weekDay = week.find(function(e, i) {
    return date.getDay() === i;
  });
  //_-年-月-日，时：分：秒
  // return `${year}-${month}-${day}  ${hour}:${minutes}:${second} ${weekDay}`;
  return `${year}年${month}月${day}日  ${hour}:${minutes}:${second} ${weekDay}`;
}

//_————毫秒数转化为时间格式
function formatTimeMS(MS) {
  var days = Math.floor(MS / 1000 / 60 / 60 / 24);
  var hours = Math.floor((MS / 1000 / 60 / 60) % 24);
  var minutes = Math.floor((MS / 1000 / 60) % 60);
  var seconds = Math.floor((MS / 1000) % 60);
  return `${days}天${hours}时${minutes}分${seconds}秒`;
}

//_————输入日期进行倒计时
function countDown(time) {
  var now = +new Date();
  var t = Date.parse(time);
  return formatTimeMS(t - now);
}

// ——————————BON类—————————— \\

//-\\   //-\\   //-\\   //-\\   //-\\   //-\\   //-\\   //-\\   //-\\   //-\\   //-\\   //-\\
//_————获取地址栏传递data,返回对象data
function locationData() {
  var data = {};
  location.search
    .substr(1)
    .split("&")
    .forEach(function(e, i) {
      let arr = e.split("=");
      data[arr[0]] = arr[1];
    });
  return data;
}

//_——————————ajax——————————_\\

//-\\   //-\\   //-\\   //-\\   //-\\   //-\\   //-\\   //-\\   //-\\   //-\\   //-\\   //-\\
// _get和post
/**
 * @param {Object} Object
 * @example {
 *  url:请求的地址,
 *  type:请求方式,
 *
 *
 * }
 */
function ajax(Object) {
  let url = Object.url || "";
  let type = Object.type || "get";
  let obj = Object.obj || {};
  let callback = Object.callback;
  // _创建对象
  let xhr = new XMLHttpRequest();
  let data;
  for (let k in obj) {
    data = k + "=" + data[k] + "&";
  }
  // _判断！get传参方式
  if (type.toLowerCase() === "get") {
    url = "?" + data;
  }
  xhr.open(type, url);
  // _判断！post传参方式
  if (type.toLowerCase() === "post") {
    xhr.setRequestHeader("Content-Type", "application/x=wwww-form-urlencoded");
    xhr.send(data);
  } else {
    xhr.send();
  }
  // _判断请求成功，后执行函数
  ajax.xhr.onreadystatechange = function() {
    if (ajax.xhr.readyState === 4 && ajax.xhr.status === 200) {
      callback(xhr.responseText); //responseText响应信息字符串
    }
  };
}
