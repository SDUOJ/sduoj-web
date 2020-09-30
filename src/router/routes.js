// general
import HomeView from '@/views/HomeView';
import NotFoundView from '@/views/404View';

// problem
import ProblemView from '@/views/problem/ProblemView';
import ProblemDetailView from '@/views/problem/ProblemDetailView';

// submission
import SubmissionView from '@/views/submission/SubmissionView';
import SubmissionDetailView from '@/views/submission/SubmissionDetailView';

// user
import LoginView from '@/views/user/Login';
import RegisterView from '@/views/user/Register';
import ResetPassView from '@/views/user/ResetPass';
import UserHomeView from '@/views/user/UserHome'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    component: LoginView
  },
  {
    path: '/register',
    component: RegisterView
  },
  {
    path: '/resetpass',
    component: ResetPassView
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
  },
  {
    path: '/user',
    component: UserHomeView
  },
  {
    path: '/submission',
    component: SubmissionView
  },
  {
    path: '/submission/:submissionId',
    component: SubmissionDetailView
  },
  {
    path: '*',
    component: NotFoundView
  }
]

export default routes;