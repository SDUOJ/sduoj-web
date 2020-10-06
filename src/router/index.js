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
        query: {
          to: to.path
        }
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
