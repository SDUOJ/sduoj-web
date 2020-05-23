<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="20">
        <el-input v-model="this.problem_id" placeholder="所有题目">
          <template slot="prepend">题号</template>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="success" style="width:100%;">查找</el-button>
      </el-col>
    </el-row>
    <div class="problem_list_div">
      <el-table :data="this.tableData" stripe style="width: 100%">
        <el-table-column prop="problem_id" label="题号" align="center" width="160"></el-table-column>
        <el-table-column label="题目" width="auto">
          <router-link
            class="link_a"
            :to="'/problem/' + scope.row.problem_id"
            slot-scope="scope"
          >{{ scope.row.problem_title }}</router-link>
        </el-table-column>
        <el-table-column prop="rate" label="通过率" align="center" width="200"></el-table-column>
      </el-table>
      <div class="pagination_div">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="this.page_size"
          :page-count="this.page_count"
          :hide-on-single-page="true"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { post } from "../api/api.js";

export default {
  data() {
    return {
      page_now: 1,
      page_size: 50,
      page_count: 1,
      problem_id: 1001,
      tableData: []
    };
  },
  methods: {
    // 请求数据
    async fetchData() {
      try {
        let res = await post("/problem/list", {
          pageNow: this.page_now,
          pageSize: this.page_size
        });
        console.log(res);
        this.page_count = res.totalPage;
        for (const item of res.rows) {
          this.tableData.push({
            problem_id: item.problemId,
            problem_title: item.problemTitle,
            rate: item.submitNum + "/" + item.acceptNum
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
