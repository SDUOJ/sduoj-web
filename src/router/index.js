import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

import Layout from "@/layout/Layout";

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/login",
      component: () => import("@/views/Login")
    },
    {
      path: "/404",
      component: () => import("@/views/404")
    }, 
    {
      path: "/",
      component: Layout,
      children: [
        {
          path: "",
          redirect: "/home"
        },
        {
          path: "home",
          component: () => import("@/views/ViewState.vue")
        },
        {
          path: "problem",
          component: () => import("@/views/Problem.vue")
        },
        {
          path: "contest",
          component: () => import("@/views/Contest.vue")
        },
        {
          path: "record",
          component: () => import("@/views/Record.vue")
        }
      ]
    },
    {
      path: "*",
      redirect: "/404"
    }
  ]
});
