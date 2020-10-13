/*
 * Copyright 2020-2020 the original author or authors.
 *
 * Licensed under the General Public License, Version 3.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.gnu.org/licenses/gpl-3.0.en.html
 */

import moment from 'moment';

export function contestProblemId(problemCode) {
  problemCode = parseInt(problemCode) - 1;
  const str = []
  do {
    const ch = problemCode % 26;
    if (str.length === 0) {
      str.push(String.fromCharCode(65 + ch));
    } else {
      str.push(String.fromCharCode(64 + ch));
    }
    problemCode = parseInt(problemCode / 26);
  } while (problemCode > 0)
  return str.reverse().join('');
}

export function s2hs(diff) {
  const duration = moment.duration(diff, 'milliseconds');
  const minutes = duration.minutes() < 10 ? '0' + duration.minutes() : duration.minutes().toString();
  const seconds = duration.seconds() < 10 ? '0' + duration.seconds() : duration.seconds().toString();
  return [Math.floor(duration.asHours()), minutes, seconds].join(':');
}
