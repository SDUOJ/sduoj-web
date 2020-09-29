import Vue from 'vue';
import axios from 'axios';

const LOGIN_CODE = 100;
const ver1 = '/api';
axios.defaults.baseURL = 'http://api.oj.sdu.edu.cn:8080' + ver1;

function post(url, data) {
  data = data || {};
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        if (response.data.code === 0) {
          // everything alright
          resolve(response.data.data);
        } else if (response.data.code === LOGIN_CODE) {
          // timeout, login needed
        } else {
          Vue.prototype.$Message.error(response.data.message);
          reject(response);
        }
      }, err => {
        Vue.prototype.$Message.error(err.data);
        reject(err);
      })
  });
}

function get(url, params) {
  params = params || {};
  return new Promise((resolve, reject) => {
    axios.get(url, params)
      .then(response => {
        if (response.data.code === 0) {
          // everything alright
          resolve(response.data.data);
        } else if (response.data.code === LOGIN_CODE) {
          // timeout, login needed
        } else {
          Vue.prototype.$Message.error(response.data.message);
          reject(response);
        }
      }, err => {
        Vue.prototype.$Message.error(err.data);
        reject(err);
      })
  })
}

export default {
  login: function(data) {
    return post('/user/login', data);
  },
  logout: function() {
    return get('/user/logout');
  },
  getProfile: function() {
    return new Promise((resolve, reject) => {
      resolve({ userId: 2, username: 'jeshrz', nickname: 'hrz', email: 'jeshrz@gmail.com', studentId: '201705130113', emailVerified: 1, roles: ['superadmin'], ipv4: '101.76.220.251', userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36' });
    });
  }
}