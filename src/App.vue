<template>
  <div class="layout">
    <NavBar></NavBar>
    <div>
      <router-view></router-view>
    </div>
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
.layout {
  height: 100%;
  border: 1px solid #d7dde4;
  // background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}

.container {
  min-height: 200px;
  margin: 30px 50px 24px;
  // border: 2px solid #f5f7f9;
  border-radius: 3px;
}

.footer {
  text-align: center;
  // background: #f5f7f9;
  padding: 24px 50px 24px;
  color: #515a6e;
  font-size: 14px;
}

</style>