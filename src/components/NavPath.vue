<template>
    <div class="nav-path">
      <div class="container">
        <Breadcrumb>
          <BreadcrumbItem v-for="item in pathComponents" :key="item.path">
            <span @click="$router.push(item.path)">{{ item.meta.title }}</span>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapState(['pathComponents'])
  },
  watch: {
    $route: function() {
      this.updatePathComponents(this.$route);
    }
  },
  methods: {
    ...mapMutations(['updatePathComponents'])
  },
  created: function() {
    this.updatePathComponents(this.$route);
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