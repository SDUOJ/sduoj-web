import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

import Layout from "../layout/Layout.vue";
import Problem from "../views/ViewProblem.vue";
import ProblemProfile from "../views/ViewProblemProfile.vue";

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/login",
            component: () => import("@/views/ViewLogin")
        },
        {
            path: "/404",
            component: () => import("@/views/View404")
        },
        {
            path: "/",
            component: Layout,
            children: [
                {
                    path: "",
                    component: () => import("@/views/ViewHome.vue")
                },
                {
                    path: "problem",
                    component: Problem
                },
                {
                    path: "problem/:pid",
                    component: ProblemProfile
                },
                {
                    path: "contest",
                    component: () => import("@/views/ViewContest.vue")
                },
                {
                    path: "record",
                    component: Problem
                }
            ]
        },
        {
            path: "*",
            redirect: "/404"
        }
    ]
});
