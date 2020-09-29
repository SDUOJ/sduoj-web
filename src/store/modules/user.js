import md5 from '@/utils/md5';

const state = {
  profile: {}
}

const getters = {
  profile: state => state.profile || {},
  username: state => state.profile.username,
  avatar: state => 'https://www.gravatar.com/avatar/' + md5(state.profile.email || '') + '?s=200&d=mp&r=g',
  isLogin: state => !!state.profile.userId,
  isVerified: state => !!state.profile.emailVerified
}

const mutations = {
  setProfile: function(state, profile) {
    state.profile = Object.assign({}, profile);
    window.localStorage.setItem('isLogin', !!profile.userId);
  },
  clearProfile: function(state) {
    state.profile = {};
    window.localStorage.clear();
  }
}

const actions = {
  setProfile({ commit }, profile) {
    commit('setProfile', profile);
  },
  clearProfile({ commit }) {
    commit('clearProfile'); 
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}