/*
 * Copyright 2020-2022 the original author or authors.
 *
 * Licensed under the Affero General Public License, Version 3.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.gnu.org/licenses/agpl-3.0.en.html
 */

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import './plugins/clipboard2';
import './plugins/highlight';
import './plugins/iviewui';

import './styles/rank.css';
Vue.config.productionTip = false;

Vue.prototype.$Message.config({
  duration: 3,
  top: 60
});

Vue.directive('format', {
  inserted: function (el) {
    if (el.innerText.length === 3) {
      el.innerText = '';
      return;
    }
    const tar = el.innerText.substring(2, el.innerText.length - 1)
    if (tar === null || parseInt(tar) < 60) return;
    el.innerText = el.innerText.substring(0, 2) + parseInt((tar) / 60) + '°' + parseInt(tar) % 60 + '\'';
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
