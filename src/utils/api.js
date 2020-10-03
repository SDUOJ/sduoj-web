import Vue from 'vue';
import axios from 'axios';
import store from '@/store';

const ver1 = '/api';
// axios.defaults.baseURL = 'http://api.oj.xrvitd.com:8080' + ver1;
axios.defaults.baseURL = 'http://api.oj.sdu.edu.cn:8080' + ver1;
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
      }, err => {
        reject(err.response.data);
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
      }, err => {
        reject(err.response.data);
      })
  })
}

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
  // 提交相关
  getSubmissionDetail: function(submissionId) {
    return get('/submit/query', { submissionId });
  },
  getSubmissionList: function(params) {
    return get('/submit/list', params);
  },
  submit: function(data) {
    return post('/submit/create', data);
  },
  // 题目相关
  problemQuery: function(problemCode) {
    return get('/problem/query', { problemCode });
  },
  getProblemList: function(params) {
    return get('/problem/list', params);
  },
  // 比赛相关
  getContestList: function() {
    return new Promise((resolve) => {
      resolve([
        { contestId: 1, contestTitle: '排位赛 1', description: '1111111111111111111', start: 1601628815000, end: 1601646815000, mode: 'acm', attends: 100 },
        { contestId: 2, contestTitle: 'Contest 2', description: '222222222222222222222222222222222222222222222222222', start: 1601628115000, end: 1601646115000, mode: 'oi', attends: 800 },
        { contestId: 3, contestTitle: 'Contest 3', description: '222222222222222222222222222222222222222222222222222', start: 1601628115000, end: 1601646115000, mode: 'oi', attends: 800 },
        { contestId: 4, contestTitle: '浙江省第十二届大学生程序设计竞赛（重现赛） [Cloned]', description: '222222222222222222222222222222222222222222222222222', start: 1601648316000, end: 1601648516000, mode: 'ioi', attends: 800 },
        { contestId: 5, contestTitle: '浙江省第十二届大学生程序设计竞赛（重现赛） [Cloned]', description: '222222222222222222222222222222222222222222222222222', start: 1601628115000, end: 1601629115000, mode: 'ioi', attends: 800 }
      ])
    })
  },
  getContest: function(contestId) {
    return new Promise((resolve, reject) => {
      resolve(
        { contestId: 4, contestTitle: '浙江省第十二届大学生程序设计竞赛（重现赛） [Cloned]', description: '222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222', start: 1601713224000, end: 1601713225000, mode: 'ioi', attends: 800 }
      )
    })
  }
}
