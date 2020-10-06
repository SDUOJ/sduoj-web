<template>
  <div class="layout">
    <NavBar></NavBar>
    <transition name="fade" mode="out-in">
      <router-view v-if="isRouterAlive" />
    </transition>
    <div class="footer" v-html='copyright'></div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import NavBar from '_c/NavBar';
import api from '_u/api';

export default {
  components: { NavBar },
  provide: function() {
    return {
      reload: this.reload
    }
  },
  data: function() {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload: function() {
      this.isRouterAlive = false;
      this.$nextTick(() => (this.isRouterAlive = true));
    }
  },
  computed: {
    ...mapState(['copyright'])
  },
  async created() {
    this.$store.commit('updateCopyright', await api.getCopyright());
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
    }
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    })
  }
};
</script>

<style lang="less" scoped>
.fade-leave-active,
.fade-enter-active {
    transition: all 0.23s;
}
.fade-enter {
    opacity: 0;
    transform: translateY(30px);
}
.fade-leave-to {
    opacity: 0;
    transform: translateY(-30px);
}
</style>
