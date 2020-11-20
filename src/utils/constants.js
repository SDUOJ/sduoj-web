/*
 * Copyright 2020-2020 the original author or authors.
 *
 * Licensed under the General Public License, Version 3.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.gnu.org/licenses/gpl-3.0.en.html
 */

export const CONTEST_STATUS = {
  UPCOMING: 1,
  RUNNING: 2,
  FINISHED: 3
};

export const CONTEST_OPENNESS = {
  PUBLIC: 'public',
  PROTECTED: 'protected',
  PRIVATE: 'private'
};

export const CONTEST_MODE = {
  ACM: 'acm',
  OI: 'oi',
  IOI: 'ioi'
};

export const JUDGE_RESULT = {
  '-3': {
    name: 'Compiling',
    abbr: 'CP',
    css: 'verdict-pending',
    color: 'grey',
    icon: 'md-information'
  },
  '-2': {
    name: 'Judging',
    abbr: 'JG',
    css: 'verdict-pending',
    color: 'grey',
    icon: 'md-information'
  },
  0: {
    name: 'Pending',
    abbr: 'PD',
    css: 'verdict-pending',
    color: 'grey',
    icon: 'md-information'
  },
  1: {
    name: 'Accepted',
    abbr: 'AC',
    css: 'verdict-accepted',
    color: '#5cb85c',
    icon: 'md-checkmark'
  },
  2: {
    name: 'Time Limit Exceeded',
    abbr: 'TLE',
    css: 'verdict-failed',
    color: '#d9534f',
    icon: 'md-close'
  },
  3: {
    name: 'Memory Limit Exceeded',
    abbr: 'MLE',
    css: 'verdict-failed',
    color: '#d9534f',
    icon: 'md-close'
  },
  4: {
    name: 'Runtime Error',
    abbr: 'RE',
    css: 'verdict-failed',
    color: '#d9534f',
    icon: 'md-close'
  },
  5: {
    name: 'System Error',
    abbr: 'SE',
    css: 'verdict-system-error',
    color: 'rebeccapurple',
    icon: 'md-close'
  },
  6: {
    name: 'Wrong Answer',
    abbr: 'WA',
    css: 'verdict-failed',
    color: '#d9534f',
    icon: 'md-close'
  },
  7: {
    name: 'Presentation Error',
    abbr: 'PE',
    css: 'verdict-failed',
    color: '#d9534f',
    icon: 'md-close'
  },
  8: {
    name: 'Compilation Error',
    abbr: 'CE',
    css: 'verdict-compile-error',
    color: 'orange',
    icon: 'md-close'
  },
  9: {
    name: 'Canceled',
    abbr: 'CAN',
    css: 'verdict-canceled',
    color: '#220048',
    icon: 'md-close'
  }
};

export const JUDGE_RESULT_TYPE = {
  PD: 0,
  AC: 1,
  TLE: 2,
  MLE: 3,
  RE: 4,
  SE: 5,
  WA: 6,
  PE: 7,
  CE: 8,
  CAN: 9,

  CP: -3,
  JG: -2,
  END: -1
};

export const JUDGE_TEMPLATE_TYPE = {
  IO: 0,
  SPJ: 1,
  ADVANCED: 2
}

export const JUDGE_TEMPLATE_PROPERITY = {
  [JUDGE_TEMPLATE_TYPE.IO]: {
    type: 0,
    name: 'IO',
    color: 'blue',
    zipFile: false
  },
  [JUDGE_TEMPLATE_TYPE.SPJ]: {
    type: 1,
    name: 'SPJ',
    color: 'gold',
    zipFile: true
  },
  [JUDGE_TEMPLATE_TYPE.ADVANCED]: {
    type: 2,
    name: 'Advanced',
    color: 'purple',
    zipFile: true
  }
}

export const USER_ROLE = {
  user: {
    color: 'default',
    isAdmin: false
  },
  admin: {
    color: 'gold',
    isAdmin: true
  },
  superadmin: {
    color: 'volcano',
    isAdmin: true
  }
};
