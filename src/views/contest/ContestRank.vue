<template>
 <div class="container">
   <div class="tools clearfix">
     <div class="clearfix" style="margin: 10px 3px">
       <div style="float: left">
         <strong>Begin: </strong>
         <span>{{ contestStartTime.format('yyyy-MM-DD hh:mm:ss') }}</span>
       </div>
       <div style="float: right">
         <strong>End: <span>{{ contestEndTime.format('yyyy-MM-DD hh:mm:ss') }}</span></strong>
       </div>
     </div>
     <div>
       <Slider v-model="currentPercent" :disabled="contestStatus === CONTEST_STATUS.RUNNING" show-tip="never" :step="0.001"/>
     </div>
     <div style="margin: 10px 10px 0 10px; text-align: center">
         <template v-if="contestStatus === CONTEST_STATUS.FINISHED">
           <strong v-if="sliderTime"> {{ (sliderTime - contestStartTime) | time2hour }}</strong>
           <strong v-else>Finished</strong>
         </template>
         <template v-else>
           <strong>{{ elapsed }}</strong>
         </template>
     </div>

   </div>
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
         <col class="scoreprob" v-for="problem in contest.problems" :key="problem.problemCode" />
       </template>
     </colgroup>
     <thead>
     <tr class="scoreheader">
       <th style="padding: 0 10px" title="rank" scope="col">RANK</th>
       <th style="padding: 0 10px" title="username" colspan="2" scope="col">PARTICIPANT</th>
       <th style="padding: 0 10px" title="# solved / penalty or score" colspan="2" scope="col">SCORE</th>
       <th :title="'problem ' + problem.problemTitle" scope="col" v-for="problem in contest.problems" :key="problem.problemCode">
        <router-link :to="{
          name: 'contest-problem',
          params: { problemCode: problem.problemCode }
        }">
          {{ problem.problemCode | contestProblemId }}
          <div class="circle" v-if="problem.ballonColor" :style="'background: ' + problem.ballonColor + ';'"></div>
          <div class="problempoints">
            {{ problem.acceptNum || 0 }} / {{ problem.submitNum || 0 }}
          </div>
        </router-link>
       </th>
     </tr>
     </thead>
     <tbody>
     <tr
       v-for="(score, index) in likedScores"
       :key="-score.user.userId"
       :class="{
          sortorderswitch: index === 0,
          scoreliked: likedScoresMap[score.user.userId],
          scorethisisme: score.user.userId === profile.userId
        }"
       :style="index === likedScores.length - 1 ? 'border-bottom: thick solid black;' : ''"
       :id="'user:' + score.user.userId">

       <td class="scorepl">
         {{ displayRank ? score.rank : '?' }}
       </td>
       <td class="scoreaf" style="background: #ffffff">
         <Icon v-if="likedScoresMap[score.user.userId]" class="heart fas" type="md-heart" @click="setUserLiked(index, false)"/>
         <Icon v-else class="heart" type="md-heart-outline" @click="setUserLiked(index, true)" />
       </td>
       <td class="scoretn" style="background: #ffffff" :title="score.user.username">
         <span class="forceWidth">{{ score.user.username }}</span>
         <span v-if="score.user.affiliation || false" class="forceWidth univ">{{ score.user.affiliation }}</span>
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
             <span>
              {{ (problem.numSubmissions + problem.numSubmissionsPending) === 1 ? '1 try' : (problem.numSubmissions + problem.numSubmissionsPending) + ' tries' }}
            </span>
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
             <span>
              {{ problem.time | time2minutes }}
            </span>
           </div>
         </a>
       </td>
     </tr>

     <tr
      v-for="(score, index) in scores"
      :key="score.user.userId"
      :class="{
        sortorderswitch: index === 0,
        scorethisisme: score.user.userId === profile.userId,
        scoreliked: likedScoresMap[score.user.userId]
      }"
      :id="'user:' + score.user.userId">

      <td class="scorepl">
        {{ displayRank ? score.rank : '?' }}
      </td>
      <td class="scoreaf" style="background: #ffffff">
        <Icon v-if="likedScoresMap[score.user.userId]" class="heart fas" type="md-heart" @click="setUserLiked(index, false)"/>
        <Icon v-else class="heart" type="md-heart-outline" @click="setUserLiked(index, true)" />
      </td>
      <td class="scoretn" style="background: #ffffff" :title="score.user.username">
          <span class="forceWidth">{{ score.user.username }}</span>
          <span v-if="score.user.affiliation || false" class="forceWidth univ">{{ score.user.affiliation }}</span>
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
            <span>
              {{ (problem.numSubmissions + problem.numSubmissionsPending) === 1 ? '1 try' : (problem.numSubmissions + problem.numSubmissionsPending) + ' tries' }}
            </span>
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
            <span>
              {{ problem.time | time2minutes }}
            </span>
          </div>
        </a>
      </td>
    </tr>
     </tbody>
   </table>
   <Modal v-model="modelSubmissions" width="900px" footer-hide :closable="false">
     <SubmissionList
       size="small"
       :filter="showOnesAllSubmission"
       :bannedKey="['problemCode', 'username']"
       @on-cell-click="onSubmissionListCellClick" />
   </Modal>
   <Modal v-model="modelSubmissionDetail" width="1000px" footer-hide :closable="false">
     <SubmissionDetailView :submission-id="submissionId" />
   </Modal>
 </div>
