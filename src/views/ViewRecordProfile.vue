<template>
    <div class="problem_profile">
        {{data}}
    </div>
</template>

<script>
import { post } from "../api/api.js";

export default {
    data() {
        return {
            data:''
        };
    },
    methods: {
        // 请求数据
        async fetchData() {
            try {
                let res = await post("/submit/query", {
                    id: parseInt(this.$route.params.sid)
                });
                this.data = res;
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
