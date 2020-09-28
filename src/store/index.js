import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user';

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
    updatePathComponents(state, route) {
      let matched = route.matched;
      console.log(matched)
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
