import { post } from "@/api/api.js";
import router from "@/router/index.js";
export default {
  state: {
    username: "",
    nickname: "",
    permission: ""
  },
  mutations: {
    SET_USERNAME(state, payload) {
      state.username = payload;
    },
    SET_NICKNAME(state, payload) {
      state.nickname = payload;
    },
    SET_PERMISSION(state, payload) {
      state.permission = payload;
    }
  },
  actions: {
    login: async function({ commit }, payload) {
      let res = await post("/user/login", {
        account: payload.username,
        password: payload.password
      });      
      commit("SET_USERNAME", res.account);
      commit("SET_NICKNAME", res.nickname);
      commit("SET_PERMISSION", res.permission);
      router.push(payload.to);
    },
    // 登出，后端会删除 cookie 的
    logout: function() {
      post("/logout", {});
      router.push("/login");
    }
  }
};
