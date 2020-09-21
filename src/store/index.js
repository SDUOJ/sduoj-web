import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    footerInfo: '2020-2020 &copy Shandong University',
    pathFromHome: [],
    currentUser: ''
  },
  mutations: {
    updateFooterInfo(state, info) {
      state.footerInfo = info;
    },
    updatePathFromHome(state, path) {
      state.pathFromHome = path;
    },
    doLogin(state, user) {
      Object.assign(state.currentUser, user);
    }
  },
  actions: {
    doLogin(context, username, password) {
      //
      context.commit('doLogin', username);
    }
  },
  modules: {
  }
})
