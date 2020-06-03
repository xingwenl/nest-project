import { Logger } from '@nestjs/common';

/**
 * @description 判断是否为空对象
 * @param obj
 */
export function isEmptyObj(obj: any) {
  for (let t in obj) return false;
  return true;
}

/**
 * @description 时间格式化
 * @param @{Number} time
 * @param @{String} fmt = [yyyyMMddhhmmss] 可选值
 */
export function formatDate(time = 0, fmt = 'yyyyMMddhhmmss') {
  let now = new Date();
  let date = new Date(time);
  if (!time || isNaN(time)) {
    date = now;
  }
  let o = {
    'M+': date.getMonth() + 1, //月份
    'd+': date.getDate(), //日
    'h+': date.getHours(), //小时
    'm+': date.getMinutes(), //分
    's+': date.getSeconds(), //秒
    'q+': Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length),
    );
  for (let k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length),
      );

  return fmt;
}

export function jsonToObj(json: string) {
  try {
    return JSON.parse(json);
  } catch (error) {
    Logger.error('1', 'jsonToObj-catch', error);
    return {};
  }
}
