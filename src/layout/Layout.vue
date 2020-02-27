<template>
  <el-container class="container">
    <a-side />

    <el-container>
      <el-header> <header /> </el-header>
      <transition name="fade-transform" mode="out-in">
        <el-main>
          <router-view />
        </el-main>
      </transition>
    </el-container>
  </el-container>
</template>

<script>
import ASide from "./ASide.vue";
import Header from "./Header.vue";

export default {
  components: {
    ASide,
    Header
  }
};
</script>

<style scoped>
.container {
  height: 100%;
}

.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.23s;
}
.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}
.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
