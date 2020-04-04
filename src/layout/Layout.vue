<template>
    <div class="container">
        <!-- <Tab /> -->
        <Header />
        <transition name="fade-transform" mode="out-in">
            <main class="main_div">
                <router-view />
            </main>
        </transition>
        <Footer />

       
    </div>
</template>

<script>
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import Tab from "./Tab.vue";

export default {
    components: {
        Header,
        Footer,
        Tab
    }
};
</script>

<style scoped>
.main_div {
    width: 67%;
    min-width: 800px;
    min-height: 720px;
    margin: 43px auto 0px auto;
}

.container {
    z-index: 0;
    background-color: rgb(248, 248, 245);
}

.fade-transform-leave-active,
.fade-transform-enter-active {
    transition: all 0.23s;
}
.fade-transform-enter {
    opacity: 0;
    transform: translateX(-30px);
}
.fade-transform-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
</style>
