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
          <span class="problempoints">
            {{ problem.weight }}
          </span>
        </router-link>
       </th>
     </tr>
     </thead>
     <tbody>
     <tr
       v-for="(score, index) in scores"
       :key="-score.user.userId"
       :class="{
          sortorderswitch: index === 0,
          scorethisisme: score.user.userId === profile.userId,
          scoreliked: score.liked
        }"
       :id="'user:' + score.user.userId">

       <td class="scorepl">
         {{ displayRank ? score.rank : '?' }}
       </td>
       <td class="scoreaf" style="background: #ffffff">
         <Icon v-if="score.liked" class="heart fas" type="md-heart" @click="setUserLiked(index, false)"/>
         <Icon v-else class="heart" type="md-heart-outline" @click="setUserLiked(index, true)" />
       </td>
       <td class="scoretn" style="background: #ffffff" :title="score.user.username">
         <span class="forceWidth">{{ score.user.username }}</span>
         <span v-if="score.user.affiliation || false" class="forceWidth univ">{{ score.user.affiliation }}</span>
       </td>
       <td class="scorenc">{{ score.solved }}</td>
       <td class="scorett" v-if="mode === 'acm'">{{ score.score | time2minutes }}</td>
       <td class="scorett" v-else>{{ score.score }}</td>

       <td class="score_cell" v-for="problem in score.problemResults" :key="problem.problemCode">
         <a v-if="mode === 'acm'">
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
         <a v-else-if="mode === 'oi'">
           <div
             :class="problem.css"
             v-if="problem.numSubmissions > 0"
             @click="showAllSubmissions(score.user.username, problem.problemCode)">
             {{ problem.score }}
           </div>
         </a>
         <a v-else-if="mode === 'ioi'">
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
        scoreliked: score.liked
      }"
      :id="'user:' + score.user.userId">

      <td class="scorepl">
        {{ displayRank ? score.rank : '?' }}
      </td>
      <td class="scoreaf" style="background: #ffffff">
        <Icon v-if="score.liked" class="heart fas" type="md-heart" @click="setUserLiked(index, false)"/>
        <Icon v-else class="heart" type="md-heart-outline" @click="setUserLiked(index, true)" />
      </td>
      <td class="scoretn" style="background: #ffffff" :title="score.user.username">
          <span class="forceWidth">{{ score.user.username }}</span>
          <span v-if="score.user.affiliation || false" class="forceWidth univ">{{ score.user.affiliation }}</span>
      </td>
      <td class="scorenc">{{ score.solved }}</td>
      <td class="scorett" v-if="mode === 'acm'">{{ score.score | time2minutes }}</td>
      <td class="scorett" v-else>{{ score.score }}</td>

      <td class="score_cell" v-for="problem in score.problemResults" :key="problem.problemCode">
        <a v-if="mode === 'acm'">
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
        <a v-else-if="mode === 'oi'">
          <div
            :class="problem.css"
            v-if="problem.numSubmissions > 0"
            @click="showAllSubmissions(score.user.username, problem.problemCode)">
            {{ problem.score }}
          </div>
        </a>
        <a v-else-if="mode === 'ioi'">
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
import rankHandler from '@/views/contest/ranks';
import utils from '_u';
import api from '_u/api';

import { mapState, mapGetters } from 'vuex';

import '@/styles/domjudge.css';

export default {
  name: 'ContestRank',
  components: { SubmissionList, SubmissionDetailView },
  data: function() {
    return {
      scores: [],
      modelSubmissions: false,
      modelSubmissionDetail: false,
      displayRank: true,
      showSubmissions: true,
      showFlags: false,
      intervalInstance: null,
      showOnesAllSubmission: {
        username: '',
        problemCode: ''
      },
      submissionId: ''
    }
  },
  filters: {
    contestProblemId: problemCode => utils.contestProblemId(problemCode),
    time2minutes: time => {
      if (time === 0) {
        return '\b';
      }
      return parseInt(time / 60 / 1000).toString();
    }
  },
  computed: {
    ...mapState('contest', ['contest', 'problems']),
    ...mapGetters('contest', ['mode', 'contestId', 'startTime']),
    ...mapGetters('user', ['profile']),
    rankHandler: function() {
      return rankHandler[this.mode];
    },
    scoresLiked: function() {
      return this.scores.filter(score => score.liked || score.user.userId === this.profile.userId);
    }
  },
  methods: {
    setUserLiked: function(index, state) {
      this.$set(this.scores[index], 'liked', state);
    },
    showAllSubmissions: function(username, problemCode) {
      this.showOnesAllSubmission = { username, problemCode };
      this.modelSubmissions = true;
    },
    onSubmissionListCellClick: function(row, col) {
      if (col.key === 'judgeResult') {
        this.submissionId = row.submissionId;
        this.modelSubmissionDetail = true;
      }
    },
    calculateScore: function(score) {
      const ret = { ...score };
      delete ret.userId;
      delete ret.username;
      delete ret.submissions;

      ret.user = {
        userId: score.userId,
        username: score.username
      };
      ret.liked = false;

      if (score.submissions) {
        ret.problemResults = this.rankHandler.calculateProblemResult(score.submissions, score.problemNum);
      }

      return Object.assign(ret, this.rankHandler.formatProblemResults(ret.problemResults, this.startTime));
    },
    getContestRank: function() {
      api.getContestRank(this.contestId).then(ret => {
        const scores = [];
        ret.forEach(score => (scores.push(this.calculateScore(score))));
        this.scores = this.rankHandler.calculateRank(scores);

        // first blood
        const firstSolvedMap = {};
        this.scores.forEach(score => {
          for (const result in score.problemResults) {
            if (utils.judgeResultMap.AC === result.judgeResult) {
              if (!firstSolvedMap[result.problemCode] || firstSolvedMap[result.problemCode] > result.gmtCreate) {
                firstSolvedMap[result.problemCode] = result.gmtCreate;
              }
            }
          }
        });
        this.scores.forEach(score => {
          for (const result in score.problemResults) {
            if (utils.judgeResultMap.AC === result.judgeResult && firstSolvedMap[result.problemCode] === result.gmtCreate) {
              result.css = 'score_first';
            }
          }
        })
      })
    }
  },
  mounted: function() {
    this.getContestRank();

    this.intervalInstance = setInterval(() => {
      this.getContestRank();
    }, 30000);
  },
  beforeDestroy: function() {
    if (this.intervalInstance) {
      clearInterval(this.intervalInstance);
    }
  }
}
</script>

<style scoped>
</style>
