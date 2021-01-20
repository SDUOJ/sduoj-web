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
              <div class="media">
                <div class="media__left">
                  <img src="//cn.gravatar.com/avatar/?d=mm&s=200&r=g" width="120" height="120" class="avatar">
                </div>
                <div class="media__body profile-header__main">
                  <h1>
                    {{ group.title }}
                    <small>(Group ID: {{ group.id }})</small>
                  </h1>
                  <p>Created by
                    <Tooltip placement="bottom" theme="light">
                      <span class="hover" style="color: #17233d; font-size: 17px;text-decoration: underline">{{ group.owner.username }}</span>
                      <UserCard slot="content" :email="group.owner.email" :username="group.owner.username" :nickname="group.owner.nickname" />
                    </Tooltip>
                    at {{ group.gmtCreate | timeformat('yyyy-MM-DD HH:mm:ss') }}
                  </p>
                  <p>{{ group.description }}</p>

                  <div class="profile-header__tool-bar">
                    <template v-if="group.openness === GROUP_OPENNESS_TYPE.PRIVATE">
                      <Button type="info" disabled>Private</Button>
                    </template>
                    <template v-else>
                      <Button type="default" v-if="group.status === GROUP_STATUS_TYPE.APPLIED">Applied</Button>
                      <Button type="warning" v-else-if="group.status === GROUP_STATUS_TYPE.JOINED">Exit</Button>
                      <Button type="error" v-else-if="group.status === GROUP_STATUS_TYPE.REJECTED">Rejected</Button>
                      <Button type="info" v-else>Join</Button>
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="profile-content">
            <Tabs value="announcement" @on-click="onClickTabs" :animated="false">
              <TabPane label="Announcement" name="announcement">
                <Markdown v-if="group.markdown" :value="group.markdown"/>
              </TabPane>
              <TabPane label="Contest" name="contest">
                <ContestInGroup ref="contestList" />
              </TabPane>
            </Tabs>
          </div>
        </Card>
      </Col>
      <Col span="6">
        <Card dis-hover title="Members" :padding="0">
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
import UserCard from '_c/UserCard';
import moment from 'moment';

import api from '_u/api';
import { getGravatarUrl } from '_u/md5';
import { GROUP_OPENNESS_TYPE, GROUP_STATUS_TYPE } from '_u/constants';

export default {
  name: 'GroupDetailView',
  components: { Markdown, ContestInGroup, UserCard },
  data: function () {
    return {
      group: {
        owner: {}
      },
      spinShow: false,
      search: ''
    }
  },
  filters: {
    timeformat: (timestamp, format) => {
      if (typeof (timestamp) === 'string') {
        timestamp = parseInt(timestamp);
      }
      return moment(new Date(timestamp)).format(format);
    },
    avatar: email => getGravatarUrl(email)
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
      this.$refs.contestList.getContestList(this.group.id);
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
    },
    GROUP_OPENNESS_TYPE: () => GROUP_OPENNESS_TYPE,
    GROUP_STATUS_TYPE: () => GROUP_STATUS_TYPE
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
  .media__left {
    padding-right: 1.875rem;
  }
}
.profile-header__main {
  h1 {
    line-height: 40px;
    color: #17233d;
  }
  p, span {
    line-height: 30px;
    color: #515a6e;
  }
  small {
    color: rgba(128, 134, 149, .7);
    font-size: .9em;
  }
}
.profile-header__tool-bar {
  position: absolute;
  right: 1.25rem;
  top: 2.285rem;
  text-align: right;
}

.profile-content {
  position: relative;
  z-index: 2;
  margin-top: -2.8125rem;
}

.media {
  display: table;
  width: 100%;
}
.media__left img {
  display: block;
}

.media__body, .media__left, .media__right {
  display: table-cell;
  vertical-align: middle;
}
.media__body {
  width: 100%;
}
</style>
