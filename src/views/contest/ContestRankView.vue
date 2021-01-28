<!--
   Copyright 2020-2021 the original author or authors.

   Licensed under the General Public License, Version 3.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

        https://www.gnu.org/licenses/gpl-3.0.en.html
 -->

<template>
 <div class="container">
   <table class="scoreboard">
     <colgroup>
       <col id="scorerank" />
       <col id="scoreflags" v-if="showFlags" />
       <col v-else />
       <col id="scoreusername" />
     </colgroup>
     <colgroup>
       <col id="scoresolv" />
       <col id="scoretotal" />
     </colgroup>
     <colgroup>
       <template v-if="showSubmissions">
         <col class="scoreprob" v-for="problem in problems" :key="problem.problemCode" />
       </template>
     </colgroup>
     <thead>
     <tr class="scoreheader">
       <th style="padding: 0 10px" title="rank" scope="col">RANK</th>
       <th style="padding: 0 10px" title="username" colspan="2" scope="col">PARTICIPANT</th>
       <th style="padding: 0 10px" title="# solved / penalty or score" colspan="2" scope="col">SCORE</th>
       <th :title="'problem ' + problem.problemTitle" scope="col" v-for="problem in problems" :key="problem.problemCode">
         <router-link
          :to="{
            name: 'contest-problem',
            params: { problemCode: problem.problemCode }
          }"
          class="alike">
          <strong>{{ problem.problemCode | contestProblemId }}</strong>
          <div class="circle" v-if="problem.problemColor" :style="`background: ${problem.problemColor}; margin-left: 5px`" />
         </router-link>
         <div class="problempoints">{{ problem.acceptNum || '-' }} / {{ problem.submitNum || '-' }}</div>
       </th>
     </tr>
     </thead>
     <tbody>
     <tr
       v-for="(score, index) in likedScores"
       :key="-score.user.userId"
       :id="'user:' + score.user.userId"
       :style="index === likedScores.length - 1 ? 'border-bottom: thick solid black;' : ''"
       :class="{
          sortorderswitch: index === 0,
          scoreliked: likedScoresMap[score.user.userId],
          scorethisisme: score.user.userId === profile.userId
        }">

       <td class="scorepl">
         <span v-if="displayRank">{{ score.rank === -1 ? '*' : score.rank }}</span>
         <span v-else>?</span>
       </td>
       <td class="scoreaf" style="background: #ffffff">
         <Icon v-if="likedScoresMap[score.user.userId]" class="heart fas" type="md-heart" @click="setUserLiked(score.user.userId, false)"/>
         <Icon v-else class="heart" type="md-heart-outline" @click="setUserLiked(score.user.userId, true)" />
       </td>
       <td class="scoretn" style="background: #ffffff" :title="score.user.username">
         <span :class="['forceWidth', { 'unofficial-username': !score.official }]">{{ score.user.username }}</span>
         <span v-if="score.user.nickname" class="forceWidth univ">{{ score.user.nickname }}</span>
       </td>
       <td class="scorenc">{{ score.solved }}</td>
       <td class="scorett" v-if="contestMode === CONTEST_MODE.ACM">{{ score.score | time2minutes }}</td>
       <td class="scorett" v-else>{{ score.score }}</td>

       <td class="score_cell" v-for="problem in score.problemResults" :key="problem.problemCode">
         <a v-if="contestMode === CONTEST_MODE.ACM">
           <div
             :class="problem.css"
             v-if="(problem.numSubmissions + problem.numSubmissionsPending) > 0"
             @click="showAllSubmissions(score.user.username, problem.problemCode)">
             {{ problem.time | time2minutes }}
             <span>{{ (problem.numSubmissions + problem.numSubmissionsPending) === 1 ? '1 try' : (problem.numSubmissions + problem.numSubmissionsPending) + ' tries' }}</span>
           </div>
         </a>
         <a v-else-if="contestMode === CONTEST_MODE.OI">
           <div
             :class="problem.css"
             v-if="problem.numSubmissions > 0"
             @click="showAllSubmissions(score.user.username, problem.problemCode)">
             {{ problem.score }}
           </div>
         </a>
         <a v-else-if="contestMode === CONTEST_MODE.IOI">
           <div
             :class="problem.css"
             v-if="problem.numSubmissions > 0"
             @click="showAllSubmissions(score.user.username, problem.problemCode)">
             {{ problem.score }}
             <span>{{ problem.time | time2minutes }}</span>
           </div>
         </a>
       </td>
     </tr>

     <tr
      v-for="(score, index) in scores"
      :key="score.user.userId"
      :id="'user:' + score.user.userId"
      :class="{
        sortorderswitch: index === 0,
        scorethisisme: score.user.userId === profile.userId,
        scoreliked: likedScoresMap[score.user.userId]
      }">
      <td class="scorepl">
        <span v-if="displayRank">{{ score.rank === -1 ? '*' : score.rank }}</span>
        <span v-else>?</span>
      </td>
      <td class="scoreaf" style="background: #ffffff">
        <Icon v-if="likedScoresMap[score.user.userId]" class="heart fas" type="md-heart" @click="setUserLiked(score.user.userId, false)"/>
        <Icon v-else class="heart" type="md-heart-outline" @click="setUserLiked(score.user.userId, true)" />
      </td>
      <td class="scoretn" style="background: #ffffff" :title="score.user.username">
          <span :class="['forceWidth', { 'unofficial-username': !score.official }]">{{ score.user.username }}</span>
          <span v-if="score.user.nickname" class="forceWidth univ">{{ score.user.nickname }}</span>
      </td>
      <td class="scorenc">{{ score.solved }}</td>
      <td class="scorett" v-if="contestMode === CONTEST_MODE.ACM">{{ score.score | time2minutes }}</td>
      <td class="scorett" v-else>{{ score.score }}</td>

      <td class="score_cell" v-for="problem in score.problemResults" :key="problem.problemCode">
        <a v-if="contestMode === CONTEST_MODE.ACM">
          <div
            :class="problem.css"
            v-if="(problem.numSubmissions + problem.numSubmissionsPending) > 0"
            @click="showAllSubmissions(score.user.username, problem.problemCode)">
            {{ problem.time | time2minutes }}
            <span>{{ (problem.numSubmissions + problem.numSubmissionsPending) === 1 ? '1 try' : `${problem.numSubmissions + problem.numSubmissionsPending} tries` }}</span>
          </div>
        </a>
        <a v-else-if="contestMode === CONTEST_MODE.OI">
          <div
            :class="problem.css"
            v-if="problem.numSubmissions > 0"
            @click="showAllSubmissions(score.user.username, problem.problemCode)">
            {{ problem.score }}
          </div>
        </a>
        <a v-else-if="contestMode === CONTEST_MODE.IOI">
          <div
            :class="problem.css"
            v-if="problem.numSubmissions > 0"
            @click="showAllSubmissions(score.user.username, problem.problemCode)">
            {{ problem.score }}
            <span v-if="problem.time < 120000">{{ problem.time | time2minutes }} min</span>
            <span v-else>{{ problem.time | time2minutes }} mins</span>
          </div>
        </a>
      </td>
    </tr>
     </tbody>
   </table>
   <Modal v-model="modelSubmissions" width="60%" footer-hide :closable="false" scrollable>
     <SubmissionList
       ref="SubmissionList"
       size="small"
       :bannedKey="['problemCode', 'username', 'problemTitle']"
       @on-sort="onSort"
       @on-cell-click="onSubmissionListCellClick">
       <template>
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
       </template>
     </SubmissionList>
   </Modal>
   <Modal v-model="modelSubmissionDetail" width="80%" footer-hide :closable="false">
     <SubmissionDetailView ref="SubmissionDetailView" />
   </Modal>
 </div>
