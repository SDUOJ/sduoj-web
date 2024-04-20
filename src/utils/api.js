/*
 * Copyright 2020-2022 the original author or authors.
 *
 * Licensed under the Affero General Public License, Version 3.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.gnu.org/licenses/agpl-3.0.en.html
 */

import Vue from 'vue';
import axios from 'axios';
import store from '@/store';

axios.defaults.baseURL = `${process.env.VUE_APP_OJ_SERVER}/api`;
axios.defaults.withCredentials = true;

function post(url, data, options) {
  data = data || {};
  options = options || {};
  return new Promise((resolve, reject) => {
    axios.post(url, data, options)
      .then(response => {
        if (response.headers['content-type'] && response.headers['content-type'].indexOf('application/json') !== -1 && response.data.code !== undefined) {
          switch (response.data.code) {
            case 0:
              resolve(response.data.data);
              break;
            case 429:
              Vue.prototype.$Message.error(response.data.message);
              break; // 可能需要根据实际情况决定是否在此处 reject
            default:
              Vue.prototype.$Message.error(response.data.message);
              reject(response.data);
              break;
          }
        } else {
          resolve(response); // 处理非JSON或无code的响应
        }

        if (response.data.timestamp) {
          store.commit('updateNow', {
            now: response.data.timestamp
          });
        }
      })
      .catch(err => {
        Vue.prototype.$Loading.finish();
        if (err.response) {
          switch (err.response.status) {
            case 429:
              Vue.prototype.$Message.error(err.response.data.message);
              break; // 可能需要根据实际情况决定是否在此处 reject
            default:
              reject(err.response.data);
              break;
          }

          if (err.response.data.timestamp) {
            store.commit('updateNow', {
              now: err.response.data.timestamp
            });
          }
        } else {
          reject(err); // 处理网络或其他类型的错误
        }
      });
  });
}

