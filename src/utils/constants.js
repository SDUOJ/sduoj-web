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
  0: {
    name: 'Pending',
    abbr: 'PD',
    css: 'verdict-pending'
  },
  1: {
    name: 'Accepted',
    abbr: 'AC',
    css: 'verdict-accepted'
  },
  2: {
    name: 'Time Limit Exceeded',
    abbr: 'TLE',
    css: 'verdict-failed'
  },
  3: {
    name: 'Memory Limit Exceeded',
    abbr: 'MLE',
    css: 'verdict-failed'
  },
  4: {
    name: 'Runtime Error',
    abbr: 'RE',
    css: 'verdict-failed'
  },
  5: {
    name: 'System Error',
    abbr: 'SE',
    css: 'verdict-system-error'
  },
  6: {
    name: 'Wrong Answer',
    abbr: 'WA',
    css: 'verdict-failed'
  },
  7: {
    name: 'Presentation Error',
    abbr: 'PE',
    css: 'verdict-failed'
  },
  8: {
    name: 'Compile Error',
    abbr: 'CE',
    css: 'verdict-compile-error'
  },
  PD: 0,
  AC: 1,
  TLE: 2,
  MLE: 3,
  RE: 4,
  SE: 5,
  WA: 6,
  PE: 7,
  CE: 8
};

export const judgeTemplateType = {
  IO: 0,
  SPJ: 1,
  ADVANCED: 2
}

export const judgeTemplateProperity = {
  [judgeTemplateType.IO]: {
    type: 0,
    name: 'IO',
    color: 'blue',
    zipFile: false
  },
  [judgeTemplateType.SPJ]: {
    type: 1,
    name: 'SPJ',
    color: 'gold',
    zipFile: true
  },
  [judgeTemplateType.ADVANCED]: {
    type: 2,
    name: 'Advanced',
    color: 'purple',
    zipFile: true
  }
}
