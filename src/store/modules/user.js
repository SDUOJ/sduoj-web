const state = {
  profile: {}
}

const getters = {
  profile: state => state.profile || {},
  username: state => state.profile.username || '',
  avatar: state => state.profile.avatar || '',
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