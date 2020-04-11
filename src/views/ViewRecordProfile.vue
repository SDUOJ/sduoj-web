<template>
    <div class="problem_profile">
        <el-row :gutter="10">
            <el-col :span="4">
                <el-button type="info" icon="el-icon-back" style="width:100%;">P{{ this.submission_data.problemId }}</el-button>
            </el-col>
            <el-col :span="20" class="record_profile_label">
                <span><b>用户</b>：{{ this.submission_data.userId }}</span>
                <span> </span>
                <span><b>结果</b>：{{ INT_TO_JADGE_STATUS[this.submission_data.judgeResult] }}</span>
            </el-col>
        </el-row>

        <div class="result_list_div">
            <el-card
                v-loading="item.judge_result === 0"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(236, 240, 241,0.83)"
                :body-style="{ padding: '17px' }"
                shadow="never"
                class="result_card"
                v-for="item in table_data"
                :key="item.id"
            >
                <div class="card_judge_result">{{ INT_TO_JADGE_STATUS_2[item.judge_result] }}</div>
                <div class="card_judge_profile">
                    {{ item.time_use }} ms
                    <br />
                    {{ item.memory_use / 1000 }} KB
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

        <el-card class="source_code_div " shadow="never">
            {{ this.submission_data.code }}
        </el-card>

        {{ submission_data }}
        {{ socket_test }}
    </div>
</template>

<script>
import { post } from "../api/api.js";
import { INT_TO_JADGE_STATUS, INT_TO_JADGE_STATUS_2 } from "../const";

export default {
    data() {
        return {
            table_data: [],
            submission_data: "",
            INT_TO_JADGE_STATUS: INT_TO_JADGE_STATUS,
            INT_TO_JADGE_STATUS_2: INT_TO_JADGE_STATUS_2,
            socket_test: "",
            socket: new WebSocket("ws://121.40.165.18:8800")
        };
    },
    methods: {
        // 请求数据
        async fetchData() {
            try {
                let res = await post("/submit/query", {
                    submissionId: parseInt(this.$route.params.sid)
                });
                this.submission_data = res;
            } catch (error) {
                console.log("获取题面错误：", error);
            }
        }
    },
    mounted() {
        // 调用请求数据的方法
        for (let i = 0; i <= 8; i++) {
            this.table_data.push({
                checkpoint_id: "fask23hjkh23",
                judge_result: i,
                memory_use: 13000,
                time_use: 567
            });
        }
        this.fetchData();

        this.socket.onmessage = event => {
            console.log(event);
            this.socket_test = event.data;
        };
        this.socket.send("12313");
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
    background-color: green;
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
