/*
 * Copyright 2020-2020 the original author or authors.
 *
 * Licensed under the General Public License, Version 3.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.gnu.org/licenses/gpl-3.0.en.html
 */

import acmRankHandler from './acm';
import oiRankHandler from './oi';
import ioiRankHandler from './ioi';

import { CONTEST_MODE } from '_u/constants';

export function calculateScore(score, startTime, calculateProblemResult, formatProblemResults, endTime) {
  const ret = { ...score };
  delete ret.userId;
  delete ret.username;
  delete ret.submissions;
  ret.user = {
    userId: score.userId,
    username: score.username
  };

  if (score.submissions) {
    ret.problemResults = calculateProblemResult(score.submissions, score.problemNum, endTime);
  }

  return Object.assign(ret, formatProblemResults(ret.problemResults, startTime));
}

export default {
  [CONTEST_MODE.ACM]: acmRankHandler,
  [CONTEST_MODE.OI]: oiRankHandler,
  [CONTEST_MODE.IOI]: ioiRankHandler
};
