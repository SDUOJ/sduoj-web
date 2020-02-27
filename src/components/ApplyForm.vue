<template>
  <el-form ref="form" v-model="form" label-width="80px">
    <el-form-item label="*活动名称">
      <el-input v-model="form.title"></el-input>
    </el-form-item>
    <el-form-item label="场地要求">
      <el-checkbox-group v-model="form.options">
        <el-checkbox label="茶水" name="type"></el-checkbox>
        <el-checkbox label="多媒体" name="type"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="*活动内容">
      <el-input type="textarea" v-model="form.introduction"></el-input>
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
