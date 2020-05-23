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
import "./css/element-variables.scss";
Vue.use(ElementUI);
// VueShowdown
import VueShowdown from "vue-showdown";
Vue.use(VueShowdown);
// Main
import Vue from "vue";
import App from "@/App.vue";

Vue.config.productionTip = false;

import "github-markdown-css";
import "./css/global.css";
// var Han = require("han-css");
// Han.init();
// Import Vue and vue-highlgihtjs
import VueHighlightJS from 'vue-highlightjs'
import 'highlight.js/styles/atom-one-dark.css'
// Tell Vue.js to use vue-highlightjs
Vue.use(VueHighlightJS)

new Vue({
    router: router,
    store: store,
    render: h => h(App)
}).$mount("#app");
