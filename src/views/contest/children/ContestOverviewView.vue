<template>
  <div class="container">
    <template v-if="openness === 'private' && $store.getters['contest/needPassword']">
          <Input type="password" v-model="participateForm.password" placeholder="Password">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
          <Button @click="handleParticipate">Participate In</Button>
    </template>
    <template v-else-if="start">
      <div class="overview">
        <Card dis-hover :padding="0">
          <ContestProblem
            :problems="contest.problems"
            @on-cell-click="handleCellClick"/>
        </Card>
      </div>
    </template>
  </div>
</template>

<script>
import ContestProblem from '_c/ContestProblem';
import { mapGetters, mapState } from 'vuex';
import api from '_u/api';

export default {
  name: 'ContestOverviewView.vue',
  components: { ContestProblem },
  data: function() {
    return {
      participateForm: {
        password: '',
        contestId: ''
      },
      start: false
    }
  },
  methods: {
    handleParticipate: function() {
      this.participateForm.contestId = this.contest.contestId;
      if (this.openness !== 'protected' && !this.contest.participants.includes(this.username)) {
        api.participateIn(this.participateForm)
          .then(() => {
            this.$router.push(0)
          });
      }
    },
    handleCellClick: function(row, col) {
      if (col.key === 'problemCode' || col.key === 'problemTitle') {
        this.$router.push({
          name: 'contest-problem',
          params: {
            contestId: this.contest.contestId,
            problemCode: row.problemCode
          }
        });
      }
    }
  },
  computed: {
    ...mapGetters('user', ['username']),
    ...mapGetters('contest', ['startTime', 'endTime', 'openness']),
    ...mapState('contest', ['contest', 'questions'])
  },
  mounted: function () {
    if (this.openness === 'public') {
      this.handleParticipate();
    }
    const currentTime = new Date();
    if (this.startTime <= currentTime) {
      // start
      this.start = true;
    }
  }
}
</script>

<style lang="less" scoped>
  .overview {
    margin: 24px auto;
    width: 80%;
  }
</style>
