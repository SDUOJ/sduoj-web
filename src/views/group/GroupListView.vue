<template>
  <div class="container">
      <div class="center search-title">
        <Row type="flex" align="middle">
          <Col span="9">
            <h1>Groups</h1>
          </Col>
          <Col span="15">
            <Input :value="title" @on-search="onSearchGroup" search enter-button placeholder="Search other groups" style="width: 500px" />
          </Col>
        </Row>
      </div>

      <div class="spin-container center" v-if="spinShow">
        <Spin size="large" fix />
      </div>
      <template v-else-if="groupList.length > 0">
        <Row :gutter="20">
          <Col span="6" v-for="group in groupList" :key="group.groupId">
            <Card class="group-card" :padding="10">
              <GroupCard :group="group" size="small" @click-title="toGroupDetail" />
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
      </template>
      <h1 v-else class="nogroup-hint">No groups</h1>
  </div>
</template>

<script>
import { Page } from '_c/mixins';
import GroupCard from '_c/group/GroupCard';

import api from '_u/api';

export default {
  name: 'GroupListView',
  components: { GroupCard },
  mixins: [Page],
  data: function () {
    return {
      groupList: [],
      spinShow: false,
      pageSizeOpts: [20, 40, 80, 100]
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
      this.spinShow = true;
      api.getGroupList({
        pageNow: this.pageNow,
        pageSize: this.pageSize,
        title: this.title
      }).then(ret => {
        this.groupList = ret.rows;
      }).catch(err => {
        this.$Message.error(err.message);
      }).finally(() => {
        this.spinShow = false;
      });
    },
    onSearchGroup: function (title) {
      this.$router.replace({
        query: {
          ...this.$route.query,
          title
        }
      });
    }
  },
  computed: {
    title: {
      get: function () {
        return this.$route.query.title || '';
      },
      set: function (title) {
        this.$router.push({ query: { ...this.$route.query, title } });
      }
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
.search-title {
  display: table;
  width: 100%;
  margin-bottom: 1.0625rem;
  h1 {
    color: #515a6e;
    position: absolute;
    right: 1.25rem;
    top: -1.385rem;
  }
}

.nogroup-hint {
  display: block;
  width: 100%;
  text-align: center;
  margin: 20px auto;
  color: #c5c8ce;
  h1 {
    display: block;
    font-size: 40px;
    line-height: 80px;
  }
}
</style>
