<template>
  <el-aside width="250px">
    <el-menu
      :collapse="this.$store.state.isCollapse"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#facf5a"
      :router="true"
      :default-active="this.$route.path"
    >
      <el-menu-item index="/home">
        <i class="el-icon-s-home" />
        <span>首页</span>
      </el-menu-item>
      <el-menu-item index="/problem">
        <i class="el-icon-document-copy" />
        <span>题库</span>
      </el-menu-item>
      <el-menu-item index="/contest">
        <i class="el-icon-s-data" />
        <span>比赛</span>
      </el-menu-item>
      <el-menu-item index="/record">
        <i class="el-icon-document-checked" />
        <span>提交记录</span>
      </el-menu-item>
      <el-menu-item @click="logout" class="logout">
        <i class="el-icon-switch-button" />
        <span>登出</span>
      </el-menu-item>
      <!-- <el-menu-item index="/my-apply">
        <el-badge
          :hidden="$store.state.app.myApply.untreated <= 0"
          :value="$store.state.app.myApply.untreated"
          class="item"
        >
          <i class="el-icon-document"></i> <span>预约历史</span>
        </el-badge>
      </el-menu-item> -->
      <el-menu-item
        v-if="$store.state.user.permission === 0"
        index="/submission"
      >
        <el-badge
          :hidden="$store.state.app.submission.length <= 0"
          :value="$store.state.app.submission.length"
          class="item"
        >
          <i class="el-icon-setting"></i> <span>处理请求</span>
        </el-badge>
      </el-menu-item>
      <el-menu-item v-if="$store.state.user.permission === 0" index="/add-room">
        <i class="el-icon-circle-plus"></i> <span>添加教室</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  methods: {
    logout: function() {
      this.$store.dispatch("logout");
    }
  }
};
</script>

<style>
.el-badge__content {
  top: 17px !important;
  right: -13px !important;
}
</style>

<style scoped>
.logout {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
}
.el-menu {
  height: 100%;
  user-select: none;
}
</style>
