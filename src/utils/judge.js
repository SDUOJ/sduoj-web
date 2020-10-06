const judgeResultMap = {
  0: 'Pending',
  1: 'Accepted',
  2: 'Time Limit Exceeded',
  3: 'Memory Limit Exceeded',
  4: 'Runtime Error',
  5: 'System Error',
  6: 'Wrong Answer',
  7: 'Presentation Error',
  8: 'Compile Error'
};

const judgeResultMapAbbr = {
  0: 'PD',
  1: 'AC',
  2: 'TLE',
  3: 'MLE',
  4: 'RE',
  5: 'SE',
  6: 'WA',
  7: 'PEr',
  8: 'CE'
}

const status2Class = function(status) {
  if (status === 0) {
    return 'verdict-pending';
  } else if (status === 1) {
    return 'verdict-accepted';
  } else if (status === 8) {
    return 'verdict-compile-error';
  } else {
    return 'verdict-failed';
  }
}

const result2Status = function(result) {
  result = result.toLowerCase();
  if (result.indexOf('pend') !== -1) {
    return 0;
  } else if (result.indexOf('ac') !== -1) {
    return 1;
  } else if (result.indexOf('time') !== -1 || result.indexOf('tle') !== -1) {
    return 2;
  } else if (result.indexOf('mem') !== -1 || result.indexOf('mle') !== -1) {
    return 3;
  } else if (result.indexOf('run') !== -1 || result.indexOf('re') !== -1) {
    return 4;
  } else if (result.indexOf('sys') !== -1 || result.indexOf('se') !== -1) {
    return 5;
  } else if (result.indexOf('wrong') !== -1 || result.indexOf('wa') !== -1) {
    return 6;
  } else if (result.indexOf('pre') !== -1 || result.indexOf('pe') !== -1) {
    return 7;
  } else if (result.indexOf('com') !== -1 || result.indexOf('ce') !== -1) {
    return 8;
  }
  return -1;
}

export default {
  judgeResultMap,
  judgeResultMapAbbr,
  status2Class,
  result2Status
}
