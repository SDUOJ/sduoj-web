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
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.push = function push(location) {
  const that = this;
  return originalPush.call(that, location).catch(_ => {
    location.query = location.query || {};
    location.query._t = Date.now();
    originalReplace.call(that, location);
  });
};

const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    // savedPosition is only available for popstate navigations.
    return savedPosition
  } else {
    const position = {}
    // new navigation.
    // scroll to anchor by returning the selector
    if (to.hash) {
      position.selector = to.hash
    }
    // check if any matched route config has meta that requires scrolling to top
    if (to.matched.some(m => m.meta.scrollToTop)) {
      // cords will be used if no selector is provided,
      // or if the selector didn't match any element.
      position.x = 0
      position.y = 0
    }
    // if the returned position is falsy or an empty object,
    // will retain current scroll position.
    return position
  }
}

const router = new VueRouter({
  // 路由中的 #
  mode: 'history',
  scrollBehavior,
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
