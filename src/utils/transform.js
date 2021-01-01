/*
 * Copyright 2020-2021 the original author or authors.
 *
 * Licensed under the General Public License, Version 3.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.gnu.org/licenses/gpl-3.0.en.html
 */

import moment from 'moment';

/*
 * 将 1 2 3 4 这样的problemId 转换成 A、B、C、D
*/
export function contestProblemId(problemCode) {
  problemCode = parseInt(problemCode);
  const str = [];
  do {
    const ch = (problemCode - 1) % 26 + 1;
    str.push(String.fromCharCode(64 + ch)); // ch + 'A' - 1
    problemCode = parseInt((problemCode - ch) / 26);
  } while (problemCode > 0);
  return str.reverse().join('');
}

/*
 * 将 A、B、C、D 转换成 1 2 3 4
*/
export function contestProblemIdInvert(problemCode) {
  if (!problemCode) return '';
  let base = 0;
  let problemId = 0;
  for (const ch of problemCode) {
    if (ch >= 'A' && ch <= 'Z') {
      if (!base) base = 26;
      if (base !== 26)  return '';
      problemId = problemId * base + (ch.charCodeAt() - 64); // (ch - 1) - 'A'
    } else if (ch >= 'a' && ch <= 'z') {
      if (!base) base = 26;
      if (base !== 26)  return '';
      problemId = problemId * base + (ch.charCodeAt() - 96); // (ch - 1) - 'a'
    } else if (ch >= '0' && ch <= '9') {
      if (!base) base = 10;
      if (base !== 10)  return '';
      problemId = problemId * base + (ch.charCodeAt() - 48); // ch - '0';
    } else {
      return '';
    }
  }
  return problemId.toString();
}

export function s2hs(diff) {
  const duration = moment.duration(diff, 'milliseconds');
  const minutes = duration.minutes() < 10 ? '0' + duration.minutes() : duration.minutes().toString();
  const seconds = duration.seconds() < 10 ? '0' + duration.seconds() : duration.seconds().toString();
  return [Math.floor(duration.asHours()), minutes, seconds].join(':');
}
