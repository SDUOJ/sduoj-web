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
  const problemResults = [];
  const problemSubmissionMap = {};
  for (let i = 1; i <= problemNum; ++i) {
    problemSubmissionMap[i] = [];
  }

  submissions.forEach(submission => {
    const problemCode = parseInt(submission[0]);
    if (!endTime || parseInt(submission[1]) <= endTime) {
      problemSubmissionMap[problemCode].push({
        gmtCreate: parseInt(submission[1]),
        judgeScore: parseInt(submission[2] || 0),
        judgeResult: parseInt(submission[3])
      });
    }
  });

  for (let i = 1; i <= problemNum; ++i) {
    // sort by gmtCreate
    let numSubmissionsPending = 0;
    let maxScoreSubmission = null;
    for (let i1 = 0; i1 < problemSubmissionMap[i].length; ++i1) {
      const oneSubmission = problemSubmissionMap[i][i1];
      if (!maxScoreSubmission || oneSubmission.judgeScore > maxScoreSubmission.judgeScore) {
        maxScoreSubmission = oneSubmission;
      }
      if (oneSubmission.judgeResult === JUDGE_RESULT_TYPE.PD) {
        numSubmissionsPending++;
      }
    }
    if (maxScoreSubmission) {
      problemResults.push([
        maxScoreSubmission.gmtCreate,  // gmtCreate
        maxScoreSubmission.judgeScore,  // judgeScore
        maxScoreSubmission.judgeResult, // judgeResult
        problemSubmissionMap[i].length, // numSubmissions
        numSubmissionsPending           // numSubmissionsPending
      ]);
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
      const judgeScore = parseInt(result[1] || 0);
      const judgeResult = parseInt(result[2]);
      const numSubmissions = parseInt(result[3]);
      const numSubmissionsPending = parseInt(result[4]);
      score += judgeScore * problemWeights[problemCode - 1];

      let css;
      if (judgeResult <= JUDGE_RESULT_TYPE.PD) {
        css = 'score_pending';
      } else if (judgeResult === JUDGE_RESULT_TYPE.AC) {
        css = 'score_correct';
        solved++;
      } else {
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

// 只按得分计算 rank
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

function exportScore(problemResults) {
  return problemResults.map(o => {
    if (o.numSubmissions > 0) {
      return o.score.toString();
    } else {
      return '';
    }
  });
}

export default {
  formatProblemResults,
  calculateProblemResult,
  calculateRank,
  exportScore
}
