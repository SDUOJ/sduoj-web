<!--
   Copyright 2020-2020 the original author or authors.

   Licensed under the General Public License, Version 3.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

        https://www.gnu.org/licenses/gpl-3.0.en.html
 -->

<template>
  <Row class="container">
    <Col span="18">
      <div style="margin-right: 20px">
        <Card title="Contest List" :padding="0" dis-hover>
          <Select size="small" v-model="selectContestMode" style="width: 100px" slot="extra">
            <Option value="All">All</Option>
            <Option value="ACM">ACM</Option>
            <Option value="OI">OI</Option>
            <Option value="IOI">IOI</Option>
          </Select>
          <List size="large" item-layout="vertical">
            <ListItem v-for="contest in contestList" :key="contest.contestId">
              <ListItemMeta>
                <div slot="avatar" class="contest__date numbox">
                  <div class="numbox__num__large">{{ contest.gmtStart | timeformat('DD') }}</div>
                  <div class="numbox__text">{{ contest.gmtStart | timeformat('yyyy-MM') }}</div>
                </div>
                <div class="ivu-list-item-meta-title" slot="title" @click="toContestDetail(contest.contestId)">
                  <span>{{ contest.contestTitle }}</span>
                  <Icon type="md-lock" color="#d9534f" size="19" v-if="contest.features.openness === 'private'"/>
                  <Icon type="md-lock" color="orange" size="19" v-else-if="contest.features.openness === 'protected'"/>
                </div>
                <ul slot="description" class="ivu-list-item-action">
                  <li>
                    <div :class="'contest-type--' + contest.features.mode">
                      <Icon type="md-bulb" color="#fff"/>&nbsp;
                      <span>{{ contest.features.mode.toUpperCase() }}</span>
                    </div>
                  </li>
                  <li>
                    {{ contest.gmtStart | timeformat('hh:mm:ss') }}
                  </li>
                  <li>
                    <Icon type="ios-time-outline"/>
                    {{ (contest.gmtEnd - contest.gmtStart) | time2hour }}
                  </li>
                  <li>
                    <Icon type="ios-people-outline"/>
                    {{ contest.participantNum }}
                  </li>
                </ul>
              </ListItemMeta>
            </ListItem>
          </List>
          <div class="pages">
            <Page
              size="small" show-elevator show-sizer
              :total="total"
              :current.sync="pageNow"
              @on-change="onPageChange"
              @on-page-size-change="onPageSizeChange"/>
          </div>
        </Card>
      </div>
    </Col>
    <Col span="6">
      <Card
        style="margin-bottom: 30px"
        title="Upcoming"
        :padding="0"
        dis-hover
        v-if="!!upcomingContest.contestId">
        <div class="upcoming-title" @click="toContestDetail(upcomingContest.contestId)">{{ upcomingContest.contestTitle }}</div>
        <div class="upcoming-countdown"><span>{{ countdown }}</span>
        </div>
      </Card>
      <Card title="My participation" :padding="0" dis-hover>
      </Card>
    </Col>
  </Row>
</template>

<script>
import { mapState } from 'vuex';
import moment from 'moment';
import api from '_u/api';

export default {
  data: function () {
    return {
      contestList: [],
      upcomingContest: {},
      selectContestMode: 'All',
      pageNow: 1,
      pageSize: 10,
      total: 0
    }
  },
  filters: {
    timeformat: (timestamp, format) => {
      if (typeof (timestamp) === 'string') {
        timestamp = parseInt(timestamp);
      }
      return moment(new Date(timestamp)).format(format);
    },
    time2hour: timediff => {
      return moment.utc(timediff).format('hh:mm:ss');
    }
  },
  computed: {
    ...mapState(['now']),
    countdown: function() {
      const startTime = moment(new Date(parseInt(this.upcomingContest.gmtStart)));
      if (startTime > this.now) {
        const duration = moment.duration(startTime.diff(this.now, 'seconds'), 'seconds');
        if (duration.weeks() > 0) {
          return duration.humanize();
        } else {
          return [Math.floor(duration.asHours()), duration.minutes(), duration.seconds()].join(':');
        }
      }
      return '\b';
    }
  },
  methods: {
    onPageChange: function (pageNow) {
      this.pageNow = pageNow;
    },
    onPageSizeChange: function (pageSize) {
      this.pageSize = pageSize;
    },
    toContestDetail: function(contestId) {
      this.$router.push({
        name: 'contest-detail',
        params: { contestId }
      });
    },
    getContestList: function() {
      api.getContestList({
        pageNow: this.pageNow,
        pageSize: this.pageSize
      }).then(ret => {
        this.total = parseInt(ret.total);
        this.contestList = ret.rows;
      });
    }
  },
  watch: {
    pageNow: function () {
      this.getContestList();
    },
    pageSize: function () {
      this.getContestList();
    }
  },
  mounted: function () {
    this.getContestList();
    api.getUpcomingContest().then(ret => (this.upcomingContest = { ...ret }));
  }
}
</script>

<style lang="less" scoped>
  // Number Box Object
  .numbox {
    font-size: 16px;
    text-align: center;
  }

  .numbox__num__large {
    font-size: 1.7rem;
  }

  .numbox__text {
    font-size: 14px;
    color: #AAA;
  }

  .contest__date {
    margin: 0 10px 0 15px;
    white-space: nowrap;
  }

  .upcoming-title {
    margin: 10px 0;
    font-size: 14px;
    line-height: 24px;
    color: #0000cc;
    text-decoration: underline;
    text-align: center;
  }

  .upcoming-title:hover {
    cursor: pointer;
  }

  .upcoming-countdown {
    margin: 10px 0;
    text-align: center;
    span {
      color: rgba(0, 0, 0, 0.85);
      font-size: 20px;
      font-weight: bold;
      line-height: 24px;
    }
  }

  .pages {
    float: right;
    margin: 20px auto;
    padding-right: 15px;
  }

  /deep/ .ivu-list-item {
    padding: 10px 0;
  }

  /deep/ .ivu-list-vertical {
    .ivu-list-item-meta {
      margin-bottom: 0;
    }

    .ivu-list-item-action {
      margin-top: 6px;
    }

    .ivu-list-item-meta-title {
      margin-bottom: 4px;
      margin-top: 4px;

      :hover {
        span {
          cursor: pointer;
          text-decoration: underline;
        }
      }
    }
  }

  /deep/ .ivu-list-item-meta-avatar {
    margin-right: 0;
    margin-top: -4px;
  }
</style>