</template>

<script>
import SubmissionList from '_c/submission/SubmissionList';
import SubmissionDetailView from '@/views/submission/SubmissionDetailView';

import { contestProblemIdEncode } from '_u/transform';
import { CONTEST_MODE, CONTEST_STATUS } from '_u/constants';

import { mapState, mapGetters } from 'vuex';

export default {
  name: 'ContestRankView',
  components: { SubmissionList, SubmissionDetailView },
  data: function() {
    return {
      modelSubmissions: false,
      modelSubmissionDetail: false,
      showSubmissions: true,
      showFlags: false,
      displayRank: true,
      showOnesAllSubmission: {
        username: '',
        problemCode: ''
      },

      total: 0,
      pageNow: 1,
      pageSize: 15,
      pageSizeOpts: [15, 30, 50],
      ascending: '',
      sortBy: ''
    }
  },
  filters: {
    contestProblemId: problemCode => contestProblemIdEncode(problemCode),
    time2minutes: time => {
      if (time === 0) {
        return '\b';
      }
      return parseInt(time / 60000).toString();
    }
  },
  computed: {
    ...mapGetters('user', ['isAdmin']),
    ...mapState('contest', ['contest', 'problems', 'likedScoresMap']),
    ...mapGetters('contest', [
      'contestId',
      'contestMode',
      'contestStatus',
      'scores',
      'likedScores',
      'problems'
    ]),
    ...mapGetters('user', ['profile']),
    CONTEST_MODE: () => CONTEST_MODE
  },
  methods: {
    onPageChange: function (pageNow) {
      this.pageNow = pageNow;
    },
    onPageSizeChange: function (pageSize) {
      this.pageSize = pageSize;
    },
    onSort: function({ key, order }) {
      if (order === 'normal') {
        this.sortBy = '';
        this.ascending = false;
      }  else {
        this.sortBy = key;
        this.ascending = (order === 'asc');
      }
    },
    setUserLiked: function(userId, status) {
      this.$store.commit('contest/setScoreLiked', { userId, status });
    },
    showAllSubmissions: function(username, problemCode) {
      const infoOpenness = this.contest.features[this.contestStatus === CONTEST_STATUS.RUNNING ? 'contestRunning' : 'contestEnd'];
      const displayPeerSubmission = infoOpenness.displayPeerSubmission;
      if (displayPeerSubmission || this.isAdmin || username === this.profile.username) {
        this.$refs.SubmissionList.querySubmissionList({
          username,
          problemCode,
          pageSize: this.pageSize,
          pageNow: this.pageNow,
          sortBy: this.sortBy,
          ascending: this.ascending
        }).then(ret => {
          this.total = parseInt(ret.totalPage) * this.pageSize;
          this.modelSubmissions = true;
        }).catch(err => {
          this.$Message.error(err.message);
        });
      }
    },
    onSubmissionListCellClick: function(row, col) {
      switch (col.key) {
        case 'submissionId':
        case 'judgeResult':
          if (row.username === this.username || this.isAdmin || row.isPublic) {
            this.$refs.SubmissionDetailView.query(row.submissionId);
            this.modelSubmissionDetail = true;
          }
          break;
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
