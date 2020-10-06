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
          <Table
            :columns="problemColumn"
            :data="contest.problems"
            @on-cell-click="handleCellClick" />
        </Card>
      </div>
    </template>
  </div>
</template>

<script>
import JudgeResult from '_c/JudgeResult';
import { mapGetters, mapState } from 'vuex';
import api from '_u/api';
import utils from '_u';

export default {
  name: 'ContestOverviewView.vue',
  inject: ['reload'],
  data: function() {
    return {
      participateForm: {
        password: '',
        contestId: ''
      },
      start: false,
      problemColumn: [
        {
          key: 'problemCode',
          maxWidth: 60,
          render: (h, params) => h('strong', { class: 'hover' }, utils.contestProblemId(params.row.problemCode))
        },
        {
          title: 'Problem Title',
          key: 'problemTitle',
          render: (h, params) => h('span', { class: 'hover' }, params.row.problemTitle)
        },
        {
          title: 'AC/Submit',
          render: (h, params) => {
            if (params.row.submitNum > 0) {
              return h('span', params.row.acceptNum + '/' + params.row.submitNum);
            } else {
              return '';
            }
          }
        },
        {
          title: 'Status',
          key: 'judgeResult',
          render: (h, params) => {
            if (params.row.judgeResult === 0) {
              return '';
            } else {
              return h(JudgeResult, { props: { result: params.row.judgeResult } });
            }
          }
        }
      ]
    }
  },
  methods: {
    handleParticipate: function() {
      this.participateForm.contestId = this.contest.contestId;
      if (this.openness !== 'protected' && !this.contest.participants.includes(this.username)) {
        api.participateIn(this.participateForm).then(() => (this.reload()));
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
