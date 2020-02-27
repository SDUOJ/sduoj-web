import { post, get } from "@/api/api.js";
import store from "@/store/index.js";
import router from "@/router/index.js";
export default {
  state: {
    s1: false,
    s2: false,
    s3: false,
    rooms: [],
    myApply: {
      untreated: 0,
      list: []
    },
    submission: {
      length: 0,
      list: []
    }
  },
  mutations: {
    SET_ROOMS(state, payload) {
      state.rooms = payload;
    },
    SET_MY_APPLY(state, payload) {
      state.myApply.list = payload.list;
      state.myApply.untreated = payload.untreated;
    },
    SET_SUBMISSION(state, payload) {
      state.submission.length = payload.length;
      state.submission.list = payload.list;
    },
    UNTREATED_INCREASE(state) {
      state.myApply.untreated++;
    },
    SUBMISSION_INCREASE(state) {
      state.submission.length++;
    },
    UNTREATED_REDUCE(state) {
      state.myApply.untreated--;
    },
    SUBMISSION_REDUCE(state) {
      state.submission.length--;
    },
    SET_S1(state) {
      state.s1 = true;
    },
    SET_S2(state) {
      state.s2 = true;
    },
    SET_S3(state) {
      state.s3 = true;
    }
  },
  actions: {
    getRooms: async function({ commit }) {
      console.log("getRoom");
      let res = await get("/room-list", {});
      commit("SET_ROOMS", res.room);
      commit("SET_S1");
    },
    getMyApply: async function({ commit }) {
      let res = await get("/my-apply", { sid: store.state.user.sid });
      let payload = { untreated: 0, list: res.apply };
      for (let x of payload.list) {
        if (x.state === 2) payload.untreated++;
      }
      commit("SET_MY_APPLY", payload);
      commit("SET_S2");
    },
    getSubmission: async function({ commit }) {
      let res = await get("/apply", {});
      let payload = { length: res.apply.length, list: res.apply };
      commit("SET_SUBMISSION", payload);
      commit("SET_S3");
    },
    newApply: async function({ commit }, payload) {
      await post("/new-apply", payload);
      store.dispatch("getRooms");
      store.dispatch("getMyApply");
      store.dispatch("getSubmission");
    },
    cancelApply: async function({ commit }, payload) {
      await post("/delete-apply", payload);
      store.dispatch("getRooms");
      store.dispatch("getMyApply");
      store.dispatch("getSubmission");
    },
    approval: async function({ commit }, payload) {
      await post("/approval", payload);
      store.dispatch("getRooms");
      store.dispatch("getMyApply");
      store.dispatch("getSubmission");
    },
    addRoom: async function({ commit }, payload) {
      await post("/add-room", payload);
      store.dispatch("getRooms");
      router.push("/");
    },
    changePassword: async function({ commit }, payload) {
      await post("/change-password", payload);
    }
  }
};
