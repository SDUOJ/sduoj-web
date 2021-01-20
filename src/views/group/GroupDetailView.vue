<!--
   Copyright 2020-2021 the original author or authors.

   Licensed under the General Public License, Version 3.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

        https://www.gnu.org/licenses/gpl-3.0.en.html
 -->

<template>
  <div class="container">
    <Row>
      <Col span="18">
        <Card style="margin-right: 30px;" dis-hover>
          <div class="profile-header">
            <div class="profile-header__content">
              <div class="media">
                <div class="media__left">
                  <img src="//cn.gravatar.com/avatar/?d=mm&s=200" width="120" height="120" class="avatar">
                </div>
                <div class="media__body profile-header__main">
                  <h1>
                    {{ group.name }}
                    <small>(Group ID: {{ group.id }})</small>
                  </h1>
                  <p>{{ group.description }}</p>
                  <div class="profile-header__tool-bar">
                    <Button class="profile-header__tol-bar__item" type="info">Join</Button>
                    <Button class="profile-header__tol-bar__item" type="default">Applied</Button>
                    <Button class="profile-header__tol-bar__item" type="warning">Exit</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="profile-content">
            <Tabs value="announcement" @on-click="onClickTabs" :animated="false">
              <TabPane label="Announcement" name="announcement">
                <Markdown v-if="group.announcement" :value="group.announcement"/>
              </TabPane>
              <TabPane label="Contest" name="contest">
                <ContestInGroup ref="contestList" />
              </TabPane>
            </Tabs>
          </div>
        </Card>
      </Col>
      <Col span="6">
        <Card dis-hover title="Members">
          <div slot="extra" class="card-extra">
            <Input placeholder="Find" suffix="ios-search"/>
          </div>
          <Scroll>
            <List>
              <ListItem>
                <ListItemMeta
                  avatar=""
                  title=""
                  description="" />
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

export default {
  name: 'GroupDetailView',
  components: { Markdown, ContestInGroup },
  data: function () {
    return {
      group: {}
    }
  },
  methods: {
    getGroupDetail: function (groupId) {
      this.group = {
        id: 1,
        name: 'test',
        description: 'To be or not to be 该用户太懒，这里啥也没写 (´・ω・｀)'
      }
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
  .media__left {
    padding-right: 1.875rem;
  }
}
.profile-header__main {
  h1 {
    line-height: 40px;
    color: #17233d;
  }
  p {
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
  top: 3.285rem;
  color: grey;
  text-align: right;
}
.profile-header__tol-bar__item {
  vertical-align: top;
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
