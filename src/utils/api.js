/*
 * Copyright 2020-2020 the original author or authors.
 *
 * Licensed under the General Public License, Version 3.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.gnu.org/licenses/gpl-3.0.en.html
 */

import Vue from 'vue';
import axios from 'axios';
import store from '@/store';

axios.defaults.baseURL = '/api';
axios.defaults.withCredentials = true;

function post(url, data) {
  data = data || {};
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        if (response.data.code === 0) {
          // everything alright
          resolve(response.data.data);
        } else {
          Vue.prototype.$Message.error(response.data.message);
          reject(response.data);
        }
        store.commit('updateNow', {
          now: response.data.timestamp
        });
      }, err => {
        Vue.prototype.$Loading.finish();
        reject(err.response.data);
        store.commit('updateNow', {
          now: err.response.data.timestamp
        });
      })
  });
}

function get(url, params) {
  params = params || {};
  return new Promise((resolve, reject) => {
    axios.get(url, { params })
      .then(response => {
        if (response.data.code === 0) {
          resolve(response.data.data);
        } else {
          Vue.prototype.$Message.error(response.data.message);
          reject(response.data);
        }
        store.commit('updateNow', {
          now: response.data.timestamp
        });
      }, err => {
        Vue.prototype.$Loading.finish();
        reject(err.response.data);
        store.commit('updateNow', {
          now: err.response.data.timestamp
        });
      })
  })
}

const getContestId = () => store.state.contest.contest.contestId;

export default {
  // 配置相关
  getCopyright: function() {
    return get('/site/getCopyright');
  },
  // 用户相关
  login: function(data) {
    return post('/user/login', data);
  },
  logout: function() {
    return get('/user/logout');
  },
  register: function(data) {
    return post('/user/register', data);
  },
  forgetPassword: function(data) {
    return post('/user/forgetPassword', data);
  },
  updateProfile: function(data) {
    return post('/user/updateProfile', data);
  },
  sendVerificationEmail: function(username) {
    return post('/user/sendVerificationEmail', { username });
  },
  resetPassword: function(data) {
    return post('/user/resetPassword', data);
  },
  verifyEmail: function(token) {
    return get('/user/verifyEmail', { token });
  },
  getProfile: function(success, error) {
    axios.get('/user/getProfile')
      .then(response => {
        if (response.data.code === 0) {
          store.dispatch('user/setProfile', response.data.data)
          if (success) {
            success(response.data.data);
          }
        } else {
          Vue.prototype.$Message.error(response.data.message);
        }
      }, err => {
        if (err.response.status === 401) {
          store.dispatch('user/clearProfile');
          if (error) {
            error(err.response.data);
          }
        }
      });
  },
  getCaptcha: function() {
    return get('/user/getCaptcha');
  },
  isExist: function(params) {
    return get('/user/isExist', params);
  },
  getParticipatedContests: function() {
    return get('/user/queryParticipateContest');
  },
  // 提交相关
  getUserACProblems: function() {
    return get('/submit/queryACProblem');
  },
  getSubmissionDetail: function(params) {
    const contestId = getContestId();
    if (contestId) {
      return this.getContestSubmissionDetail({ ...params, contestId });
    }
    return get('/submit/query', params);
  },
  getSubmissionList: function(params) {
    const contestId = getContestId();
    if (contestId) {
      return this.getContestSubmissionList({ ...params, contestId });
    } else {
      return get('/submit/list', params);
    }
  },
  submit: function(data) {
    const contestId = getContestId();
    if (contestId) {
      return this.createContestSubmission({ ...data, contestId });
    } else {
      return post('/submit/create', data);
    }
  },
  // 题目相关
  problemQuery: function(params) {
    const contestId = getContestId();
    if (contestId) {
      const index = parseInt(params.problemCode) - 1;
      return new Promise((resolve, reject) => {
        if (!store.state.contest.problems[index]._valid) {
          this.getContestProblem({
            ...params,
            contestId
          }).then(ret => {
            store.commit('contest/setProblemDetail', { problem: ret });
            resolve(ret);
          }, _ => reject(_));
        } else {
          resolve(store.state.contest.problems[index]);
        }
      })
    } else {
      return get('/problem/query', params);
    }
  },
  getProblemList: function(params) {
    return get('/problem/list', params);
  },
  // 比赛相关
  getContestList: function(params) {
    return get('/contest/list', params);
  },
  getContest: function(contestId) {
    return get('/contest/query', { contestId });
  },
  getUpcomingContest: function() {
    return get('/contest/queryUpcomingContest');
  },
  getContestProblem: function(params) {
    return get('/contest/queryProblem', params);
  },
  participateIn: function(data) {
    return post('/contest/participate', data);
  },
  createContestSubmission: function(data) {
    return post('/contest/createSubmission', data);
  },
  getContestSubmissionList: function(params) {
    return get('/contest/listSubmission', params);
  },
  getContestSubmissionDetail: function(params) {
    return get('/contest/querySubmission', params);
  },
  getContestRank: function(contestId) {
    return get('/contest/rank', { contestId });
  },
  rejudge: function(data) {
    return post('/contest/rejudge', data);
  },
  invalidate: function(submissionId) {

  }
}
