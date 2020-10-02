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
  }
}
