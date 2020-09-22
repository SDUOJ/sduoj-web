import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    footerInfo: '2020-2020 &copy Shandong University',
    pathComponents: [],
    currentUser: ''
  },
  mutations: {
    updateFooterInfo(state, info) {
      state.footerInfo = info;
    },
    updatePathComponents(state, paths) {
      state.pathComponents = [{
        name: 'Home',
        url: '/'
      }, ...paths]
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
