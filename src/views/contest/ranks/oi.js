import judge from '_u/judge';

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
        judgeScore: parseInt(submission[2]),
        judgeResult: parseInt(submission[3])
      });
    }
  });

  for (let i = 1; i <= problemNum; ++i) {
    // sort by gmtCreate
    problemSubmissionMap[i].sort((a, b) => a.gmtCreate - b.gmtCreate);
    if (problemResults[i].length) {
      const lastSubmission = problemResults[i][problemResults[i].length - 1];
      problemResults.push([
        lastSubmission.gmtCreate,     // gmtCreate
        lastSubmission.judgeScore,    // judgeScore
        lastSubmission.judgeResult,   // judgeResult
        problemSubmissionMap[i].length, // numSubmissions
        0
      ])
    } else {
      problemResults.push([]);
    }
  }
  return problemResults;
}

function formatProblemResults(_problemResults, startTime) {
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
      score += judgeScore;
      let css;
      switch (judgeResult) {
        case judge.judgeResultMap.AC:
          css = 'score_correct';
          solved++;
          break;
        case judge.judgeResultMap.PD:
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
        numSubmissions,
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
