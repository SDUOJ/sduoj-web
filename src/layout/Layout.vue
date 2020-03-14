<template>
    <div class="container">
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

export default {
    components: {
        Header,
        Footer
    }
};
</script>

<style scoped>
.main_div {
    width: 80%;
    min-height: 720px;
    margin: 37px auto 0px auto;
}

.container {
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
