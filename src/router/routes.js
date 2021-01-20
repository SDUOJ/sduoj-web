/*
 * Copyright 2020-2021 the original author or authors.
 *
 * Licensed under the General Public License, Version 3.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.gnu.org/licenses/gpl-3.0.en.html
 */

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
    component: () => import('@/views/problem/ProblemListView'),
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
    component: () => import('@/views/submission/SubmissionListView')
  },
  {
    name: 'submission-detail',
    path: '/submission/:submissionId',
    meta: { scrollToTop: true },
    component: () => import('@/views/submission/SubmissionDetailView')
  },
  {
    name: 'contest',
    path: '/contest',
    component: () => import('@/views/contest/ContestListView')
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
        component: () => import('@/views/contest/ContestOverviewView')
      },
      {
        name: 'contest-problem',
        path: 'problem/:problemCode',
        component: () => import('@/views/problem/ProblemDetailView')
      },
      {
        name: 'contest-submission',
        path: 'submission',
        meth: { scrollToTop: true },
        component: () => import('@/views/submission/SubmissionListView')
      },
      {
        name: 'contest-submission-detail',
        path: 'submission/:submissionId',
        meta: { scrollToTop: true },
        component: () => import('@/views/submission/SubmissionDetailView')
      },
      {
        name: 'contest-rank',
        path: 'rank',
        meta: { scrollToTop: true },
        component: () => import('@/views/contest/ContestRankView')
      }
    ]
  },
  {
    name: 'group',
    path: '/group',
    component: () => import('@/views/group/GroupListView')
  },
  {
    name: 'group-detail',
    path: '/group/:groupId',
    component: () => import('@/views/group/GroupDetailView')
  },
  {
    path: '*',
    name: '404',
    component: () => import('@/views/404View')
  }
]

export default routes;
