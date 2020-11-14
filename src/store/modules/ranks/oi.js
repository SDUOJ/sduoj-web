/*
 * Copyright 2020-2020 the original author or authors.
 *
 * Licensed under the General Public License, Version 3.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.gnu.org/licenses/gpl-3.0.en.html
 */

import { JUDGE_RESULT_TYPE } from '_u/constants';

function calculateProblemResult(submissions, problemNum, endTime) {
  const problemSubmissionMap = {};
  for (let i = 1; i <= problemNum; ++i) {
    problemSubmissionMap[i] = [];
  }

  submissions.forEach(submission => {
    const problemCode = parseInt(submission[0]);
    if (!endTime || parseInt(submission[1]) <= endTime) {
      problemSubmissionMap[problemCode].push({
        gmtCreate: parseInt(submission[1]),
        judgeScore: parseInt(submission[2]),
        judgeResult: parseInt(submission[3])
      });
    }
  });

  const problemResults = [];
  for (let i = 1; i <= problemNum; ++i) {
    // sort by gmtCreate
    problemSubmissionMap[i].sort((a, b) => a.gmtCreate - b.gmtCreate);
    let numSubmissionsPending = 0;
    let lastUnPDSubmission = null;
    for (let i1 = problemSubmissionMap[i].length - 1; i1 >= 0; --i1) {
      const oneSubmission = problemSubmissionMap[i][i1];
      if (oneSubmission.judgeResult === JUDGE_RESULT_TYPE.PD) {
        lastUnPDSubmission = oneSubmission;
        break;
      } else {
        numSubmissionsPending++;
      }
    }
    if (lastUnPDSubmission) {
      problemResults.push([
        lastUnPDSubmission.gmtCreate,
        lastUnPDSubmission.judgeScore,
        lastUnPDSubmission.judgeResult,
        problemSubmissionMap[i].length,
        numSubmissionsPending
      ])
    } else {
      problemResults.push([]);
    }
  }
  return problemResults;
}

function formatProblemResults(_problemResults, problemWeights, startTime) {
  const problemResults = [];
  let problemCode = 0;
  let solved = 0;
  let score = 0;
  _problemResults.forEach(result => {
    problemCode++;
    if (result.length === 0) {
      problemResults.push({
        problemCode,
        css: '',
        time: 0,
        score: 0,
        numSubmissions: 0,
        numSubmissionsPending: 0
      });
    } else {
      let time = parseInt(result[0]);
      if (time > 0) {
        time -= startTime;
      }
      const judgeScore = parseInt(result[1]);
      const judgeResult = parseInt(result[2]);
      const numSubmissions = parseInt(result[3]);
      const numSubmissionsPending = parseInt(result[4]);
      score += judgeScore * problemWeights[problemCode - 1];
      let css;
      switch (judgeResult) {
        case JUDGE_RESULT_TYPE.AC:
          css = 'score_correct';
          solved++;
          break;
        case JUDGE_RESULT_TYPE.PD:
          css = 'score_pending';
          break;
        default:
          css = 'score_incorrect';
      }
      problemResults.push({
        problemCode,
        css,
        time,
        score: judgeScore,
        judgeResult,
        numSubmissions: numSubmissions - numSubmissionsPending,
        numSubmissionsPending
      });
    }
  })

  return { solved, score, problemResults };
}

function calculateRank(scores) {
  scores.sort((a, b) => {
    if (a.score !== b.score) {
      return b.score - a.score;
    } else {
      return true;
    }
  });
  let rank = 1;
  let last = null;
  scores.forEach(score => {
    if (score.official) {
      if (!last || last.score > score.score) {
        score.rank = rank;
        last = score;
      } else {
        score.rank = last.rank;
      }
      rank++;
    } else {
      score.rank = -1;
    }
  });
  return scores;
}

export default {
  formatProblemResults,
  calculateProblemResult,
  calculateRank
}
