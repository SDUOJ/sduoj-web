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
          params: {
            problemCode: problem.problemCode,
            contestId
          }
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
       <td class="scorett">{{ score.score }}</td>

       <td class="score_cell" v-for="problem in score.problems" :key="problem.problemCode">
         <a @dblclick="showAllSubmissions(score.user.username, problem.problemCode)">
           <div :class="problem.css" v-if="(problem.numSubmissions + problem.numSubmissionsPending) > 0">
             {{ problem.time | raw }}
             <span>
                {{ (problem.numSubmissions + problem.numSubmissionsPending) === 1 ? '1 try' : (problem.numSubmissions + problem.numSubmissionsPending) + ' tries' }}
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
        <td class="scorett">{{ score.score }}</td>

        <td class="score_cell" v-for="problem in score.problems" :key="problem.problemCode">
          <a @dblclick="showAllSubmissions(score.user.username, problem.problemCode)">
            <div :class="problem.css" v-if="(problem.numSubmissions + problem.numSubmissionsPending) > 0">
              {{ problem.time | raw }}
              <span>
                {{ (problem.numSubmissions + problem.numSubmissionsPending) === 1 ? '1 try' : (problem.numSubmissions + problem.numSubmissionsPending) + ' tries' }}
              </span>
            </div>
          </a>
        </td>
      </tr>
     </tbody>
   </table>
   <Modal v-model="modelSubmissions" width="1000px">
     <SubmissionView />
   </Modal>
   <Modal v-model="modelSubmissionDetail">
     <SubmissionDetailView />
   </Modal>
 </div>
</template>

<script>
import SubmissionView from '@/views/submission/SubmissionView';
import SubmissionDetailView from '@/views/submission/SubmissionDetailView';
import '@/styles/domjudge.css';
import { mapState, mapGetters } from 'vuex';
import rankHandler from '@/views/contest/ranks';
import utils from '_u';

export default {
  name: 'ContestRank',
  components: { SubmissionView, SubmissionDetailView },
  data: function() {
    return {
      modelSubmissions: false,
      modelSubmissionDetail: false,
      displayRank: true,
      showSubmissions: true,
      showFlags: false,
      scores: [
        {
          rank: 1,
          user: {
            username: 'tttt',
            userId: '1',
            affiliation: 'Nanjing University'
          },
          solved: 10,
          score: 100,
          liked: true,
          problems: [
            {
              problemCode: 1,
              css: 'score_first',
              time: 60,
              numSubmissions: 5,
              numSubmissionsPending: 0
            },
            { problemCode: 2, css: 'score_correct', time: 100, numSubmissions: 1 },
            { problemCode: 3, css: 'score_pending', time: 200, numSubmissions: 0, numSubmissionsPending: 1 },
            { },
            { },
            { },
            { },
            { },
            { },
            { },
            { },
            { },
            { },
            { },
            { },
            { },
            { },
            { },
            { },
            { },
            { },
            { }
          ]
        }
      ]
    }
  },
  filters: {
    contestProblemId: problemCode => utils.contestProblemId(problemCode),
    raw: time => parseInt(time / 60)
  },
  computed: {
    ...mapState('contest', ['contest', 'problems']),
    ...mapGetters('contest', ['mode', 'contestId']),
    ...mapGetters('user', ['profile']),
    '@': function() {
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
      this.$set(this.$route.params, 'username', username);
      this.$set(this.$route.params, 'problemCode', problemCode);
      this.modelSubmissions = true;
    }
  }
}
</script>

<style scoped>
  .cl_FFFFFF {
    background-color: #FFFFFF;
  }

  .cl_FFFFFF .forceWidth.toolong:after {
    background: linear-gradient(to right,
    rgba(255,255,255,0) 0%,
    rgba(255,255,255,1) 96%);
  }
</style>
