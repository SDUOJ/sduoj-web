<template>
  <div class="layout">
    <NavBar></NavBar>
    <router-view></router-view>
    <div class="footer" v-once v-html='footerInfo'></div>
  </div>
</template>
<script>
import NavBar from '@/components/NavBar';
import { mapState } from 'vuex';

export default {
  components: { NavBar },
  computed: {
    ...mapState(['footerInfo'])
  },
  created() {
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
    }
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    })
  }
};
</script>

<style lang="less">
.container {
  max-width: 1300px;
  margin: 0 auto;
}

.clearfix:after {
  content: '';
  clear:both;
  display: table;
}
</style>