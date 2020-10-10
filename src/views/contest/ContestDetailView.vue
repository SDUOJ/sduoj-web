<!--
   Copyright 2020-2020 the original author or authors.

   Licensed under the General Public License, Version 3.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

        https://www.gnu.org/licenses/gpl-3.0.en.html
 -->

<template>
  <div class="container" v-if="contestLoaded">
    <div class="contest__header clearfix">
      <div class="contest__title">
        <div style="margin-bottom: 15px">
          <span class="title">
            {{ contest.contestTitle }}
          </span>
          <span class="contest__subtitle">{{ contest.source }}</span>
          <Icon type="md-lock" color="#d9534f" size="19" v-if="openness === 'private'"/>
          <Icon type="md-lock" color="orange" size="19" v-else-if="openness === 'protected'"/>
          <ul class="ivu-list-item-action contest__float">
            <li>
              <div :class="'contest-type--' + mode">
                <Icon type="md-bulb" color="#fff"/>&nbsp;
                <span>{{ mode.toUpperCase() }}</span>
              </div>
            </li>
            <li>
              {{ contest.gmtStart | timeformat('yyyy-MM-dd hh:mm:ss') }}
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
        </div>
        <div>
          <markdown-it-vue-light :content="contest.markdownDescription"></markdown-it-vue-light>
        </div>
      </div>
      <Menu mode="horizontal" theme="light" :active-name="$route.path.split('/')[3]" class="contest__menu">
        <MenuItem name="overview" :to="{
          name: 'contest-overview'
        }">
          <span class="span__menu">Overview</span>
        </MenuItem>
        <template v-if="start && !$store.getters['contest/needPassword']">
          <MenuItem name="problem" :to="{
            name: 'contest-problem',
            params: { problemCode: '1' }
          }">
            <span class="span__menu">Problem</span>
          </MenuItem>
          <MenuItem name="submission" :to="{
            name: 'contest-submission',
            params: { username }
          }">
            <span class="span__menu">Status</span>
          </MenuItem>
          <MenuItem name="rank" :to="{
            name: 'contest-rank',
          }">
            <span class="span__menu">Rank</span>
          </MenuItem>
        </template>
        <div class="contest__countdown">
          <template v-if="start">
            <template v-if="end">
              <span>Finished</span>
            </template>
            <template v-else>
              <span>Running&nbsp;</span>
              <VueCountdown
                :time="countdown"
                @end="reload"
                style="display: inline">
                <template slot-scope="props">
                  <span v-if="props.days > 0">{{ props.days + props.days > 1 ? ' days' : ' day' }}</span>
                  <span v-else>{{ props.hours }}:{{ props.minutes }}:{{ props.seconds }}</span>
                </template>
              </VueCountdown>
            </template>
          </template>
          <template v-else>
            <span>Before the contest&nbsp;</span>
            <VueCountdown
              :time="countdown"
              style="display: inline">
              <template slot-scope="props">
                <span v-if="props.days > 0">{{ props.days + (props.days > 1 ? ' days' : ' day') }}</span>
                <span v-else>{{ props.hours }}:{{ props.minutes }}:{{ props.seconds }}</span>
              </template>
            </VueCountdown>
          </template>
        </div>
      </Menu>
    </div>
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import MarkdownItVueLight from 'markdown-it-vue/dist/markdown-it-vue-light.umd.min.js'
import 'markdown-it-vue/dist/markdown-it-vue-light.css'
import VueCountdown from '@chenfengyuan/vue-countdown';
import timeFormat from '_u/time';

import { mapGetters, mapState } from 'vuex';

export default {
  name: 'ContestDetailView',
  components: { MarkdownItVueLight, VueCountdown },
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
    ...mapGetters('contest', ['startTime', 'endTime', 'contestLoaded', 'openness', 'mode']),
    ...mapState('contest', ['contest'])
  },
  mounted: function() {
    this.$store.dispatch('contest/getContest', this.$route.params.contestId).then(_ => {
      const currentTime = new Date();
      if (this.startTime <= currentTime) {
        this.start = true;
        if (this.endTime < currentTime) {
          this.end = true;
        } else {
          this.countdown = parseInt((this.endTime - currentTime));
        }
      } else {
        this.countdown = parseInt((this.startTime - currentTime));
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

  .fade-leave-active,
  .fade-enter-active {
    transition: all 0.23s;
  }
  .fade-enter {
    opacity: 0;
    transform: translateX(-30px);
  }
  .fade-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
</style>
