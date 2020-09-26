<template>
  <div class="layout">
    <NavBar></NavBar>
    <router-view></router-view>
    <div class="footer" v-once v-html='footerInfo'></div>
  </div>
</template>
<script>
import NavBar from './components/NavBar.vue';
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

<style lang="less" scoped>
.layout {
  min-width: 900px;
  margin-top: 50px;
  padding-top: 24px;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.footer {
  text-align: center;
  padding: 50px 50px 24px;
  color: #515a6e;
  font-size: 14px;
}
</style>