</template>

<script>
import SubmissionList from '_c/SubmissionList';
import SubmissionDetailView from '@/views/submission/SubmissionDetailView';

import moment from 'moment';
import { contestProblemId, s2hs } from '_u/transform';
import { CONTEST_MODE, CONTEST_STATUS } from '_u/constants';

import { mapState, mapGetters } from 'vuex';

import '@/styles/domjudge.css';

export default {
  name: 'ContestRank',
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
      submissionId: ''
    }
  },
  filters: {
    contestProblemId: problemCode => contestProblemId(problemCode),
    time2minutes: time => {
      if (time === 0) {
        return '\b';
      }
      return parseInt(time / 60 / 1000).toString();
    },
    time2hour: time => s2hs(time)
  },
  computed: {
    ...mapState('contest', ['contest', 'problems', 'likedScoresMap', 'sliderTime']),
    ...mapGetters('contest', [
      'contestId',
      'contestMode',
      'contestStatus',
      'contestStartTime',
      'contestEndTime',
      'contestDuration',
      'scores',
      'likedScores'
    ]),
    ...mapGetters('user', ['profile']),
    elapsed: function() {
      return s2hs(this.$store.state.now - this.contestStartTime);
    },
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
  },
  methods: {
    handleProgressChange: function(percent) {
      console.log(percent);
      if (percent === 100) {
        this.$store.commit('contest/setSliderTime', { sliderTime: null });
      } else {
        this.$store.commit('contest/setSliderTime', {
          sliderTime: this.contestStartTime + parseInt(this.contestDuration * percent / 100)
        });
      }
    },
    setUserLiked: function(index, status) {
      this.$store.commit('contest/setScoreLiked', { index, status });
    },
    showAllSubmissions: function(username, problemCode) {
      if (this.contestStatus === CONTEST_STATUS.FINISHED || username === this.profile.username) {
        this.showOnesAllSubmission = {
          username,
          problemCode
        };
        this.modelSubmissions = true;
      }
    },
    onSubmissionListCellClick: function(row, col) {
      if (col.key === 'judgeResult') {
        this.submissionId = row.submissionId;
        this.modelSubmissionDetail = true;
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .tools {
    margin: 10px auto;
    padding: 5px 10px;
    background: #f9f9f9;
  }
  .practice__switch {
    float: right;
  }
  /deep/ .ivu-slider-button {
    position: relative;
    top: -4px;
  }
</style>
