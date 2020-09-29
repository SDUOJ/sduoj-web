import Vue from 'vue';
import axios from 'axios';

const LOGIN_NEEDED = 401;
const ver1 = '/api';
axios.defaults.baseURL = 'http://api.oj.xrvitd.com:8080' + ver1;
// axios.defaults.baseURL = 'http://api.oj.sdu.edu.cn:8080' + ver1;

function post(url, data) {
  data = data || {};
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        if (response.data.code === 0) {
          // everything alright
          resolve(response.data.data);
        } else if (response.data.code === LOGIN_NEEDED) {
          // timeout, login needed
          reject(response);
        } else {
          Vue.prototype.$Message.error(response.data.message);
          reject(response);
        }
      }, err => {
        console.log(err);
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
        } else if (response.data.code === LOGIN_NEEDED) {
          // timeout, login needed
          reject(response);
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
    return get('/user/getProfile');
  }
}