<template>
  <div id="layout">
    <NavBar></NavBar>
    <div id="container">
      <Breadcrumb class="container-nav">
          <BreadcrumbItem>Home</BreadcrumbItem>
          <BreadcrumbItem>Components</BreadcrumbItem>
          <!-- <BreadcrumbItem>Layout</BreadcrumbItem> -->
      </Breadcrumb>
      <Card>
          <div style="min-height: 200px;">
              Content
          </div>
      </Card>
    </div>
    <div id="footer">2020-2020 &copy; Shandong University</div>
  </div>
</template>
<script>
import NavBar from './components/NavBar.vue';
export default {
  components: { NavBar }
};
</script>

<style lang="less" scoped>
#layout {
  height: 100%;
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}

#container {
  height: 100%;
  padding: 0 50px;
}

#footer {
  text-align: center;
  background: #f5f7f9;
  padding: 24px 50px;
  color: #515a6e;
  font-size: 14px;
}

.container-nav {
  padding: 20px 0;
}
</style>