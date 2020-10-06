import api from '_u/api';

const state = {
  contest: {
    features: {},
    problems: [],
    participants: []
  },
  questions: []
}

const getters = {
  contestLoaded: state => !!state.contest.contestId,
  openness: state => state.contest.features.openness,
  needPassword: (state, getters, rootState, rootGetters) => {
    return !state.contest.participants.includes(rootGetters['user/username']);
  },
  startTime: state => new Date(parseInt(state.contest.gmtStart)),
  endTime: state => new Date(parseInt(state.contest.gmtEnd))
}

const mutations = {
  setContest: function(state, payload) {
    state.contest = payload.contest;
  },
  clearContest: function(state) {
    state.contest = {
      features: {},
      problems: [],
      participants: []
    };
    state.questions = [];
    state.acProblems = [];
  }
}

const actions = {
  getContest: function({ commit, dispatch }, contestId) {
    return new Promise((resolve, reject) => {
      api.getContest(contestId).then(contest => {
        resolve(contest);
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
