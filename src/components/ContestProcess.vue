<!--
   Copyright 2020-2020 the original author or authors.

   Licensed under the General Public License, Version 3.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

        https://www.gnu.org/licenses/gpl-3.0.en.html
 -->

<template>
  <div class="tools clearfix">
    <div class="clearfix" style="margin: 10px 3px">
      <div>
        <Slider v-model="currentPercent" v-if="contestStatus === CONTEST_STATUS.FINISHED" show-tip="never" :step="0.001"/>
        <Progress :percent="currentPercent" v-else-if="contestStatus === CONTEST_STATUS.RUNNING" hide-info status="active" :stroke-width="4" />
      </div>
      <div style="float: left">
        <span>Begin: </span>
        <span class="time">{{ contestStartTime.format('yyyy-MM-DD HH:mm:ss') }}</span>
      </div>
      <div style="float: right">
        <span>End: </span>
        <span class="time">{{ contestEndTime.format('yyyy-MM-DD HH:mm:ss') }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { mapState, mapGetters } from 'vuex';
import { s2hs } from '_u/transform';
import { CONTEST_STATUS, CONTEST_MODE } from '_u/constants';

export default {
  name: 'ContestProcess',
  filters: {
    time2hour: time => s2hs(time)
  },
  computed: {
    ...mapState('contest', ['sliderTime']),
    ...mapGetters('contest', [
      'contestStatus',
      'contestStartTime',
      'contestEndTime',
      'contestDuration'
    ]),
    currentPercent: {
      get: function() {
        const now = this.$store.state.now;
        const duration = moment(now - this.contestStartTime);
        return Math.min(100, parseInt(duration / this.contestDuration * 100));
      },
      set: function (percent) {
        if (percent === 100) {
          this.$store.commit('contest/setSliderTime', { sliderTime: null });
        } else {
          this.$store.commit('contest/setSliderTime', {
            sliderTime: this.contestStartTime + parseInt(this.contestDuration * percent / 100)
          });
        }
      }
    },
    CONTEST_MODE: () => CONTEST_MODE,
    CONTEST_STATUS: () => CONTEST_STATUS
  }
}
</script>

<style lang="less" scoped>
  /deep/ .ivu-slider-button {
    position: relative;
    top: -4px;
  }
  .tools {
    margin-top: 10px;
    background: #f9f9f9;

    .time {
      color: rgba(0, 0, 0, 0.45);
      font-size: 14px;
      line-height: 22px;
    }
  }
</style>
