//_————毫秒数转化为时间格式,
function formatTimeMS(MS) {
    let s = MS / 1000;
    years = Math.floor(s / 60 / 60 / 24 / 365);
    days = Math.floor((s / 60 / 60 / 24) % 365);
    hours = Math.floor((s / 60 / 60) % 24);
    minutes = Math.floor((s / 60) % 60);
    seconds = Math.floor(s % 60);
    return `${years}年${days}天${hours}时${minutes}分${seconds}秒`;
}
//_————输入日期进行倒计时
function countDown(time, id) {
    let t;
    if (/^\d{4}[-]\d{2}[-]\d{2}$/.test(time))
        t = Date.parse(time) - 8 * 60 * 60 * 1000;
    else
        t = Date.parse(time);
    let MS = t - +new Date();
    if (MS <= 0) {
        data.find(function (e) {
            return e.id === id
        }).state = '已结束';
        return formatTimeMS(0)
    } else
        return formatTimeMS(MS)

}
// - list数据渲染
function render() {
    nowRender();
    let html = '';
    data.forEach(e => {
        html +=
            `
            <tr>
                <td>${e.name}</td>
                <td>${e.time}</td>
                <td>${countDown(e.time,e.id)}</td>
                <td><button name="state" data-id=${e.id} ${e.state==='已结束'? 'disabled':''}>${e.state}</button></td>
            </tr>
             `
    });
    list.innerHTML = html;
}
//now渲染
function nowRender() {
    let nowObj = data.find(function (e, i) {
        return e.state === '进行中'
    })
    if (!nowObj) return now.innerHTML = '';
    else
        now.innerHTML = `<span>${nowObj.name}倒计时:${countDown(nowObj.time)}</span>`
}