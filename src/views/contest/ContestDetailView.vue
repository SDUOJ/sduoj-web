<template>
  <div class="container" v-if="contestLoaded">
    <div class="contest__header clearfix">
      <div class="contest__title">
        <div style="margin-bottom: 15px">
          <span class="title">
            {{ contest.contestTitle }}
          </span>
          <span class="contest__subtitle">{{ contest.source }}</span>
          <Icon type="md-lock" color="#d9534f" size="19" v-if="contest.features.openness === 'private'"/>
          <Icon type="md-lock" color="orange" size="19" v-else-if="contest.features.openness === 'protected'"/>
          <ul class="ivu-list-item-action contest__float">
            <li>
              <div :class="'contest-type--' + contest.features.mode">
                <Icon type="md-bulb" color="#fff"/>&nbsp;
                <span>{{ contest.features.mode.toUpperCase() }}</span>
              </div>
            </li>
            <li>
              <Icon type="ios-time-outline"/>
              {{ contest.gmtStart | timeformat('hh:mm:ss') }}
            </li>
            <li>{{ (contest.gmtEnd - contest.gmtStart) | time2hour }}</li>
            <li>
              <Icon type="ios-people-outline"/>
              {{ contest.participantNum }}
            </li>
          </ul>
        </div>
        <div>
          <markdown-it-vue-light :content="contest.markdownDescription"></markdown-it-vue-light>
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
            problemCode: '1',
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
        <div class="contest__countdown">
          <template v-if="start">
            <template v-if="end">
              <span>Finished</span>
            </template>
            <template v-else>
              <span>Running&nbsp;</span>
              <Countdown
                :time="countdown"
                style="display: inline"
                format="hh:mm:ss">
                <template slot-scope="{ time }">{{ time }}</template>
              </Countdown>
            </template>
          </template>
          <template v-else>
            <span>Before the contest&nbsp;</span>
            <Countdown
              :time="countdown"
              @on-end="reload"
              style="display: inline"
              format="hh:mm:ss">
              <template slot-scope="{ time }">{{ time }}</template>
            </Countdown>
          </template>
        </div>
      </Menu>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import MarkdownItVueLight from 'markdown-it-vue/dist/markdown-it-vue-light.umd.min.js'
import 'markdown-it-vue/dist/markdown-it-vue-light.css'
import Countdown from '@choujiaojiao/vue2-countdown';
import timeFormat from '_u/time';

import { mapGetters, mapState } from 'vuex';

export default {
  name: 'ContestDetailView',
  components: { MarkdownItVueLight, Countdown },
  inject: ['reload'],
  data: function() {
    return {
      countdown: 0,
      start: false,
      end: false
    }
  },
  filters: {
    timeformat: (timestamp, format) => timeFormat(timestamp, format),
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
    ...mapGetters('user', ['username']),
    ...mapGetters('contest', ['startTime', 'endTime', 'contestLoaded']),
    ...mapState('contest', ['contest'])
  },
  mounted: function() {
    this.$store.dispatch('contest/getContest', this.$route.params.contestId).then(ret => {
      const currentTime = new Date();
      if (this.startTime <= currentTime) {
        this.start = true;
        if (this.endTime < currentTime) {
          this.end = true;
        } else {
          this.countdown = parseInt((this.endTime - currentTime) / 1000);
        }
      } else {
        this.countdown = parseInt((this.startTime - currentTime) / 1000);
      }
    });
  },
  beforeDestroy: function () {
    this.$store.commit('contest/clearContest');
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
    /*padding-bottom: 0;*/
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
    z-index: inherit;
    background-color: @bgc;
    .contest__countdown {
      margin: 0;
      margin-right: 15px;
      float: right;
      font-size: 20px;
      font-weight: bold;
    }
  }
</style>
