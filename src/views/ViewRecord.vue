<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="10">
        <el-input v-model="problem_id" placeholder="所有题目">
          <template slot="prepend">题号</template>
        </el-input>
      </el-col>
      <el-col :span="10">
        <el-input v-model="username" placeholder="所有用户">
          <template slot="prepend">用户名</template>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="success" style="width:100%;" @click="fetchData">查找</el-button>
      </el-col>
    </el-row>
    <div class="problem_list_div">
      <el-table :data="table_data" stripe style="width: 100%">
        <!-- <el-table-column prop="submission_id" label="id" align="center" width="130"> </el-table-column> -->
        <el-table-column prop="problem_id" label="题号" align="center" width="70"></el-table-column>
        <el-table-column label="题目" width="auto">
          <router-link
            class="link_a"
            :to="'/problem/' + scope.row.problem_id"
            slot-scope="scope"
          >{{ scope.row.problem_title }}</router-link>
        </el-table-column>
        <el-table-column prop="username" label="提交者" align="center" width="80"></el-table-column>
        <el-table-column label="结果" align="center" width="100" >
          <router-link
            class="link_a"
            :to="'/record/' + scope.row.submission_id"
            slot-scope="scope"
            :style='"color:"+INT_TO_COLOR[scope.row.judge_result_id]+";"'
          >{{ scope.row.judge_result }}</router-link>
        </el-table-column>
        <!-- <el-table-column prop="reason" label="结果" align="center" width="80"> </el-table-column> -->
        <el-table-column prop="score" label="得分" align="center" width="80"></el-table-column>
        <el-table-column prop="time_use" label="用时" align="center" width="80"></el-table-column>
        <el-table-column prop="memory_use" label="内存" align="center" width="80"></el-table-column>
        <el-table-column prop="language" label="语言" align="center" width="100"></el-table-column>
        <el-table-column prop="submit_time" label="提交时间" align="center" width="120"></el-table-column>
      </el-table>
      <div class="pagination_div">
        <el-pagination
          background
          layout="prev, pager, next"
          :current-page.sync="this.page_now"
          :page-size="this.page_size"
          :page-count="this.page_count"
          :hide-on-single-page="true"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { post } from "../api/api.js";
import dayjs from "dayjs";
import {
  INT_TO_JADGE_STATUS,
  INT_TO_JADGE_STATUS_2,
  INT_TO_COLOR
} from "../const";
export default {
  data() {
    return {
      page_now: 1,
      page_size: 50,
      page_count: 1,
      problem_id: null,
      username: this.$store.state.user.username,
      table_data: [],
      INT_TO_JADGE_STATUS_2: INT_TO_JADGE_STATUS_2,
      INT_TO_COLOR: INT_TO_COLOR
    };
  },
  methods: {
    // 请求数据
    handleCurrentChange(page){
      console.log("page ",page);
      console.log("page now",this.page_now);
      console.log("page_count",this.page_now);
      this.page_now=page;
      this.fetchData();
    },
    async fetchData() {
      try {
        
        
        if(this.problem_id!==null) {
          this.problem_id = parseInt(this.problem_id);
        }
        let res = await post("/submit/list", {
          pageNow: this.page_now,
          pageSize: this.page_size,
          username: this.username,
          problemId: this.problem_id
        });
        this.page_count = res.totalPage;
        this.table_data = [];
        for (const item of res.rows) {
          this.table_data.push({
            submission_id: item.submissionId,
            problem_id: item.problemId,
            problem_title: item.problemTitle,
            username: item.username,
            judge_result_id: item.judgeResult,
            judge_result: INT_TO_JADGE_STATUS_2[item.judgeResult],
            score: item.judgeScore+"分",
            time_use: item.usedTime+"ms",
            memory_use: item.usedMemory+"KB",
            language: "CPP11",
            submit_time: dayjs(item.createTime*1000).format("MM-DD HH:mm:ss")
          });
        }
      } catch (error) {
        console.log("获取题目列表错误：", error);
      }
    }
  },
  mounted() {
    // 调用请求数据的方法
    this.fetchData();
  }
};
</script>

<style scoped>
.search_div {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.problem_list_div {
  padding: 11px;
  background-color: white;
  margin-top: 13px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.pagination_div {
  margin: 7px auto auto auto;
  text-align: center;
}
</style>
