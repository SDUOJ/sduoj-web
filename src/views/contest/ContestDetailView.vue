<!--
   Copyright 2020-2021 the original author or authors.

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
          <span class="title">{{ contest.contestTitle }}</span>
          <span class="contest__subtitle">{{ contest.source }}</span>
          <template v-if="contestOpenness === CONTEST_OPENNESS.PRIVATE">
            <Icon type="ios-unlock" color="#d9534f" size="19" v-if="hasParticipatedIn"/>
            <Icon type="md-lock" color="#d9534f" size="19" v-else />
          </template>
          <template v-else-if="contestOpenness === CONTEST_OPENNESS.PROTECTED">
            <Icon type="ios-unlock" color="orange" size="19" v-if="hasParticipatedIn"/>
            <Icon type="md-lock" color="orange" size="19" v-else/>
          </template>
          <ul class="ivu-list-item-action contest__float">
            <li v-if="hasParticipatedIn" style="color: #5cb85c">
              <Icon type="md-checkmark" /><span>&nbsp;Participated</span>
            </li>
            <li>
              <div :class="`contest-type--${contestMode}`">
                <Icon type="md-bulb" color="#fff"/>&nbsp;
                <span>{{ contestMode.toUpperCase() }}</span>
              </div>
            </li>
            <li>
              <Icon type="ios-time-outline"/>
              {{ contestDuration | time2hour }}
            </li>
            <li>
              <Icon type="ios-people-outline"/>
              {{ contest.participantNum }}
            </li>
            <li v-if="contestOpenness !== CONTEST_OPENNESS.PRIVATE || hasParticipatedIn">
              <div class="hover-background" @click="contestSettingsModal=true">
                <Icon type="md-settings" :size="20"/>
              </div>
            </li>
          </ul>
        </div>
        <div>
          <Markdown style="min-height: 0" :value="contest.markdownDescription" />
          <ContestProcess />
        </div>
      </div>
      <Menu mode="horizontal" theme="light" :active-name="$route.path.split('/')[3]" class="contest__menu" v-if="contestLoaded">
        <MenuItem name="overview" :to="{
          name: 'contest-overview'
        }">
          <span class="span__menu">Overview</span>
        </MenuItem>
        <template v-if="contestStarted && ($store.getters['contest/hasParticipatedIn'] || contestOpenness === CONTEST_OPENNESS.PROTECTED)">
          <MenuItem name="problem" :to="{
            name: 'contest-problem',
            params: { problemCode: '1' }
          }">
            <span class="span__menu">Problem</span>
          </MenuItem>
          <MenuItem name="submission" :to="{ name: 'contest-submission' }">
            <span class="span__menu">Status</span>
          </MenuItem>
          <MenuItem name="rank" :to="{
            name: 'contest-rank',
          }">
            <span class="span__menu">Rank</span>
          </MenuItem>
        </template>
        <div class="contest__countdown">
          <template v-if="contestStatus === CONTEST_STATUS.FINISHED">
            <strong v-if="sliderTime"> {{ (sliderTime - contestStartTime) | time2hour }}</strong>
            <strong v-else>Finished</strong>
          </template>
          <template v-else>
            <strong>{{ countdown }}</strong>
          </template>
        </div>
      </Menu>
      <Modal
        title="Settings"
        v-model="contestSettingsModal"
        footer-hide
        scrollable>
        <Form>
          <FormItem label="Show Practice">
            <i-switch v-model="showPractice" />
          </FormItem>
          <FormItem label="Export">
            <Button @click="exportRank" :loading="exportLoading">Rank</Button>
          </FormItem>
        </Form>
      </Modal>
    </div>
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { CONTEST_OPENNESS, CONTEST_STATUS } from '_u/constants';
import { s2hs } from '_u/transform';

import ContestProcess from '_c/contest/ContestProcess';
import Markdown from '_c/editor/Markdown';

import rankHandler from '@/store/modules/ranks';

export default {
  name: 'ContestDetailView',
  components: { Markdown, ContestProcess },
  inject: ['reload'],
  data: function() {
    return {
      contestSettingsModal: false,
      contestSettingsForm: {
        showPractice: false
      },
      exportLoading: false
    }
  },
  filters: {
    time2hour: diff => s2hs(diff)
  },
  computed: {
    ...mapState('contest', ['contest', 'sliderTime']),
    ...mapGetters('user', ['username']),
    ...mapGetters('contest', [
      'contestLoaded',
      'hasParticipatedIn',
      'contestStatus',
      'contestStartTime',
      'contestDuration',
      'contestLoaded',
      'contestMode',
      'contestStarted',
      'contestOpenness',
      'countdown',
      'scores'
    ]),
    showPractice: {
      get: function() {
        return this.$store.state.contest.settings.showPractice;
      },
      set: function(val) {
        this.$store.dispatch('contest/settings', { showPractice: val })
      }
    },
    CONTEST_OPENNESS: () => CONTEST_OPENNESS,
    CONTEST_STATUS: () => CONTEST_STATUS
  },
  methods: {
    exportRank: function() {
      import('_u/excel').then(excel => {
        this.exportLoading = true;
        const ret = rankHandler[this.contestMode].exportScore(this.scores, this.contest.problems);
        excel.export_json_to_excel({
          ...ret,
          filename: this.contest.contestTitle
        });
        this.exportLoading = false;
      })
    }
  },
  beforeCreate: function() {
    this.$store.dispatch('contest/getContest', this.$route.params.contestId).catch(err => {
      this.$Message.error(err.message);
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
    .title {
      font-size: 20px;
      font-weight: 600;
    }
    padding: 15px 15px 0 15px;
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
    margin: 5px 5px 0;
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
  .hover-background i:hover {
    border-radius: 3px;
    background: rgba(0, 0, 0, .15);
  }
</style>
