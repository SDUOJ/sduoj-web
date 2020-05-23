<template>
  <div class="problem_profile">
    <h1 align="center">P{{ problem_id }}: {{ problem_title }}</h1>
    <el-tabs v-model="activeTab" type="border-card">
      <el-tab-pane label="题面" name="first">
        <div class="markdown-body problem_content">
          <VueShowdown :markdown="problem_content" flavor="github" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="提交" name="second">
        <el-row :gutter="10">
          <el-col :span="20">
            <el-input type="textarea" :autosize="{ minRows: 2 }" v-model="submit_code"></el-input>
          </el-col>
          <el-col :span="4" class="language_button">
            <div class="language_group">
              <label>程序语言：</label>
              <el-checkbox v-model="language_is_cpp11" label="C++ 11"></el-checkbox>
              <el-checkbox v-model="language_is_python38" label="Python 3.8" disabled></el-checkbox>
            </div>

            <!-- <el-radio-group class="radio_group" v-model="language_id">
                            <el-radio class="button" label="cpp11" border>C++ 11</el-radio
                            ><el-radio class="button" label="python3.8" border>Python 3.8</el-radio>
            </el-radio-group>-->
            <el-button @click="submit_func" class="button" type="success">提交</el-button>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="统计" name="third">这是统计页面</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// import {Han} from "han-css";
import { post } from "../api/api.js";
import router from "../router/index.js";

export default {
  data() {
    return {
      activeTab: "first",
      problem_id: "1001",
      problem_title: "标题",
      problem_content: "",
      submit_code: "",
      language_is_cpp11: true,
      language_is_python38: false
    };
  },
  methods: {
    // 请求数据
    async fetchData() {
      try {
        let res = await post("/problem/query", {
          problemId: parseInt(this.$route.params.pid)
        });
        this.problem_content = res.markdown;
        this.problem_title = res.problemTitle;
        this.problem_id = res.problemId;
      } catch (error) {
        console.log("获取题面错误：", error);
      }
    },
    async submit_func() {
      let res = await post("/submit/create", {
        problemId: parseInt(this.problem_id),
        languageId: 1,
        code: this.submit_code
      });
      this.$message({
        message: "提交成功",
        type: "success"
      });
      this.$router.push("/record/" + res.toString());
    }
  },
  mounted() {
    // 调用请求数据的方法
    this.fetchData();
  }
};
</script>

<style scoped>
.problem_content {
  width: 100%;
  text-align: left;
  padding: 30px;
  background-clip: padding-box;
  box-sizing: border-box;
}
.problem_content img {
  display: block;
  margin: auto;
  max-width: 89%;
  text-align: center;
  margin-bottom: 20px;
}
.language_group {
  display: block;
  width: 100%;
  margin: 20px auto 40px 10px;
}
.button {
  width: 100%;
  margin-bottom: 40px;
}
</style>
