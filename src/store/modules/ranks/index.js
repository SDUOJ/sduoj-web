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
