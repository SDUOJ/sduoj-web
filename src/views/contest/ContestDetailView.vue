<template>
  <div class="container">
    <div class="contest__header clearfix">
      <div class="contest__title">
        <span class="title">{{ contest.contestTitle }}</span>
        <ul class="ivu-list-item-action contest__float">
          <li>
            <Icon type="ios-time-outline"/>
            {{ contest.start | timeformat('hh:mm:ss') }}
          </li>
          <li>{{ (contest.end - contest.start) | time2hour }}</li>
          <li>
            <Icon type="ios-people-outline"/>
            {{ contest.attends }}
          </li>
          <li>
            <div :class="'contest-type--' + contest.mode">
              <Icon type="md-bulb" color="#fff"/>&nbsp;
              <span>{{ contest.mode.toUpperCase() }}</span>
            </div>
          </li>
        </ul>
        <div class="contest__subtitle">
          {{ contest.description }}
        </div>
      </div>
      <Menu mode="horizontal" theme="light" :active-name="$route.path" class="contest__menu">
        <MenuItem name="overview" :to="{
          name: 'contest-overview'
        }">
          <span class="span__menu">Overview</span>
        </MenuItem>
        <MenuItem name="Problem" :to="{
          name: 'contest-problem',
          params: {
            problemCode: 1,
            contestId: contest.contestId
          }
        }">
          <span class="span__menu">Problem</span>
        </MenuItem>
        <MenuItem name="Status" :to="{
          name: 'contest-submission',
          params: {
            username,
            contestId: contest.contestId
          }
        }">
          <span class="span__menu">Status</span>
        </MenuItem>
        <MenuItem name="Rank" :to="{
          name: 'contest-rank',
          params: {
            contestId: contest.contestId
          }
        }">
          <span class="span__menu">Rank</span>
        </MenuItem>
      </Menu>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import api from '_u/api';
import timeformat from '_u/time';

import { mapGetters } from 'vuex';

export default {
  name: 'ContestDetailView',
  data: function () {
    return {
      contest: {
        contestId: '',
        contestTitle: '',
        description: '',
        start: 0,
        end: 0,
        mode: '',
        attends: 0
      }
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
    ...mapGetters('user', ['username'])
  },
  mounted: function () {
    api.getContest(this.$route.params.contestId).then(ret => {
      this.contest = ret;
    })
  }
}
</script>

<style lang="less" scoped>
  @bgc: rgba(221,221,221, .15);
  .contest__header {
    margin-bottom: 24px;
  }
  .contest__title {
    background-color: @bgc;
    font-size: 20px;
    font-weight: 600;
    padding: 15px 15px;
    padding-bottom: 0;
  }

  .contest__float {
    float: right;
    position: relative;
    right: 0;
    top: 5px;
  }

  .contest__subtitle {
    word-wrap: break-word;
    word-break: break-all;
    margin-top: 5px;
    font-size: 14px;
    color: #aaa;
  }
  .contest__menu {
    background-color: @bgc;
  }
</style>
