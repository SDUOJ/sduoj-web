<template>
    <div class="tab_list">
        <div class="tab_item" v-for="item in tab_list" :key="item.problem_id">
            <div class="tab_item_left">P{{ item.problem_id }}：{{ item.problem_title }}</div>

            <i class="el-icon-close tab_close"></i>
        </div>
    </div>
</template>

<script>
import { post } from "../api/api.js";

export default {
    data() {
        return {
            tab_list: [
                {
                    problem_id: "1001",
                    problem_title: "A+B"
                },
                {
                    problem_id: "1002",
                    problem_title: "狼抓兔子"
                }
            ],
            items: [{ message: "Foo" }, { message: "Bar" }]
        };
    },
    methods: {
        // 请求数据
        async fetchData() {}
    }
};
</script>

<style scoped>
.tab_list {
    z-index: 2004;
    position: fixed;
    /* width: 30%; */
    top: 129px;
    height: 400px;
    /* background-color: violet; */
}
.tab_item {
    margin-bottom: 20px;
    /* box-sizing: border-box; */
    /* padding: 7px; */
    /* height: 30px; */
    width: 197px;
    height: 40px;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    border-radius: 0 4px 4px 0;
}
.tab_item_left {
    width: 157px;
    height: 100%;
    line-height: 40px;
    padding-left: 7px;
    box-sizing: border-box;
    /* padding-top: 7px; */
    font-size: 19px;
    display: inline-block;

    cursor: pointer;
}
.tab_item_left:hover {
    color: white;
    background-color: teal;
}
.tab_close {
    height: 40px;
    width: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 31px;
    float: right;
    cursor: pointer;

    border-radius: 0 4px 4px 0;
}
.tab_close:hover {
    color: white;
    background-color: tomato;
}
</style>
