<template>
    <div class="nav-path">
      <div class="container">
        <Breadcrumb>
          <BreadcrumbItem v-for="item in pathComponents" :key="item.id">
            <span @click="$router.push(item.url)">{{ item.name }}</span>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
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
  margin-bottom: 24px;
  background-color: #fff;
  span {
    font-size: 17px;
    :hover {
      cursor: pointer;
    }
  }
}
</style>