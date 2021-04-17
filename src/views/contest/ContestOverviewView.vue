<!--
   Copyright 2020-2021 the original author or authors.

   Licensed under the General Public License, Version 3.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

        https://www.gnu.org/licenses/gpl-3.0.en.html
 -->

<template>
  <div class="container">
    <div v-if="contestOpenness === CONTEST_OPENNESS.PRIVATE && !$store.getters['contest/hasParticipatedIn']">
      <Form :model="participateForm" inline>
        <FormItem>
          <Input style="width: 200px;" type="password" v-model="participateForm.password" placeholder="Password">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem>
          <Button @click="handleParticipate">Participate In</Button>
        </FormItem>
      </Form>
    </div>
    <div v-else-if="contestStarted">
      <div class="overview">
        <Card dis-hover :padding="0">
          <Table
            :columns="problemColumn"
            :data="problems"
            @on-cell-click="handleCellClick">
            <template slot-scope="{ row }" slot="problemCode">
              <strong class="hover">{{ row.problemCode | contestProblemId }}</strong>
            </template>
            <template slot-scope="{ row }" slot="title">
              <div class="circle" v-if="row.problemColor" :style="`background: ${row.problemColor};`" />
              <div class="nocircle" v-else />
              <router-link
                :to="{
                  name: 'contest-problem',
                  params: { problemCode: row.problemCode }
                }"
                style="text-decoration: none; color: black">{{ row.problemTitle }}</router-link>
            </template>
            <template slot-scope="{ row }" slot="ratio">
              <span>{{ `${row.acceptNum || '-'} / ${row.submitNum || '-'}` }}</span>
            </template>
            <template slot-scope="{ row }" slot="status">
              <JudgeResult :result="row.judgeResult" />
            </template>
            <template slot-scope="{ row }" slot="score">
              <span v-if="row.judgeResult && showJudgeScore">{{ row.judgeScore }}</span>
            </template>
          </Table>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
import JudgeResult from '_c/JudgeResult';
import { mapGetters, mapState } from 'vuex';
import { CONTEST_OPENNESS, CONTEST_STATUS } from '_u/constants';
import api from '_u/api';
import { contestProblemIdEncode } from '_u/transform';

export default {
  name: 'ContestOverviewView.vue',
  inject: ['reload'],
  components: {
    JudgeResult
  },
  filters: {
    contestProblemId: val => contestProblemIdEncode(val)
  },
  data: function() {
    return {
      participateForm: {
        password: '',
        contestId: ''
      },
      problemColumn: [
        { key: 'problemCode', maxWidth: 60, slot: 'problemCode' },
        { key: 'problemTitle', title: 'Title', slot: 'title' },
        { title: 'AC / Submits', slot: 'ratio' },
        { title: 'Status', slot: 'status' },
        { title: 'Score', slot: 'score' }
      ]
    }
  },
  methods: {
    handleParticipate: function() {
      this.participateForm.contestId = this.contest.contestId;
      if (this.contestOpenness !== CONTEST_OPENNESS.PROTECTED && !this.hasParticipatedIn) {
        api.participateIn(this.participateForm)
          .catch(err => {
            this.$Message.error(err.message);
          });
      }
    },
    handleCellClick: function(row, col) {
      if (col.key === 'problemCode') {
        this.$router.push({
          name: 'contest-problem',
          params: { problemCode: row.problemCode }
        });
      }
    }
  },
  computed: {
    ...mapGetters('user', ['username']),
    ...mapState('contest', ['contest', 'questions']),
    ...mapGetters('contest', [
      'contestLoaded',
      'contestStartTime',
      'contestEndTime',
      'contestStarted',
      'contestOpenness',
      'contestStatus',
      'scores',
      'problems',
      'hasParticipatedIn'
    ]),
    CONTEST_OPENNESS: () => CONTEST_OPENNESS,
    showJudgeScore: function() {
      const infoOpenness = this.contest.features[this.contestStatus === CONTEST_STATUS.RUNNING ? 'contestRunning' : 'contestEnd'];
      return infoOpenness.displayJudgeScore;
    }
  },
  mounted: function () {
    if (this.contestOpenness === CONTEST_OPENNESS.PUBLIC) {
      this.handleParticipate();
    }
  }
}
</script>

<style lang="less" scoped>
  .overview {
    margin: 24px auto;
    width: 80%;
  }
  .nocircle {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    display: inline-block;
    margin-right: 5px;
    vertical-align: middle;
  }
  .circle {
    margin-right: 5px;
  }
</style>
