const SDUOJ_PRODUCTION = process.env.NODE_ENV === 'production';
const SDUOJ_DEV = process.env.NODE_ENV === 'development';
const SDUOJ_TEST = process.env.NODE_ENV === 'test';

export const SDUOJ_ENV = {
  PROD: SDUOJ_PRODUCTION,
  DEV: SDUOJ_DEV,
  TEST: SDUOJ_TEST
};
