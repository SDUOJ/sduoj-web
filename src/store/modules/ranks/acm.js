import { JUDGE_RESULT } from '_u/constants';

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
    let ac = false;
    let numSubmissionsPending = 0;
    problemSubmissionMap[i].sort((a, b) => a.gmtCreate - b.gmtCreate);
    for (let i1 = 0; i1 < problemSubmissionMap[i].length; ++i1) {
      const oneSubmission = problemSubmissionMap[i][i1];
      if (JUDGE_RESULT.AC === oneSubmission.judgeResult) {
        problemResults.push([
          oneSubmission.gmtCreate,
          oneSubmission.judgeScore,
          oneSubmission.judgeResult,
          i1 + 1,
          numSubmissionsPending
        ]);
        ac = true;
        break;
      } else if (JUDGE_RESULT.PD === oneSubmission.judgeResult) {
        numSubmissionsPending++;
      }
    }
    if (!ac) {
      if (problemSubmissionMap[i].length) {
        problemResults.push([
          0,  // gmtCreate
          0,  // judgeScore
          numSubmissionsPending > 0 ? JUDGE_RESULT.PD : JUDGE_RESULT.WA, // judgeResult
          problemSubmissionMap[i].length, // numSubmissions
          numSubmissionsPending  // numSubmissionsPending
        ]);
      } else {
        problemResults.push([]);
      }
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
      let css;
      switch (judgeResult) {
        case JUDGE_RESULT.AC:
          css = 'score_correct';
          solved++;
          score += time + (numSubmissions - 1) * 20 * 60 * 1000;
          break;
        case JUDGE_RESULT.WA:
          css = 'score_incorrect';
          break;
        case JUDGE_RESULT.PD:
          css = 'score_pending';
          break;
        default:
          css = '';
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
  });

  return { solved, score, problemResults };
}

function calculateRank(scores) {
  scores.sort((a, b) => {
    if (a.solved !== b.solved) {
      return b.solved - a.solved;
    } else if (a.score !== b.score) {
      return a.score - b.score;
    } else {
      return true;
    }
  });
  let rank = 0;
  let last = null;
  scores.forEach(score => {
    if (score.official) {
      rank++;
      if (!last || last.solved > score.solved || score.score > last.score) {
        score.rank = rank;
        last = score;
      } else {
        score.rank = last.rank;
      }
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
