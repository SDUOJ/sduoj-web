import Vue from 'vue'
import Vuex from 'vuex'

import UserModule from './user';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    footerInfo: '2020-2020 &copy Shandong University',
    pathComponents: []
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
    }
  },
  actions: {
  },
  modules: {
    user: UserModule
  }
})
