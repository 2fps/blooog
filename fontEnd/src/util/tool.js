/**
 * 将时间戳转化为如 2019-02-07 这种格式
 * @param  { Number } stamp 时间戳
 * @return { String }  字符串时间格式
 */
export function timeFormat(stamp) {
    let date = new Date(stamp),
        str = '';

    // 年月日
    str += date.getFullYear() + '-';
    str += ( date.getMonth() + 1 ) + '-';
    str += date.getDate() + ' ';

    // 时分秒
    str += date.getHours() + ':';
    str += date.getMinutes() + ':';
    str += date.getSeconds();

    return str;
}

export function removeLabel(str, num = 110) {
    str = str.replace(/<[\/\!]*[^<>]*>/ig, "").replace(/[\r\n]/g,"");
    
    return str.substring(0, num);
}