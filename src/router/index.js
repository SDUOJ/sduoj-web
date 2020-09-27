import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView';
import ProblemView from '../views/problem/ProblemView';
import ProblemDetailView from '../views/problem/ProblemDetailView';
import NotFoundView from '../views/404View';
import Login from '../components/Login';

Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta: { title: '首页' }
  },
  {
    path: '/problem',
    name: 'problem',
    component: ProblemView,
    meta: { title: '题库' }
  },
  {
    path: '/problem/:id',
    component: ProblemDetailView
    // meta: { title: }
  },
  {
    path: '*',
    component: NotFoundView
  }
];

const router = new VueRouter({
  routes
});

export default router;
