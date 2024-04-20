/*
 * Copyright 2020-2022 the original author or authors.
 *
 * Licensed under the Affero General Public License, Version 3.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.gnu.org/licenses/agpl-3.0.en.html
 */

export const CONTEST_STATUS = {
  UPCOMING: 1,
  RUNNING: 2,
  FINISHED: 3
};

export const CONTEST_OPENNESS = {
  PUBLIC: {
    title: 'public',
    hint: 'Public: Anyone can participate in'
  },
  PROTECTED: {
    title: 'protected',
    hint: 'Protected: Problems are public but password is needed for submissions',
    lockColor: 'orange'
  },
  PRIVATE: {
    title: 'private',
    hint: 'Private: Password is needed for both problems and submissions',
    lockColor: '#d9534f'
  }
};

export const CONTEST_MODE = {
  ACM: 'acm',
  OI: 'oi',
  IOI: 'ioi'
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
  OLE: 9,

  CAN: 99,

  CP: -3,
  JG: -2,
  END: -1
};

export const JUDGE_RESULT = {
  [JUDGE_RESULT_TYPE.CP]: {
    name: 'Compiling',
    abbr: 'CP',
    css: 'verdict-pending',
    color: 'grey',
    icon: 'md-information'
  },
  [JUDGE_RESULT_TYPE.JG]: {
    name: 'Judging',
    abbr: 'JG',
    css: 'verdict-pending',
    color: 'grey',
    icon: 'md-information'
  },
  [JUDGE_RESULT_TYPE.END]: {
    name: 'Ended',
    abbr: 'END',
    css: 'verdict-pending',
    color: 'grey',
    icon: 'md-information'
  },
  [JUDGE_RESULT_TYPE.PD]: {
    name: 'Pending',
    abbr: 'PD',
    css: 'verdict-pending',
    color: 'grey',
    icon: 'md-information'
  },
  [JUDGE_RESULT_TYPE.AC]: {
    name: 'Accepted',
    abbr: 'AC',
    css: 'verdict-accepted',
    color: '#5cb85c',
    icon: 'md-checkmark'
  },
  [JUDGE_RESULT_TYPE.TLE]: {
    name: 'Time Limit Exceeded',
    abbr: 'TLE',
    css: 'verdict-failed',
    color: '#d9534f',
    icon: 'md-close'
  },
  [JUDGE_RESULT_TYPE.MLE]: {
    name: 'Memory Limit Exceeded',
    abbr: 'MLE',
    css: 'verdict-failed',
    color: '#d9534f',
    icon: 'md-close'
  },
  [JUDGE_RESULT_TYPE.RE]: {
    name: 'Runtime Error',
    abbr: 'RE',
    css: 'verdict-failed',
    color: '#d9534f',
    icon: 'md-close'
  },
  [JUDGE_RESULT_TYPE.SE]: {
    name: 'System Error',
    abbr: 'SE',
    css: 'verdict-system-error',
    color: 'rebeccapurple',
    icon: 'md-close'
  },
  [JUDGE_RESULT_TYPE.WA]: {
    name: 'Wrong Answer',
    abbr: 'WA',
    css: 'verdict-failed',
    color: '#d9534f',
    icon: 'md-close'
  },
  [JUDGE_RESULT_TYPE.PE]: {
    name: 'Presentation Error',
    abbr: 'PE',
    css: 'verdict-failed',
    color: '#d9534f',
    icon: 'md-close'
  },
  [JUDGE_RESULT_TYPE.CE]: {
    name: 'Compilation Error',
    abbr: 'CE',
    css: 'verdict-compile-error',
    color: 'orange',
    icon: 'md-close'
  },
  [JUDGE_RESULT_TYPE.OLE]: {
    name: 'Output Limit Exceeded',
    abbr: 'OLE',
    css: 'verdict-failed',
    color: '#d9534f',
    icon: 'md-close'
  },
  [JUDGE_RESULT_TYPE.CAN]: {
    name: 'Canceled',
    abbr: 'CAN',
    css: 'verdict-canceled',
    color: '#220048',
    icon: 'md-close'
  }
};

export const JUDGE_TEMPLATE_TYPE = {
  IO: 0,
  SPJ: 1, // deprecated
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

export const GROUP_OPENNESS_TYPE = {
  PUBLIC: 0,
  PROTECTED: 1,
  PRIVATE: 2
};

export const GROUP_OPENNESS = {
  [GROUP_OPENNESS_TYPE.PUBLIC]: {
    title: 'Public',
    description: 'Anybody can join in'
  },
  [GROUP_OPENNESS_TYPE.PROTECTED]: {
    title: 'Apply',
    description: 'Need the administrator audit'
  },
  [GROUP_OPENNESS_TYPE.PRIVATE]: {
    title: 'Private',
    description: 'Nobody can join in'
  }
}

export const GROUP_STATUS_TYPE = {
  NONE: 0,
  APPLIED: 1,
  JOINED: 2,
  REJECTED: 3
};

export const JUDGE_TEMPLATE_PROPERTY = {
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

export const CONTEST_PROBLEM_STATUS = {
  INIT: 0,
  READY: 1,
  FAILED: 2
};

export const NEWLINE_CONVERT_INDEX = {
  DEFAULT: '',
  DOS2UNIX: 'dos2unix',
  UNIX2DOS: 'unix2dos'
};

export const NEWLINE_CONVERT = {
  [NEWLINE_CONVERT_INDEX.DOS2UNIX]: {
    name: NEWLINE_CONVERT_INDEX.DOS2UNIX,
    description: 'Convert DOS(CR-LF) to UNIX(LF)'
  },
  [NEWLINE_CONVERT_INDEX.UNIX2DOS]: {
    name: NEWLINE_CONVERT_INDEX.UNIX2DOS,
    description: 'Convert UNIX(LF) to DOS(CR-LF)'
  },
  [NEWLINE_CONVERT_INDEX.DEFAULT]: {
    name: NEWLINE_CONVERT_INDEX.DEFAULT,
    description: 'Do not convert'
  }
};

export const PREDEFINED_CHECKERS = [
  {
    name: 'lcmp.cpp',
    description: 'Lines, ignores whitespaces'
  },
  {
    name: 'hcmp.cpp',
    description: 'Single huge integer'
  },
  {
    name: 'ncmp.cpp',
    description: 'Single or more int64, ignores whitespaces'
  },
  {
    name: 'nyesno.cpp',
    description: 'Zero or more yes/no, case insensitive'
  },
  {
    name: 'rcmp4.cpp',
    description: 'Single or more double, max any error 1E-4'
  },
  {
    name: 'rcmp6.cpp',
    description: 'Single or more double, max any error 1E-6'
  },
  {
    name: 'rcmp9.cpp',
    description: 'Single or more double, max any error 1E-9'
  },
  {
    name: 'wcmp.cpp',
    description: 'Sequence of tokens'
  },
  {
    name: 'yesno.cpp',
    description: 'Single yes or no, case insensitive'
  }
];
