import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    copyright: '',
    pathComponents: []
  },
  mutations: {
    updateCopyright(state, copyright) {
      state.copyright = copyright;
    },
    updatePathComponents(state, route) {
      let matched = route.matched;
      if (matched.length === 0 || matched[0].name !== 'home') {
        matched = [{ path: '/home', meta: { title: '首页' } }].concat(matched);
      }
      state.pathComponents = matched;
    }
  },
  actions: {
  },
  modules: {
    user: user
  }
})
