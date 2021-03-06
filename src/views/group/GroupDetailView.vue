<!--
   Copyright 2020-2021 the original author or authors.

   Licensed under the General Public License, Version 3.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

        https://www.gnu.org/licenses/gpl-3.0.en.html
 -->

<template>
  <div class="container">
    <div class="spin-container center" v-if="spinShow">
      <Spin size="large" fix />
    </div>
    <Row v-else>
      <Col span="18">
        <Card style="margin-right: 30px;" dis-hover>
          <div class="profile-header">
            <div class="profile-header__content">
              <GroupCard :group="group" />
            </div>
          </div>
          <div class="profile-content">
            <Tabs value="announcement" @on-click="onClickTabs" :animated="false">
              <TabPane label="Announcement" name="announcement">
                <Markdown v-if="group.markdown" :value="group.markdown" />
              </TabPane>
              <TabPane label="Contest" name="contest">
                <ContestInGroup ref="contestList" />
              </TabPane>
            </Tabs>
          </div>
        </Card>
      </Col>
      <Col span="6">
        <Card dis-hover :title="`Members (${members.length})`" :padding="0">
          <div slot="extra" class="card-extra">
            <Input placeholder="Find" suffix="ios-search" v-model="search"/>
          </div>
          <Scroll :height="500">
            <List size="small">
              <ListItem v-for="member in members" :key="member.userId" >
                <UserCard :email="member.email" :username="member.username" :nickname="member.nickname" />
              </ListItem>
            </List>
          </Scroll>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import Markdown from '_c/editor/Markdown';
import ContestInGroup from '_c/group/ContestInGroup';
import GroupCard from '_c/group/GroupCard';
import UserCard from '_c/UserCard';

import api from '_u/api';

export default {
  name: 'GroupDetailView',
  components: { Markdown, ContestInGroup, UserCard, GroupCard },
  data: function () {
    return {
      group: {
        owner: {},
        members: []
      },
      spinShow: false,
      search: ''
    }
  },
  methods: {
    getGroupDetail: function (groupId) {
      this.spinShow = true;
      api.getGroupDetail({ groupId }).then(ret => {
        this.group = ret;
      }).catch(err => {
        this.$Message.error(err.message);
      }).finally(() => {
        this.spinShow = false;
      });
    },
    getContestList: function () {
      this.$refs.contestList.setGroupId(this.groupId);
      this.$refs.contestList.getContestList();
    },
    onClickTabs: function (name) {
      if (name === 'contest') {
        this.getContestList();
      }
    }
  },
  computed: {
    groupId: function() {
      return this.$route.params.groupId;
    },
    members: function () {
      if (this.search === '') {
        return this.group.members;
      }
      return this.group.members.filter(o => {
        return String(o.userId) === this.search ||
          o.username.startsWith(this.search) ||
          o.nickname.startsWith(this.search);
      });
    }
  },
  mounted: function () {
    this.getGroupDetail(this.groupId);
  }
}
</script>

<style lang="less" scoped>
.profile-header {
  position: relative;
  background-position: 50%;
  background-size: cover;
  min-height: 16.875rem;
  padding-bottom: 4.0625rem;
}

.profile-header__content {
  position: relative;
  padding: 1.5625rem .9375rem 0;
}

.profile-content {
  position: relative;
  z-index: 2;
  margin-top: -2.8125rem;
}
</style>
