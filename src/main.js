
// AJAX
import "./plugins/axios";
// 状态存储
import store from "@/store/index.js";
// 路由控制
import router from "@/router/index.js";
import "@/router/routerControl.js";
// Font Awesome
import "vue-awesome/icons";
import Icon from "vue-awesome/components/Icon";
Vue.component("v-icon", Icon);
// normalize.css
import "normalize.css/normalize.css";
// Element UI
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
// Main
import Vue from "vue";
import App from "@/App.vue";

Vue.config.productionTip = false;

new Vue({
  router: router,
  store: store,
  render: h => h(App)
}).$mount("#app");
