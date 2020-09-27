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
  }
};
</script>

<style lang="less">
.container {
  max-width: 1100px;
  margin: 0 auto;
}

.clearfix:after {
  content: '';
  clear:both;
  display: table;
}
</style>