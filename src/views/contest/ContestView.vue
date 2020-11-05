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
            <Option value="all" label="All" />
            <Option v-for="mode in CONTEST_MODE" :key="mode" :value="mode" :label="mode.toUpperCase()" />
          </Select>
          <List size="large" item-layout="vertical">
            <ListItem v-for="contest in contestList" :key="contest.contestId">
              <div slot="extra" style="margin-right: 10px">
                <div v-if="participatedContest.includes(contest.contestId)" style="color: #5cb85c">
                  <Icon type="md-checkmark" /><strong>&nbsp;Participated</strong>
                </div>
              </div>
              <ListItemMeta>
                <div slot="avatar" class="contest__date numbox">
                  <div class="numbox__num__large">{{ contest.gmtStart | timeformat('DD') }}</div>
                  <div class="numbox__text">{{ contest.gmtStart | timeformat('yyyy-MM') }}</div>
                </div>
                <div slot="title">
                  <span class="ivu-list-item-meta-title" @click="toContestDetail(contest.contestId)">{{ contest.contestTitle }}</span>
                  <template v-if="contest.features.openness === CONTEST_OPENNESS.PRIVATE">
                    <Icon type="ios-unlock" color="#d9534f" size="19" v-if="participatedContest.includes(contest.contestId)"/>
                    <Icon type="md-lock" color="#d9534f" size="19" v-else />
                  </template>
                  <template v-else-if="contest.features.openness === CONTEST_OPENNESS.PROTECTED">
                    <Icon type="ios-unlock" color="orange" size="19" v-if="participatedContest.includes(contest.contestId)"/>
                    <Icon type="md-lock" color="orange" size="19" v-else/>
                  </template>
                </div>
                <ul slot="description" class="ivu-list-item-action">
                  <li>
                    <div :class="`contest-type--${contest.features.mode}`">
                      <Icon type="md-bulb" color="#fff"/>&nbsp;
                      <span>{{ contest.features.mode.toUpperCase() }}</span>
                    </div>
                  </li>
                  <li>
                    {{ contest.gmtStart | timeformat('HH:mm:ss') }}
                  </li>
                  <li>
                    <Icon type="ios-time-outline"/>
                    {{ (contest.gmtEnd - contest.gmtStart) | time2hour }}
                  </li>
                  <li>
                    <Icon type="ios-people-outline"/>
                    {{ contest.participantNum }}
                  </li>
                  <li>
                    <Tag  v-if="$store.state.now > contest.gmtEnd" color="green">Finished</Tag>
                    <Tag  v-else-if="contest.gmtStart < $store.state.now && $store.state.now < contest.gmtEnd" color="gold">Running</Tag>
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
<!--      <Card title="My participation" :padding="0" dis-hover>-->
<!--      </Card>-->
    </Col>
  </Row>
</template>

<script>
import moment from 'moment';
import { mapState } from 'vuex';
import { s2hs } from '_u/transform';
import { CONTEST_OPENNESS, CONTEST_MODE, CONTEST_STATUS } from '_u/constants';
import api from '_u/api';

export default {
  data: function () {
    return {
      contestList: [],
      participatedContest: [],
      upcomingContest: {},
      selectContestMode: 'all',
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
    time2hour: timediff => s2hs(timediff),
    contestStatus: contest => {
      const now = this.$store.store.now;
      if (contest.contestStartTime > now) {
        return CONTEST_STATUS.UPCOMING;
      } else if (contest.contestEndTime < now) {
        return CONTEST_STATUS.FINISHED;
      } else {
        return CONTEST_STATUS.RUNNING;
      }
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
          return s2hs(startTime - this.now);
        }
      }
      return '\b';
    },
    CONTEST_OPENNESS: () => CONTEST_OPENNESS,
    CONTEST_MODE: () => CONTEST_MODE,
    CONTEST_STATUS: () => CONTEST_STATUS
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
        pageSize: this.pageSize,
        mode: this.selectContestMode === 'all' ? '' : this.selectContestMode
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
    },
    selectContestMode: function () {
      this.getContestList();
    }
  },
  mounted: function () {
    this.getContestList();
    api.getUpcomingContest().then(ret => (this.upcomingContest = { ...ret }));
    api.getParticipatedContests().then(ret => (this.participatedContest = ret));
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
