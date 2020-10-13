/*
 * Copyright 2020-2020 the original author or authors.
 *
 * Licensed under the General Public License, Version 3.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.gnu.org/licenses/gpl-3.0.en.html
 */

import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user';
import contest from './modules/contest';

import moment from 'moment';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    copyright: '',
    now: moment()
  },
  mutations: {
    updateCopyright: function(state, payload) {
      state.copyright = payload.copyright;
    },
    updateNow: function(state, payload) {
      state.now = moment(new Date(parseInt(payload.now)));
    },
    addOneSecond: function(state) {
      state.now = moment(state.now.add(1, 'seconds'));
    }
  },
  actions: {
  },
  modules: {
    user,
    contest
  }
})
