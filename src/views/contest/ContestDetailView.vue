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
              <div :class="'contest-type--' + contestMode">
                <Icon type="md-bulb" color="#fff"/>&nbsp;
                <span>{{ contestMode.toUpperCase() }}</span>
              </div>
            </li>
            <li>{{ contestStartTime.format('yyyy-MM-DD hh:mm:ss') }}</li>
            <li>
              <Icon type="ios-time-outline"/>
              {{ contestDuration.format('hh:mm:ss') }}
            </li>
            <li>
              <Icon type="ios-people-outline"/>
              {{ contest.participantNum }}
            </li>
            <li>
              <div class="hover-background" @click="contestSettingsModal=true">
                <Icon type="md-settings" :size="20"/>
              </div>
            </li>
          </ul>
        </div>
        <div>
          <markdown-it-vue-light :content="contest.markdownDescription" />
        </div>
      </div>
      <Menu mode="horizontal" theme="light" :active-name="$route.path.split('/')[3]" class="contest__menu">
        <MenuItem name="overview" :to="{
          name: 'contest-overview'
        }">
          <span class="span__menu">Overview</span>
        </MenuItem>
        <template v-if="contestStarted  && $store.getters['contest/hasParticipatedIn']">
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
          <span>{{ countdown }}</span>
        </div>
      </Menu>
      <Modal
        title="Settings"
        v-model="contestSettingsModal"
        :mask-closable="false"
        @on-ok="$store.dispatch('contest/settingso', $store.state.contest.settings)">
        <Form>
          <FormItem label="Show Practice">
            <i-switch v-model="showPractice" />
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
import MarkdownItVueLight from 'markdown-it-vue/dist/markdown-it-vue-light.umd.min.js'
import 'markdown-it-vue/dist/markdown-it-vue-light.css'

import { mapGetters, mapState } from 'vuex';
import { CONTEST_OPENNESS } from '_u/constants';

export default {
  name: 'ContestDetailView',
  components: { MarkdownItVueLight },
  inject: ['reload'],
  data: function() {
    return {
      contestSettingsModal: false,
      contestSettingsForm: {
        showPractice: false
      }
    }
  },
  computed: {
    ...mapGetters('user', ['username']),
    ...mapGetters('contest', [
      'hasParticipatedIn',
      'contestStartTime',
      'contestEndTime',
      'contestDuration',
      'contestLoaded',
      'contestMode',
      'contestStarted',
      'contestOpenness',
      'countdown'
    ]),
    ...mapState('contest', ['contest']),
    showPractice: {
      get: function() {
        return this.$store.state.contest.settings.showPractice;
      },
      set: function(val) {
        this.$store.dispatch('contest/settings', { showPractice: val })
      }
    },
    CONTEST_OPENNESS: () => CONTEST_OPENNESS
  },
  mounted: function() {
    this.$store.dispatch('contest/getContest', this.$route.params.contestId)
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
  .hover-background i:hover {
    border-radius: 3px;
    background: rgba(0, 0, 0, .15);
  }
</style>
