/*
 * Copyright 2020-2020 the original author or authors.
 *
 * Licensed under the General Public License, Version 3.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.gnu.org/licenses/gpl-3.0.en.html
 */

import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import api from '_u/api';

Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  Vue.prototype.$Loading.start();
  if (to.matched.some(route => route.meta.login)) {
    api.getProfile(_ => {
      next();
    }, _ => {
      Vue.prototype.$Message.error('Please login first');
      next({
        name: 'login',
        query: { to: to.fullPath }
      });
    })
  } else {
    next();
  }
})

router.afterEach((to, from, next) => {
  Vue.prototype.$Loading.finish();
})

export default router;
