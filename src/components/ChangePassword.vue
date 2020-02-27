<template>
  <el-form ref="form" v-model="form" label-width="120px">
    <el-form-item label="旧密码">
      <el-input v-model="form.password"></el-input>
    </el-form-item>
    <el-form-item label="新密码">
      <el-input v-model="form.newPassword"></el-input>
    </el-form-item>
    <el-form-item label="重复一遍新密码">
      <el-input v-model="form.newPassword0"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: ["inForm"],
  data: function() {
    return {
      form: this.inForm
    };
  }
};
</script>
