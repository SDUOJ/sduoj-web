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
import api from '_u/api';
import moment from 'moment';
import { CONTEST_STATUS, CONTEST_OPENNESS, JUDGE_RESULT } from '_u/constants';
import { s2hs } from '_u/transform';
import rankHandler, { calculateScore } from './ranks';

const state = {
  contest: {
    features: {},
    problems: [],
    participants: []
  },
  problems: [],
  questions: [],
  allSubmissions: [],
  likedScoresMap: {},
  settings: {
    showPractice: false
  },
  scoreTimer: null,
  sliderTime: null
}

const getters = {
  contestLoaded: state => {
    return !!state.contest.contestId;
  },
  contestId: state => {
    return state.contest.contestId;
  },
  contestStatus: (state, getters, rootState) => {
    const now = rootState.now;
    if (getters.contestStartTime > now) {
      return CONTEST_STATUS.UPCOMING;
    } else if (getters.contestEndTime < now) {
      return CONTEST_STATUS.FINISHED;
    } else {
      return CONTEST_STATUS.RUNNING;
    }
  },
  contestStarted: (state, getters, rootState) => {
    return rootState.now >= getters.contestStartTime;
  },
  contestOpenness: state => {
    return state.contest.features.openness;
  },
  publicContest: (state, getters) => {
    return getters.contestOpenness === CONTEST_OPENNESS.PUBLIC;
  },
  protectedContest: (state, getters) => {
    return getters.contestOpenness === CONTEST_OPENNESS.PROTECTED;
  },
  privateContest: (state, getters) => {
    return getters.contestOpenness === CONTEST_OPENNESS.PRIVATE;
  },
  contestMode: state => {
    return state.contest.features.mode;
  },
  hasParticipatedIn: (state, getters, rootState, rootGetters) => {
    return state.contest.participants.includes(rootGetters['user/username']);
  },
  contestStartTime: state => {
    return moment(new Date(parseInt(state.contest.gmtStart)));
  },
  contestEndTime: state => {
    return moment(new Date(parseInt(state.contest.gmtEnd)));
  },
  contestDuration: (state, getters) => {
    return getters.contestEndTime - getters.contestStartTime;
  },
  countdown: (state, getters, rootState) => {
    if (getters.contestStatus === CONTEST_STATUS.UPCOMING) {
      const duration = moment.duration(getters.contestStartTime.diff(rootState.now, 'seconds'), 'seconds');
      if (duration.weeks() > 0) {
        return 'Before the contest: ' + duration.humanize();
      } else {
        return '-' + s2hs(getters.contestStartTime - rootState.now);
      }
    } else if (getters.contestStatus === CONTEST_STATUS.RUNNING) {
      return s2hs(getters.contestEndTime - rootState.now);
    } else {
      return 'FINISHED';
    }
  },
  scores: (state, getters, rootState) => {
    if (!state.allSubmissions) {
      return [];
    }
    const handler = rankHandler[getters.contestMode];
    let scores = [];
    let endTime = null;
    if (getters.contestStatus === CONTEST_STATUS.FINISHED) {
      if (state.sliderTime) {
        endTime = state.sliderTime;
      } else if (!state.settings.showPractice) {
        endTime = getters.contestEndTime;
      }
    }

    state.allSubmissions.forEach(score => {
      scores.push(
        calculateScore(
          score,
          state.contest.gmtStart,
          state.contest.problems.map(problem => problem.problemWeight),
          handler.calculateProblemResult,
          handler.formatProblemResults,
          endTime
        )
      );
    });
    scores = handler.calculateRank(scores);

    // first blood
    const firstSolvedMap = {};
    scores.forEach(score => {
      for (let i = 0; i < score.problemNum; ++i) {
        const result = score.problemResults[i];
        if (JUDGE_RESULT.AC === result.judgeResult) {
          if (!firstSolvedMap[result.problemCode] || firstSolvedMap[result.problemCode] > result.gmtCreate) {
            firstSolvedMap[result.problemCode] = result.gmtCreate;
          }
        }
      }
    });
    scores.forEach(score => {
      for (let i = 0; i < score.problemNum; ++i) {
        const result = score.problemResults[i];
        if (JUDGE_RESULT.AC === result.judgeResult && firstSolvedMap[result.problemCode] === result.gmtCreate) {
          result.css = 'score_first';
        }
      }
    });
    for (let i = 0; i < state.contest.problems.length; ++i) {
      let judgeResult = -1;
      scores.forEach(score => {
        if (score.user.userId === rootState.user.profile.userId) {
          judgeResult = score.problemResults[i].judgeResult;
        }
      });
      Vue.set(state.contest.problems[i], 'judgeResult', judgeResult);
    }
    return scores;
  },
  likedScores: (state, getters, rootState) => {
    let likedScores = [];
    if (getters.scores) {
      likedScores = getters.scores.filter(score => state.likedScoresMap[score.user.userId] || score.user.userId === rootState.user.profile.userId);
    }
    return likedScores;
  }
}

