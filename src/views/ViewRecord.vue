<template>
    <div>
        <el-row :gutter="10">
            <el-col :span="10">
                <el-input v-model="this.problem_id" placeholder="所有题目">
                    <template slot="prepend">题号</template>
                </el-input>
            </el-col>
            <el-col :span="10">
                <el-input v-model="this.username" placeholder="所有用户">
                    <template slot="prepend">用户名</template>
                </el-input>
            </el-col>
            <el-col :span="4">
                <el-button type="success" style="width:100%;">查找</el-button>
            </el-col>
        </el-row>
        <div class="problem_list_div">
            <el-table :data="this.table_data" stripe style="width: 100%">
                <!-- <el-table-column prop="submission_id" label="id" align="center" width="130"> </el-table-column> -->
                <el-table-column prop="problem_id" label="题号" align="center" width="70"> </el-table-column>
                <el-table-column label="题目" width="auto">
                    <router-link class="link_a" :to="'/problem/' + scope.row.problem_id" slot-scope="scope">
                        {{ scope.row.problem_title }}
                    </router-link>
                </el-table-column>
                <el-table-column prop="username" label="提交者" align="center" width="80"> </el-table-column>
                <el-table-column label="结果" align="center" width="100">
                    <router-link class="link_a" :to="'/record/' + scope.row.submission_id" slot-scope="scope">
                        {{ scope.row.reason }}
                    </router-link>
                </el-table-column>
                <!-- <el-table-column prop="reason" label="结果" align="center" width="80"> </el-table-column> -->
                <el-table-column prop="score" label="得分" align="center" width="80"> </el-table-column>
                <el-table-column prop="time_use" label="用时" align="center" width="80"></el-table-column>
                <el-table-column prop="memory_use" label="内存" align="center" width="80"></el-table-column>
                <el-table-column prop="language" label="语言" align="center" width="100"> </el-table-column>
                <el-table-column prop="problem_id" label="内存" align="center" width="80"> </el-table-column>
                <el-table-column prop="submit_time" label="提交时间" align="center" width="120"> </el-table-column>
            </el-table>
            <div class="pagination_div">
                <el-pagination background layout="prev, pager, next" :page-size="this.page_size" :page-count="this.page_count" :hide-on-single-page="true" />
            </div>
        </div>
    </div>
</template>

<script>
import { post } from "../api/api.js";
import dayjs from "dayjs";
export default {
    data() {
        return {
            page_now: 1,
            page_size: 50,
            page_count: 1,
            problem_id: "",
            username: this.$store.state.user.username,
            table_data: []
        };
    },
    methods: {
        // 请求数据
        async fetchData() {
            try {
                let res = await post("/record/list", {
                    pageNow: this.page_now,
                    pageSize: this.page_size,
                    username: "",
                    problemId: ""
                });
                console.log(res);
                this.page_count = res.totalPage;
                for (const item of res.rows) {
                    this.table_data.push({
                        // submission_id: "#" + Math.floor(Math.random() * 10000000).toString(),
                        // problem_id: item.id,
                        // problem_title: item.problemName,
                        // username: Math.floor(Math.random() * 10000000).toString(36),
                        // score: Math.floor(Math.random() * 100),
                        // reason: ["Accepted", "java 8", "python 3.8"][Math.floor(Math.random() * 3)],
                        // time_use: Math.floor(Math.random() * 1000).toString() + "ms",
                        // memory_use: Math.floor(Math.random() * 1000).toString() + "MB",
                        // language: ["c++ 11", "java 8", "python 3.8"][Math.floor(Math.random() * 3)],
                        // submit_time: dayjs(Math.floor(Math.random() * 1e13)).format('MM-DD HH:mm:ss')
                        submission_id: item.submissionId,
                        problem_id: item.problemId,
                        problem_title: "",
                        username: "",
                        score: "",
                        time_use: "",
                        memory_use: "",
                        language: "",
                        submit_time: ""
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
