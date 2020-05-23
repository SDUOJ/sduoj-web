<template>
  <div class="problem_profile">
    <el-row :gutter="10">
      <el-col :span="4">
        <el-button
          type="info"
          icon="el-icon-back"
          style="width:100%;"
          @click="gotoProblem"
        >P{{ this.submission_data.problemId }}</el-button>
      </el-col>
      <el-col :span="20" class="record_profile_label">
        <span>
          <b>用户</b>
          ：{{ this.$store.state.user.username }}
        </span>
        <span></span>
        <span>
          <b>结果</b>
          ：{{ INT_TO_JADGE_STATUS[this.submission_data.judgeResult] }}
        </span>
      </el-col>
    </el-row>

    <div class="result_list_div">
      <el-card
        v-loading="item[0] === 0"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(236, 240, 241,0.83)"
        :body-style="{ padding: '17px' }"
        :style='"background-color:"+INT_TO_COLOR[item[0]]+";"'
        shadow="never"
        class="result_card"
        v-for="(item, index) in table_data"
        :key="index"
      >
        <div class="card_judge_result">{{ INT_TO_JADGE_STATUS_2[item[0]] }}</div>
        <div class="card_judge_profile">
          {{ item[1] }} ms
          <br />
          {{ item[2] }} KB
        </div>
      </el-card>
      <i></i>
      <i></i>
      <i></i>
      <i></i>
      <i></i>
      <i></i>
      <i></i>
      <i></i>
      <i></i>
      <i></i>
    </div>

    <pre v-highlightjs="submission_data.code"><code style="font-family: Menlo, Monaco, 'Courier New', monospace;" class="cpp"></code></pre>

    <!-- {{ submission_data }} -->
    <!-- {{ table_data }} -->
  </div>
</template>

<script>
import { post } from "../api/api.js";
import {
  INT_TO_JADGE_STATUS,
  INT_TO_JADGE_STATUS_2,
  INT_TO_COLOR
} from "../const";
import Vue from "vue";

export default {
  data() {
    return {
      table_data: [],
      submission_data: "",
      INT_TO_JADGE_STATUS: INT_TO_JADGE_STATUS,
      INT_TO_JADGE_STATUS_2: INT_TO_JADGE_STATUS_2,
      INT_TO_COLOR: INT_TO_COLOR
    };
  },
  methods: {
    // 请求数据
    async fetchData() {
      try {
        let res = await post("/submit/query", {
          submissionId: this.$route.params.sid
        });
        this.submission_data = res;
      } catch (error) {
        console.log("获取题面错误：", error);
      }
    },
    gotoProblem: function() {
      this.$router.push("/problem/" + this.submission_data.problemId);
    }
  },
  async mounted() {
    // 调用请求数据的方法
    //   judge_result: 0,
    //   time_use: 0
    //   memory_use: 0,

    await this.fetchData();

    for (let i = 0; i < this.submission_data.checkpointNum; i++) {
      this.table_data.push([0, 0, 0]);
    }
    if (this.submission_data.judgeResult !== 0) {
      this.table_data = this.submission_data.checkpointResults;
    } else {
      let socket = new WebSocket(
        "ws://api.oj.xrvitd.com:8080/api/submit/listen/" +
          this.$route.params.sid
      );
      socket.onmessage = event => {
        let tmp = JSON.parse(event.data);
        if (tmp[0]) {
          console.log("socket 的 event：" + tmp);
          Vue.set(this.table_data, parseInt(tmp[0]), [tmp[1], tmp[2], tmp[3]]);
        } else if (tmp.submissionId) {
          socket.close();
          console.log(tmp);
          this.submission_data.judgeResult = tmp.judgeResult;
          console.log("socket 关闭");
          if (this.submission_data.judgeResult === 8) {
            for (let i = 0; i < this.submission_data.checkpointNum; i++) {
              Vue.set(this.table_data, i, [8, 0, 0]);
            }
          }
        }
      };
    }
  }
};
</script>

<style scoped>
.result_list_div {
  margin-top: 13px;
  margin-bottom: 13px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
}
.record_profile_label {
  line-height: 27px;
  height: 27px;
  font-size: 23px;
}
.record_profile_label > span {
  line-height: 27px;
  height: 27px;
  font-size: 23px;
}
.result_list_div > i {
  width: 111px;
  margin: 7px;
}
.result_card {
  color: white;
  margin: 7px;
  width: 111px;
  height: 111px;
  text-align: center;
}
.card_checkpoint_id {
  display: none;
}
.card_judge_result {
  font-size: 29px;
  font-weight: bold;
}
.card_judge_profile {
  margin-top: 7px;
}
</style>
