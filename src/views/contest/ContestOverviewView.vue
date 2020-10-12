<!--
   Copyright 2020-2020 the original author or authors.

   Licensed under the General Public License, Version 3.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

        https://www.gnu.org/licenses/gpl-3.0.en.html
 -->

<template>
  <div class="container">
    <div v-if="openness === 'private' && $store.getters['contest/needPassword']">
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
    <div v-else-if="start">
      <div class="overview">
        <Card dis-hover :padding="0">
          <Table
            :columns="problemColumn"
            :data="contest.problems"
            @on-cell-click="handleCellClick" />
        </Card>
      </div>
    </div>
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
          params: { problemCode: row.problemCode }
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
