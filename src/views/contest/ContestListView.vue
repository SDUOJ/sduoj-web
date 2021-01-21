<!--
   Copyright 2020-2021 the original author or authors.

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
          <ContestList ref="contestList"/>
          <div class="float-right footer-pages">
            <Page
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
    </Col>
    <Col span="6">
      <Card
        style="margin-bottom: 30px"
        title="Upcoming"
        :padding="0"
        dis-hover
        v-if="upcomingContest">
        <div class="upcoming-title" @click="toContestDetail(upcomingContest.contestId)">
          {{ upcomingContest.contestTitle }}
        </div>
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
import api from '_u/api';
import { CONTEST_MODE } from '_u/constants';

import { Page } from '_c/mixins';
import ContestList from '_c/contest/ContestList';

export default {
  mixins: [Page],
  components: { ContestList },
  data: function () {
    return {
      upcomingContest: {},
      selectContestMode: 'all'
    }
  },
  computed: {
    ...mapState(['now']),
    CONTEST_MODE: () => CONTEST_MODE,
    countdown: function () {
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
    }
  },
  methods: {
    getContestList: function () {
      this.$refs.contestList.getContestList({
        pageNow: this.pageNow,
        pageSize: this.pageSize,
        mode: this.selectContestMode === 'all' ? '' : this.selectContestMode
      }).then(ret => {
        this.total = parseInt(ret.totalPage) * this.pageSize;
      }).catch(err => {
        this.$Message.error(err.message);
      });

      this.$refs.contestList.getParticipatedContests().catch(err => {
        this.$Message.error(err.message);
      });
    }
  },
  watch: {
    selectContestMode: function () {
      this.getContestList();
    },
    $route: function () {
      this.getContestList();
      api.getUpcomingContest().then(ret => {
        this.upcomingContest = ret;
      }).catch(err => {
        this.$Message.error(err.message);
      });
    }
  },
  mounted: function () {
    this.getContestList();
    api.getUpcomingContest().then(ret => {
      this.upcomingContest = ret;
    }).catch(err => {
      this.$Message.error(err.message);
    });
  }
}
</script>

<style lang="less" scoped>
.upcoming-title {
  margin: 10px 0;
  font-size: 20px;
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
</style>
