<template>
  <Row class="container">
    <Col span="18">
      <div style="margin-right: 20px">
        <Card title="Recent Contests" :padding="0" dis-hover>
          <Select size="small" v-model="selectRecent" style="width: 100px" slot="extra">
            <Option value="All">All</Option>
            <Option value="ACM">ACM</Option>
            <Option value="OI">OI</Option>
            <Option value="IOI">IOI</Option>
          </Select>
          <List size="large" item-layout="vertical">
            <ListItem v-for="contest in recentContestList" :key="contest.contestId">
              <ListItemMeta >
                <div slot="avatar" class="contest__date numbox">
                  <div class="numbox__num__large">{{ contest.start | timeformat('dd') }}</div>
                  <div class="numbox__text">{{ contest.start | timeformat('yyyy-MM') }}</div>
                </div>
                <div class="ivu-list-item-meta-title" slot="title">{{ contest.contestTitle }}</div>
                <ul slot="description" class="ivu-list-item-action">
                  <li><Icon type="ios-time-outline" />{{ contest.start | timeformat('hh:mm:ss') }}</li>
                  <li>{{ (contest.end - contest.start) | time2hour }}</li>
                  <li><Icon type="ios-people-outline" />{{ contest.attends }}</li>
                  <li>
                    <div :class="'contest-type--' + contest.mode">
                      <Icon type="md-bulb" color="#fff"/>&nbsp;
                    <span >{{ contest.mode.toUpperCase() }}</span>
                    </div>
                  </li>
                </ul>
              </ListItemMeta>
            </ListItem>
          </List>
        </Card>
        <Card title="Contest History" :padding="0" dis-hover style="margin-top: 30px">
          <Select size="small" v-model="selectHistory" style="width: 100px" slot="extra">
            <Option value="All">All</Option>
            <Option value="ACM">ACM</Option>
            <Option value="OI">OI</Option>
            <Option value="IOI">IOI</Option>
          </Select>
          <List size="large" item-layout="vertical">
            <ListItem v-for="contest in historyContestList" :key="contest.contestId">
              <ListItemMeta >
                <div slot="avatar" class="contest__date numbox">
                  <div class="numbox__num__large">{{ contest.start | timeformat('dd') }}</div>
                  <div class="numbox__text">{{ contest.start | timeformat('yyyy-MM') }}</div>
                </div>
                <div class="ivu-list-item-meta-title" slot="title">{{ contest.contestTitle }}</div>
                <ul slot="description" class="ivu-list-item-action">
                  <li><Icon type="ios-time-outline" />{{ contest.start | timeformat('hh:mm:ss') }}</li>
                  <li>{{ (contest.end - contest.start) | time2hour }}</li>
                  <li><Icon type="ios-people-outline" />{{ contest.attends }}</li>
                  <li>
                    <div :class="'contest-type--' + contest.mode">
                      <Icon type="md-bulb" color="#fff"/>&nbsp;
                      <span >{{ contest.mode.toUpperCase() }}</span>
                    </div>
                  </li>
                </ul>
              </ListItemMeta>
            </ListItem>
          </List>
          <div class="pages">
            <Page 
              size="small" show-elevator show-sizer
              :total="totalPage"
              :current.sync="pageNow"
              @on-change="onPageChange"
              @on-page-size-change="onPageSizeChange"/>
          </div>
        </Card>
      </div>
    </Col>
    <Col span="6">
      <Card title="Upcoming" :padding="0" dis-hover v-if="!!upcomingContest">
        <div class="upcoming-title">{{ upcomingContest.contestTitle }}</div>
        <Countdown class="upcoming-countdown" :time="countdown" format="hh:mm:ss">
          <template slot-scope="{ time }">{{ time }}</template>
        </Countdown>
      </Card>
      <Card title="My participation" :padding="0" dis-hover style="margin-top: 30px">
      </Card>
    </Col>
  </Row>
</template>

<script>
import Countdown from '@choujiaojiao/vue2-countdown'
import timeformat from '@/utils/time';
import api from '@/utils/api';

export default {
  components: { Countdown },
  data: function() {
    return {
      contestList: [],
      upcomingContest: {},
      countdown: 0,
      selectRecent: 'All',
      selectHistory: 'All',
      pageNow: 1,
      pageSize: 10,
      totalPage: 1
    }
  },
  filters: {
    timeformat: (timestamp, format) => timeformat(timestamp, format),
    time2hour: timediff => {
      timediff /= 1000;
      let h = parseInt(timediff / 3600);
      timediff -= h * 3600;
      let m = parseInt(timediff / 60);
      timediff -= m * 60;
      let s = timediff;
      h = (h < 10 ? '0' : '') + h;
      m = (m < 10 ? '0' : '') + m;
      s = (s < 10 ? '0' : '') + s;
      return [h, m, s].join(':');
    }
  },
  computed: {
    recentContestList: function() {
      const now = new Date().getTime();
      return this.contestList.filter(contest => contest.end > now);
    },
    historyContestList: function() {
      const now = new Date().getTime();
      return this.contestList.filter(contest => contest.end <= now);
    }
  },
  methods: {
    onPageChange: function(curPage) {
      this.pageNow = curPage;
    },
    onPageSizeChange: function(pageSize) {
      this.pageSize = pageSize;
    }
  },
  watch: {
    pageNow: function() {
      // 
    },
    pageSize: function() {
      //
    }
  },
  mounted: function() {
    api.getContestList().then(ret => {
      this.contestList = ret.sort((a, b) => b.start - a.start);
      const now = new Date().getTime();
      for (let i = 0; i < this.contestList.length; ++i) {
        if (this.contestList[i].start > now) {
          this.upcomingContest = Object.assign({}, this.contestList[i]);
          this.countdown = parseInt((this.upcomingContest.start - now) / 1000);
          break;
        }
      }
    });
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

.contest-type--acm {
  padding: 0 10px;
  color: #fff;
  background-color: #3676B6;
  border-radius: .75rem;
}

.contest-type--oi {
  padding: 0 10px;
  color: #fff;
  background-color: #f8df72;
  border-radius: .75rem;
}

.contest-type--ioi {
  padding: 0 10px;
  color: #fff;
  background-color: #ea517f;
  border-radius: .75rem;
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
  color: rgba(0, 0, 0, 0.85);
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  line-height: 24px;
}

.pages {
  float: right;
  margin: 20px auto;
  padding-right: 15px;
}

/deep/.ivu-list-item {
  padding: 10px 0;
}
/deep/.ivu-list-vertical {
  .ivu-list-item-meta{
    margin-bottom: 0;
  }
  .ivu-list-item-action {
    margin-top: 6px;
  }
  .ivu-list-item-meta-title {
    margin-bottom: 4px;
    margin-top: 4px;
    :hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
}
/deep/.ivu-list-item-meta-avatar {
  margin-right: 0px;
  margin-top: -4px;
}
</style>