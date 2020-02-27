import router from "@/router/index.js";
import store from "@/store/index.js";
import NProgress from "nprogress"; // Progress 进度条
import "@/css/nprogress.css"; // Progress 进度条样式
// import Cookie from "js-cookie";

NProgress.configure({ showSpinner: false });

router.beforeEach((to, from, next) => {
  NProgress.start();

  // 如果没有登陆 且不是前往 login
  console.log(store.state.user.username);
  console.log(to.path);
  console.log(store.state.user.username === "");
  console.log(to.path !== "/login");
  
  if (store.state.user.username === "" && to.path !== "/login") {
    console.log("login", to.path);
    next("/login");
    // store.dispatch("login", { to: to }).catch(e => {
    //   console.log(e);
    //   next("/login");
    // });
  } else {
    console.log("else", to.path);
    // if (!store.state.app.s1) store.dispatch("getRooms");
    // if (!store.state.app.s2) store.dispatch("getMyApply");
    // if (!store.state.app.s3) store.dispatch("getSubmission");
    next();
  }
});

router.afterEach(() => {
  NProgress.done();
});
