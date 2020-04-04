import { post } from "@/api/api.js";
import router from "@/router/index.js";
export default {
    state: {
        username: "",
        nickname: "",
        permission: "",
        is_logined: false // 临时测试所以改成 true 了ßß
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
        },
        SET_IS_LOGINED(state, payload) {
            state.is_logined = payload;
        }
    },
    actions: {
        login: async function({ commit }, payload) {
            let res = await post("/auth/login", {
                username: payload.username,
                password: payload.password
            });
            commit("SET_IS_LOGINED", true);
            router.push(payload.to);
        },
        // 登出，后端会删除 cookie 的
        logout: function() {
            post("/auth/logout", {});
            router.push("/login");
        }
    }
};
