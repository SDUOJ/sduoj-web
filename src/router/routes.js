const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/user/Login')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/user/Register')
  },
  {
    path: '/resetpass',
    name: 'reset-password',
    component: () => import('@/views/user/ResetPass')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/HomeView'),
    meta: { title: '首页' }
  },
  {
    path: '/problem',
    name: 'problem',
    component: () => import('@/views/problem/ProblemView'),
    meta: { title: '题库' }
  },
  {
    path: '/problem/:problemCode',
    name: 'problem-detail',
    component: () => import('@/views/problem/ProblemDetailView')
  },
  {
    path: '/user',
    name: 'user',
    meta: { login: true },
    component: () => import('@/views/user/UserHome')
  },
  {
    path: '/submission',
    name: 'submission',
    component: () => import('@/views/submission/SubmissionView')
  },
  {
    path: '/submission/:submissionId',
    name: 'submission-detail',
    component: () => import('@/views/submission/SubmissionDetailView')
  },
  {
    path: '*',
    name: '404',
    component: () => import('@/views/404View')
  }
]

export default routes;