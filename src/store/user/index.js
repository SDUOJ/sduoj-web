export default {
  namespaced: true,
  state: {
    username: '',
    avatar: '',
    isLogin: false
  },
  mutations: {
    updateUsername(state, username) {
      state.username = username;
    },
    updateAvatar(state, avatar) {
      state.avatar = avatar;
    },
    updateLoginState(state, login) {
      state.isLogin = login;
    }
  },
  actions: {
    doLogin(context, payload) {
      const ret = {};
      // axios
      context.commit('updateUsername', payload.username);
      context.commit('updateAvatar', ret.avatar);
      context.commit('updateLoginState', true);
    }
  }
}