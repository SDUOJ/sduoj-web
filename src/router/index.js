import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProblemView from '../views/problem/ProblemView.vue'
import NotFoundView from '../views/404View.vue'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: HomeView
  },
  {
    path: '/problem',
    component: ProblemView
  },
  {
    path: '*',
    component: NotFoundView
  }
]

const router = new VueRouter({
  routes
})

export default router
