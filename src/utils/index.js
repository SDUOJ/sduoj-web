import judge from './judge';
import time from './time';

const contestProblemId = function(problemCode) {
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

export default {
  ...judge,
  time,
  contestProblemId
}
