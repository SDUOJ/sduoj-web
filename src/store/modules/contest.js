/*
 * Copyright 2020-2020 the original author or authors.
 *
 * Licensed under the General Public License, Version 3.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.gnu.org/licenses/gpl-3.0.en.html
 */

import api from '_u/api';

const state = {
  contest: {
    features: {},
    problems: [],
    participants: []
  },
  problems: [],
  questions: []
}

const getters = {
  contestLoaded: state => !!state.contest.contestId,
  openness: state => state.contest.features.openness,
  needPassword: (state, getters, rootState, rootGetters) => !state.contest.participants.includes(rootGetters['user/username']),
  startTime: state => new Date(parseInt(state.contest.gmtStart)),
  endTime: state => new Date(parseInt(state.contest.gmtEnd))
}

const mutations = {
  setContest: function(state, payload) {
    state.contest = payload.contest;
    for (let i = 1; i <= payload.contest.problems.length; ++i) {
      state.problems.push({
        problemCode: i.toString()
      });
    }
  },
  setProblemDetail: function(state, payload) {
    state.problems.splice(parseInt(payload.problem.problemCode) - 1, 1, { ...payload.problem, _valid: true });
  },
  clearContest: function(state) {
    state.contest = {
      features: {},
      problems: [],
      participants: []
    };
    state.questions = [];
    state.problems = [];
  }
}

const actions = {
  getContest: function({ commit, dispatch }, contestId) {
    return new Promise((resolve, reject) => {
      api.getContest(contestId).then(contest => {
        resolve(contest);
        // redundent
        for (let i = 0; i < contest.problems.length; ++i) {
          contest.problems[i].acceptNum = 10;
          contest.problems[i].submitNum = 10;
          contest.problems[i].judgeResult = 1;
        }
        commit('setContest', { contest });
        dispatch('getQuestions');
      }, err => (reject(err)));
    });
  },
  getQuestions: function() {

  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}