const routes = [
  {
    redirect: '/home',
    path: '/'
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/user/Login')
  },
  {
    name: 'register',
    path: '/register',
    component: () => import('@/views/user/Register')
  },
  {
    name: 'reset-password',
    path: '/resetpass',
    component: () => import('@/views/user/ResetPass')
  },
  {
    name: 'home',
    path: '/home',
    component: () => import('@/views/HomeView'),
    meta: { title: '首页' }
  },
  {
    name: 'user',
    path: '/user',
    meta: { login: true },
    component: () => import('@/views/user/UserHome')
  },
  {
    name: 'problem',
    path: '/problem',
    component: () => import('@/views/problem/ProblemView'),
    meta: { title: '题库' }
  },
  {
    name: 'problem-detail',
    path: '/problem/:problemCode',
    component: () => import('@/views/problem/ProblemDetailView')
  },
  {
    name: 'submission',
    path: '/submission',
    component: () => import('@/views/submission/SubmissionView')
  },
  {
    name: 'submission-detail',
    path: '/submission/:submissionId',
    component: () => import('@/views/submission/SubmissionDetailView')
  },
  {
    name: 'contest',
    path: '/contest',
    component: () => import('@/views/contest/ContestView')
  },
  {
    name: 'contest-detail',
    path: '/contest/:contestId',
    redirect: '/contest/:contestId/overview',
    meta: { login: true },
    component: () => import('@/views/contest/ContestDetailView'),
    children: [
      {
        name: 'contest-overview',
        path: 'overview',
        component: () => import('@/views/contest/children/ContestOverviewView')
      },
      {
        name: 'contest-problem',
        path: 'problem/:problemCode',
        component: () => import('@/views/problem/ProblemDetailView')
      },
      {
        name: 'contest-submission',
        path: 'submission',
        component: () => import('@/views/submission/SubmissionView')
      },
      {
        name: 'contest-submission-detail',
        path: 'submission/:submissionId',
        component: () => import('@/views/submission/SubmissionDetailView')
      },
      {
        name: 'contest-rank',
        path: 'rank',
        component: () => import('@/views/contest/children/ContestRank')
      }
    ]
  },
  {
    path: '*',
    name: '404',
    component: () => import('@/views/404View')
  }
]

export default routes;
