<template>
  <div id="layout">
    <NavBar></NavBar>
    <Breadcrumb class="container-nav">
      <BreadcrumbItem>Home</BreadcrumbItem>
      <BreadcrumbItem>Components</BreadcrumbItem>
      <BreadcrumbItem>Layout</BreadcrumbItem>
    </Breadcrumb>
    <div id="container">
      <router-view></router-view>
    </div>
    <div id="footer" v-once v-html='footerInfo'>
    </div>
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

<style lang="less" scoped>
#layout {
  height: 100%;
  border: 1px solid #d7dde4;
  // background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}

#container {
  min-height: 200px;
  margin: 0px 50px;
  border: 2px solid #f5f7f9;
  border-radius: 3px;
}

#footer {
  text-align: center;
  // background: #f5f7f9;
  padding: 24px 50px;
  color: #515a6e;
  font-size: 14px;
}

.container-nav {
  padding: 20px 50px;
}
</style>