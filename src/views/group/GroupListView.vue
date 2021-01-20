<template>
  <div class="container">
    <Card dis-hover title="My Groups">
    <div slot="extra" class="card-extra">
      <Input placeholder="Search a group" suffix="ios-search"/>
    </div>
    <Row type="flex" justify="space-between" :gutter="20">
      <Col span="6" v-for="group in groupList" :key="group.id">
        <Card class="group-card">
          <p slot="title">{{ group.name }}</p>
          <a slot="extra" @click.prevent="toGroupDetail(group.id)">View</a>
          <p>{{ group.description }}</p>
        </Card>
      </Col>
    </Row>
    <div class="footer-tools">
      <Page
        class="center"
        size="small" show-elevator show-sizer
        :total="total"
        :current.sync="pageNow"
        :page-size="pageSize"
        :page-size-opts="pageSizeOpts"
        @on-change="onPageChange"
        @on-page-size-change="onPageSizeChange"/>
    </div>
    </Card>
  </div>
</template>

<script>
import { Page } from '_c/mixins';

export default {
  name: 'GroupListView',
  mixins: [Page],
  data: function () {
    return {
      groupList: []
    }
  },
  methods: {
    toGroupDetail: function (groupId) {
      this.$router.push({
        name: 'group-detail',
        params: { groupId }
      });
    },
    getGroupList: function () {
    }
  },
  mounted: function () {
    this.getGroupList();
  },
  watch: {
    $route: function () {
      this.getGroupList();
    }
  }
}
</script>

<style lang="less" scoped>
.group-card {
  margin: 10px;
}
</style>
