<template>
    <header class="header">
        <el-menu mode="horizontal" background-color="#24292e" text-color="#fff" active-text-color="#cc8e35" :router="true" :default-active="this.$route.path">
            <el-menu-item index="/">
                <i class="el-icon-s-home" />
                <span>首页</span>
            </el-menu-item>
            <el-menu-item index="/problem">
                <i class="el-icon-document-copy" />
                <span>题库</span>
            </el-menu-item>
            <el-menu-item index="/contest">
                <i class="el-icon-s-data" />
                <span>比赛</span>
            </el-menu-item>
            <el-menu-item index="/record">
                <i class="el-icon-document-checked" />
                <span>提交记录</span>
            </el-menu-item>

            <el-submenu id="sdu_header_suer" :router="false">
                <template slot="title">
                    <span class="username">{{ username }}</span>
                    <el-avatar class="avatar" shape="square" :size="31" src="https://api.uomg.com/api/rand.avatar"> </el-avatar
                ></template>
                <el-menu-item index="sdu_header_suer_1" route="/"><i class="el-icon-user-solid" />个人中心</el-menu-item>
                <el-menu-item index="sdu_header_suer_2" @click="logout"> <i class="el-icon-error" />登出</el-menu-item>
            </el-submenu>

            <el-menu-item v-if="$store.state.user.permission === 0" index="/submission">
                <el-badge :hidden="$store.state.app.submission.length <= 0" :value="$store.state.app.submission.length" class="item">
                    <i class="el-icon-setting"></i> <span>处理请求</span>
                </el-badge>
            </el-menu-item>
            <el-menu-item v-if="$store.state.user.permission === 0" index="/add-room"> <i class="el-icon-circle-plus"></i> <span>添加教室</span> </el-menu-item>
        </el-menu>
    </header>
</template>

<script>
export default {
    
    computed: {
        username() {
            return this.$store.state.user.username;
        }
    },
    methods: {
        logout: function() {
            this.$store.dispatch("logout");
        }
    }
};
</script>

<style scoped>
.header {
    user-select: none;
}
#sdu_header_suer {
    float: right;
}
#sdu_header_suer .username {
    font-weight: bold;
    margin-right: 10px;
}
#sdu_header_suer .avatar {
    margin-right: 10px;
}
</style>