function get(url, params, options) {
  params = params || {};
  options = options || {};
  return new Promise((resolve, reject) => {
    axios.get(url, { params, ...options })
      .then(response => {
        // 检查响应数据是否包含code和可能的时间戳
        if (response.data.code !== undefined) {
          switch (response.data.code) {
            case 0:
              resolve(response.data.data);
              break;
            case 429:
              Vue.prototype.$Message.error(response.data.message);
              break; // 根据实际情况决定是否也在这里reject
            default:
              Vue.prototype.$Message.error(response.data.message);
              reject(response.data);
              break;
          }
        } else {
          resolve(response); // 如果响应不包含code，直接resolve整个响应
        }

        if (response.data.timestamp) {
          store.commit('updateNow', { now: response.data.timestamp });
        }
      })
      .catch(err => {
        Vue.prototype.$Loading.finish();
        if (err.response) {
          switch (err.response.status) {
            case 429:
              Vue.prototype.$Message.error(err.response.data.message);
              break; // 根据实际情况决定是否也在这里reject
            default:
              reject(err.response.data);
              break;
          }

          if (err.response.data.timestamp) {
            store.commit('updateNow', { now: err.response.data.timestamp });
          }
        } else {
          reject(err); // 处理网络或其他类型的错误
        }
      });
  });
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
  updatePassword: function(data) {
    return post('/user/updatePassword', data);
  },
  sendVerificationEmail: function(data) {
    return post('/user/sendVerificationEmail', data);
  },
  resetPassword: function(data) {
    return post('/user/resetPassword', data);
  },
  updateEmail: function(data) {
    return post('/user/updateEmail', data);
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
  getUpcomingContest: function(params) {
    return get('/contest/queryUpcomingContest', params);
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
    return post('/submit/rejudge', data);
  },
  invalidate: function(params) {
    if (params.contestId) {
      return get('/contest/invalidateSubmission', params);
    } else {
      return get('/submit/invalidateSubmission', params);
    }
  },
  /* *************** groups ************************* */
  getGroupDetail: function(params) {
    return get('/group/query', params);
  },
  getGroupList: function(params) {
    return get('/group/page', params);
  },
  joinGroup: function(params) {
    return get('/group/apply', params);
  },
  quitGroup: function(params) {
    return get('/group/quit', params);
  },
  getMyGroupList: function (params) {
    return get('/group/my', params);
  },
  /* ************* file upload ************* */
  // 单文件上传
  singleUpload: function(data) {
    return post('/filesys/upload', data);
  },
  /* third-party-login */
  thirdPartyLogin: function(params) {
    return get('/user/thirdPartyLogin', params);
  },
  thirdPartyBinding: function(data) {
    return post('/user/thirdPartyBinding', data);
  },
  thirdPartyRegister: function(data) {
    return post('/user/thirdPartyRegister', data);
  },
  thirdPartyUnbinding: function(params) {
    return get('/user/thirdPartyUnbinding', params);
  },

  /* ************* manage端API ************* */
  /* 通过组号获取比赛列表 */
  getContestListByGroupId: function(params) {
    return get('/contest/list', params)
  },

  /* 通过组号获取组内学生 */
  getStudentListByGroupId: function (params) {
    return get('/group/query', params)
  },
  // 查询用户列表
  getUserList: function (params) {
    return get('/manage/user/list', params);
  },
  // 更改用户信息
  updateUserInfo: function (data) {
    return post('/manage/user/update', data);
  },
  // 更改用户密码
  updateUserPasswd: function (data) {
    return post('/manage/user/update', data);
  },
  // 批量添加用户
  addUsers: function (data) {
    return post('/manage/user/addUsers', data);
  },
  // 删除用户
  deleteUsers: function (data) {
    return post('/manage/user/delete', data);
  },
  // ---------------------- 题目相关 ----------------------
  // 查询题目列表
  getProblemManageList: function (params) {
    return get('/manage/problem/list', params);
  },
  // 查询题目
  getProblem: function (params) {
    return get('/manage/problem/query', params);
  },
  // 更新题目信息
  updateProblemInfo: function (data) {
    return post('/manage/problem/update', data);
  },
  // 创建题目
  createProblem: function (data) {
    return post('/manage/problem/create', data);
  },
  // ---------------------- 题面相关 ----------------------
  // 查询题目的描述列表
  getProblemDescriptionList: function (params) {
    return get('/manage/problem/queryDescriptionList', params);
  },
  // 查询题目描述
  getProblemDescription: function (params) {
    return get('/manage/problem/queryDescription', params);
  },
  // 更新题面描述
  updateDescription: function (data) {
    return post('/manage/problem/updateDescription', data);
  },
  // 创建新题面描述
  createDescription: function (data) {
    return post('/manage/problem/createDescription', data);
  },
  deleteDescription: function(params) {
    return get('/manage/problem/deleteDescription', params);
  },
  // ---------------------- 测试点相关 ----------------------
  // checkpoint单点上传
  uploadSingleCheckpoint: function (data) {
    return post('/manage/checkpoint/upload', data);
  },
  // checkpoint批量上传
  uploadCheckpointFiles: function (data) {
    return post('/manage/checkpoint/uploadFiles', data);
  },
  // 获取题目的checkpoint列表
  getCheckpointList: function (problemCode) {
    return get('/manage/checkpoint/list', { problemCode });
  },
  // 获取checkpoint详情
  getCheckpointPreview: function (checkpointId) {
    return get('/manage/checkpoint/query', { checkpointId });
  },
  // 全量更新题目的checkpoint
  updateProblemCheckpoints: function (data) {
    return post('/manage/problem/update', data);
  },
  // ---------------------- 比赛相关 ----------------------
  // 获取比赛列表
  getContestManageList: function (params) {
    return get('/manage/contest/page', params);
  },
  // 获取单个比赛详情
  getContestManage: function (params) {
    return get('/manage/contest/query', params);
  },
  // 更新比赛信息
  updateContest: function (data) {
    return post('/manage/contest/update', data);
  },
  // 创建比赛
  createContest: function (data) {
    return post('/manage/contest/create', data);
  },
  // 综合报表
  exportComprehensive: function (data) {
    return new Promise((resolve, reject) => {
      post('/manage/contest/exportComprehensiveReport', data, { responseType: 'blob' }).then(ret => {
        resolve(ret);
        const blob = new Blob([ret.data], { type: ret.headers['content-type'] });
        const elink = document.createElement('a');
        const filename = new Date().getTime().toString();
        if ('download' in elink) {
          elink.download = filename;
          elink.href = URL.createObjectURL(blob);
          elink.click();
          URL.revokeObjectURL(elink.href);
        } else {
          navigator.msSaveBlob(blob, filename);
        }
      }, err => (reject(err)));
    })
  },
  // ----------------- 评测模板相关 -------------------
  // 查询单个评测模板
  getOneTemplate: function(id) {
    return get('/manage/judgetemplate/query', { id });
  },
  // 查询多页评测模板
  pageTemplateList: function(params) {
    return get('/manage/judgetemplate/page', params);
  },
  getJudgeTemplateList: function(params) {
    return get('/manage/judgetemplate/list', params);
  },
  // 创建评测模板
  createTemplate: function(data) {
    return post('/manage/judgetemplate/create', data);
  },
  // 更新评测模板
  updateTemplate: function(data) {
    return post('/manage/judgetemplate/update', data);
  },
  // 评测模板title右模糊匹配
  queryTemplateTitle: function(title) {
    return get('/manage/judgetemplate/listByTitle', { title });
  },
  // ----------------- 评测模板相关 -------------------
  // 多文件上传
  multiUpload: function(data) {
    return post('/filesys/uploadFiles', data);
  },
  // 用 md5 查文件
  checkMD5: function(md5) {
    return get('/filesys/queryByMd5', { md5 });
  },
  download: function(fileId) {
    return new Promise((resolve, reject) => {
      axios.get('filesys/download/' + fileId + '/source', { responseType: 'blob' })
        .then(response => {
          resolve(response);

          const contentDisposition = response.headers['content-disposition'];
          const regex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
          const matches = regex.exec(contentDisposition);
          const filename = matches !== null
            ? matches[1].replace(/['"]/g, '')
            : new Date().getTime().toString();

          const blob = new Blob([response.data], { type: response.headers['content-type'] });
          const elink = document.createElement('a');

          if ('download' in elink) {
            elink.download = filename;
            elink.href = URL.createObjectURL(blob);
            elink.click();
            URL.revokeObjectURL(elink.href);
          } else {
            navigator.msSaveBlob(blob, filename);
          }
        })
        .catch(error => {
          reject(error);
        });
    })
  },
  // 以zip包下载多个文件
  zipDownload: function(data) {
    return new Promise((resolve, reject) => {
      post('filesys/zipDownload', data, { responseType: 'blob' }).then(ret => {
        resolve(ret);
        const blob = new Blob([ret.data], { type: ret.headers['content-type'] });
        const elink = document.createElement('a');
        const filename = new Date().getTime().toString();
        if ('download' in elink) {
          elink.download = filename;
          elink.href = URL.createObjectURL(blob);
          elink.click();
          URL.revokeObjectURL(elink.href);
        } else {
          navigator.msSaveBlob(blob, filename);
        }
      }, err => (reject(err)));
    })
  },
  /* ************ group ****************** */
  createGroup: function (data) {
    return post('/manage/group/create', data);
  },
  updateGroup: function (data) {
    return post('/manage/group/update', data);
  },
  getGroupManageDetail: function (params) {
    return get('/manage/group/query', params);
  },
  getGroupManageList: function (params) {
    return get('/manage/group/page', params);
  },
  updateUserStatus: function (data) {
    return post('/manage/group/updateUserStatus', data);
  },
  addUsersToGroup: function (data) {
    return post('/manage/group/addUser', data);
  },
  deleteGroup: function (params) {
    return get('/manage/group/delete', params);
  },
  queryGroupTitle: function (params) {
    return get('/manage/group/listByTitle', params);
  }
}
