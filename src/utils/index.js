import { StyleSheet } from "react-native";

// export { NavigationActions, StackActions } from "react-navigation";

// export { default as Storage } from './storage'

export const delay = t => new Promise(r => setTimeout(r, t));

export const createStyles = styles => StyleSheet.create(styles);

// export const createAction = type => payload => ({ type, payload });

export const getQuery = obj => {
  if (obj) {
    return Object.keys(obj)
      .map(key => {
        return `${key}=${obj[key] || ""}`;
      })
      .join("&");
  }
};

/**
 * 日期转换
 */
export function dateFormat(fmt, date) {
  // author: meizz
  // 对Date的扩展，将 Date 转化为指定格式的String
  // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
  // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
  // 例子：
  // dateFormat("yyyy-MM-dd hh:mm:ss.S",date) ==> 2006-07-02 08:09:04.423
  // dateFormat("yyyy-M-d h:m:s.S",date)      ==> 2006-7-2 8:9:4.18
  const o = {
    "M+": date.getMonth() + 1, // 月份
    "d+": date.getDate(), // 日
    "h+": date.getHours(), // 小时
    "m+": date.getMinutes(), // 分
    "s+": date.getSeconds(), // 秒
    "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
  };
  let res = fmt;
  if (/(y+)/.test(res))
    res = res.replace(
      RegExp.$1,
      `${date.getFullYear()}`.substr(4 - RegExp.$1.length)
    );
  for (const k in o)
    if (new RegExp(`(${k})`).test(res))
      res = res.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length)
      );
  return res;
}

/**
 * 时间转为时间戳
 * @param time 时间(00:00:00)
 * @returns {string} 时间戳（单位：秒）
 */
export function timeToSecond(time) {
  let s = "";

  const hour = time.split(":")[0];
  const min = time.split(":")[1];
  const sec = time.split(":")[2];

  s = Number(hour * 3600) + Number(min * 60) + Number(sec);

  return s;
}
