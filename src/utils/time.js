/*
 * Copyright 2020-2020 the original author or authors.
 *
 * Licensed under the General Public License, Version 3.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.gnu.org/licenses/gpl-3.0.en.html
 */

export default function dateFormat(timestamp, fmt) {
  if (typeof (timestamp) === 'string') {
    timestamp = parseInt(timestamp);
  }
  const time = new Date(timestamp);
  var o = { 
    'M+': time.getMonth() + 1,                 // 月份 
    'd+': time.getDate(),                    // 日 
    'h+': time.getHours(),                   // 小时 
    'm+': time.getMinutes(),                 // 分 
    's+': time.getSeconds(),                 // 秒 
    'q+': Math.floor((time.getMonth() + 3) / 3), // 季度 
    S: time.getMilliseconds()             // 毫秒 
  }; 
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length)); 
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    }
  }
  return fmt; 
};