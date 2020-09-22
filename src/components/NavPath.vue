<template>
    <div class="nav-path">
        <Breadcrumb>
            <BreadcrumbItem v-for="item in pathComponents" :key="item.id">
            <span @click="$router.push(item.url)">{{ item.name }}</span>
            </BreadcrumbItem>
        </Breadcrumb>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['pathComponents'])
  }
}
</script>

<style lang="less" scoped>
.nav-path {
  padding: 12px 50px;
  border-bottom: 1px solid #f3f4f5;
  background-color: #f5f7f9;
  span {
    font-size: 17px;
    :hover {
      cursor: pointer;
    }
  }
}
</style>