const mutations = {
  setContest: function(state, payload) {
    state.contest = payload.contest;
    state.problems = [];
    for (let i = 1; i <= payload.contest.problems.length; ++i) {
      state.problems.push({
        problemCode: i.toString()
      });
    }
  },
  setProblemDetail: function(state, payload) {
    state.problems.splice(parseInt(payload.problem.problemCode) - 1, 1, { ...payload.problem, _valid: true });
  },
  setAllSubmissions: function(state, payload) {
    state.allSubmissions = payload.allSubmissions;
  },
  setScoreTimer: function(state, payload) {
    state.scoreTimer = setInterval(() => {
      this.dispatch('contest/getQuestions');
      this.dispatch('contest/getContestRank');
      if (this.getters['contest/contestStatus'] === CONTEST_STATUS.FINISHED && this.state.contest.scoreTimer) {
        clearInterval(this.state.contest.scoreTimer);
        this.state.contest.scoreTimer = null;
      }
    }, payload.interval);
  },
  setSliderTime: function(state, payload) {
    state.sliderTime = payload.sliderTime;
  },
  setScoreLiked: function(state, payload) {
    Vue.set(state.likedScoresMap, this.getters['contest/scores'][payload.index].user.userId, payload.status);
  },
  setSettings: function(state, payload) {
    for (const key in payload.settings) {
      Vue.set(state.settings, key, payload.settings[key]);
    }
  },
  clearContest: function(state) {
    if (state.scoreTimer) {
      clearInterval(state.scoreTimer);
      state.scoreTimer = null;
    }
    state.contest = {
      features: {},
      problems: [],
      participants: []
    };
    state.questions = [];
    state.problems = [];
    state.allSubmissions = [];
    state.likedScoresMap = {};
    state.settings = {
      showPractice: false
    }
  }
}

const actions = {
  getContest: function({ commit, dispatch }, contestId) {
    return new Promise((resolve, reject) => {
      api.getContest(contestId).then(contest => {
        resolve(contest);
        commit('setContest', { contest });
        const contestStatus = this.getters['contest/contestStatus'];
        if (contestStatus === CONTEST_STATUS.RUNNING) {
          dispatch('getQuestions');
          dispatch('getContestRank');
          commit('setScoreTimer', { interval: 30000 });
        } else if (contestStatus === CONTEST_STATUS.FINISHED) {
          dispatch('getQuestions');
          dispatch('getContestRank');
        }
      }, err => (reject(err)));
    });
  },
  getQuestions: function() {

  },
  getContestRank: function({ commit }) {
    return new Promise((resolve, reject) => {
      api.getContestRank(this.getters['contest/contestId']).then(ret => {
        resolve(ret);
        commit('setAllSubmissions', { allSubmissions: ret });
      }, err => (reject(err)));
    })
  },
  settings: function({ commit }, settings) {
    commit('setSettings', { settings });
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
