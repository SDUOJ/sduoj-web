<template>
    <div>
        <el-row :gutter="10">
            <el-col :xs="24" :sm="24" :md="18">
                <div class="problem_content">
                    <VueShowdown :markdown="problem_content" flavor="github" />
                </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="6">
                <div class="grid-content bg-purple-light">fs</div>
            </el-col>
        </el-row>
        User {{ $route.params.pid }}
    </div>
</template>

<script>
import { post } from "../api/api.js";

export default {
    data() {
        return {
            problem_content: "",
            page_size: 50,
            page_count: 1,
            search_pid: 1001,
            tableData: []
        };
    },
    methods: {
        // 请求数据
        async fetchData() {
            try {
                let res = await post("/problem/query", {
                    id: parseInt(this.$route.params.pid)
                });
                this.problem_content = res.description;
            } catch (error) {
                console.log("获取题面错误：", error);
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
.problem_content {
    text-align: left;
    color: #5c5c5c;
    font: 19px/1.6 "TIBch", "Classic Grotesque W01", "Avenir Next", "Segoe UI", "Helvetica Neue", Arial, "Hiragino Sans GB", "PingFang SC", "Heiti SC",
        "Noto Sans CJK SC", "Source Han Sans SC", "Microsoft YaHei UI", "Microsoft YaHei", sans-serif;
}
.problem_content::selection {
    background-color: #ffe150;
}
.problem_content::-moz-selection {
    background-color: #ffe150;
}
.problem_content::-webkit-selection {
    background-color: #ffe150;
}
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
