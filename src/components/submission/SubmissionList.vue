<!--
   Copyright 2020-2021 the original author or authors.

   Licensed under the General Public License, Version 3.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

        https://www.gnu.org/licenses/gpl-3.0.en.html
 -->

<template>
  <Card class="clearfix" dis-hover :padding="0">
    <Table
      class="data-table"
      :size="size"
      :show-header="showHeader"
      :no-data-text="noDataText"
      :columns="filteredColumns"
      :data="submissions"
      :loading="loading"
      @on-selection-change="onSelectionChange"
      @on-sort-change="onSort"
      @on-cell-click="onCellClick">
      <template slot-scope="{ row }" slot="id" v-once>
        <router-link :to="{
          name: contestId ? 'contest-submission-detail' : 'submission-detail',
          params: { submissionId: row.submissionId }
        }">{{ row.submissionId }}</router-link>
      </template>
      <template slot-scope="{ row }" slot="title" v-once>
        <Tooltip :content="row.problemTitle" theme="light" transfer>
          <router-link :to="{
            name: contestId ? 'contest-problem' : 'problem-detail',
            params: { problemCode: row.problemCode }
          }">{{ row.problemCode | problemCodeEncode }}</router-link>
        </Tooltip>
      </template>
      <template slot-scope="{ row }" slot="judge-result">
        <JudgeResult :result="row.judgeResult" :total="row.checkpointNum" :current="row.$judgedNum" />
      </template>
      <template slot-scope="{ row }" slot="score">
        <span>{{ row.judgeScore === null ? '' : row.judgeScore }}</span>
      </template>
      <template slot-scope="{ row }" slot="time">
        <span class="time">{{ row.usedTime || 0 }}</span>
      </template>
      <template slot-scope="{ row }" slot="mem">
        <span class="mem">{{ row.usedMemory || 0 }}</span>
      </template>
      <template slot-scope="{ row }" slot="submit-time" v-once>
        <Tooltip :content="row.gmtCreate | timeformat('yyyy-MM-DD HH:mm:ss')" transfer>
          <span>{{ row.gmtCreate | fromnow }}</span>
        </Tooltip>
      </template>
    </Table>
    <div>
      <slot></slot>
    </div>
  </Card>
</template>

<script>
import JudgeResult from '_c/JudgeResult';
import { Websocket } from '_c/mixins';
import { JUDGE_RESULT_TYPE, CONTEST_STATUS } from '_u/constants';
import { contestProblemIdEncode } from '_u/transform';
import api from '_u/api';
import store from '@/store';
import { mapGetters, mapState } from 'vuex';
import moment from 'moment';

export default {
  name: 'SubmissionList',
  components: { JudgeResult },
  mixins: [Websocket],
  props: {
    selection: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'default'
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    doRejudge: {
      type: Boolean,
      default: false
    },
    noDataText: {
      type: String,
      default: ''
    },
    bannedKey: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => [
        { title: '#', key: 'submissionId', minWidth: 60, slot: 'id', props: { vOnce: true } },
        { title: 'Username', key: 'username', props: { vOnce: true } },
        { title: 'Problem', key: 'problemCode', slot: 'title', align: 'center' },
        { title: 'Judge Result', key: 'judgeResult', slot: 'judge-result', width: 200, align: 'center' },
        { title: 'Score', key: 'judgeScore', maxWidth: 100, slot: 'score', align: 'center' },
        { title: 'Time', key: 'usedTime', slot: 'time', sortable: true, align: 'right' },
        { title: 'Memory', key: 'usedMemory', slot: 'mem', sortable: true, align: 'right' },
        { title: 'Template', key: 'judgeTemplateTitle', props: { vOnce: true }, align: 'center' },
        { title: 'Submit Time', key: 'gmtCreate', sortable: true, slot: 'submit-time', align: 'center' }
      ]
    }
  },
  filters: {
    timeformat: function(timestamp, format) {
      if (typeof (timestamp) === 'string') {
        timestamp = parseInt(timestamp);
      }
      return moment(new Date(timestamp)).format(format);
    },
    fromnow: function(timestamp) {
      if (typeof (timestamp) === 'string') {
        timestamp = parseInt(timestamp);
      }
      return moment(new Date(timestamp)).fromNow();
    },
    problemCodeEncode: function(problemCode) {
      if (store.state.contest.contest.contestId) {
        return contestProblemIdEncode(problemCode);
      }
      return problemCode;
    }
  },
  data: function() {
    return {
      filteredColumns: [],
      submissions: [],
      loading: false,
      listenedSubmissions: {}
    }
  },
  computed: {
    ...mapState('contest', ['contest']),
    ...mapGetters('contest', ['contestId'])
  },
  methods: {
    onSort: function(e) {
      this.$emit('on-sort', e);
    },
    onCellClick: function(row, col, data, event) {
      this.$emit('on-cell-click', row, col, data, event);
    },
    onSelectionChange: function(selection) {
      this.$emit('on-selection-change', selection);
    },
    wsSuccess: function (data) {
      if (typeof data === 'string') {
        data = JSON.parse(data);
      }
      for (let i = 0; i < data.length; ++i) {
        // data[i]不是数组的话就是单独的一个数：表示评测状态 -3 compiling -2 judging
        // 如果data[i]是数组但是只有一个元素也是表示评测状态，此时 fileCheckpointResults 会返回false
        if (Array.isArray(data[i])) {
          this.fillCheckpointResults(data[i]);
        } else {
          this.fillCheckpointResults(data);
          break;
        }
      }
    },
    fillCheckpointResults: function (oneJudge) {
      const index = this.listenedSubmissions[oneJudge[0]];
      if (index === undefined) return;
      if (oneJudge[1] < JUDGE_RESULT_TYPE.PD) {
        if (oneJudge[1] === JUDGE_RESULT_TYPE.END) {
          this.submissions[index].judgeResult = oneJudge[2];
          this.submissions[index].judgeScore = oneJudge[3];
          this.submissions[index].usedTime = oneJudge[4].toString();
          this.submissions[index].usedMemory = oneJudge[5].toString();
          if (--this.listenedSubmissions.$length === 0) {
            this.websock.close();
          }
        } else {
          this.submissions[index].judgeResult = oneJudge[1];
        }
      } else {
        // 统计该submission一共评了几个测试点
        this.submissions[index].$judgedNum++;
      }
    },
    querySubmissionList: function(params) {
      return new Promise((resolve, reject) => {
        this.loading = true;
        api.getSubmissionList({
          ...params,
          contestId: this.contestId
        }).then(ret => {
          resolve(ret);
          this.submissions = ret.rows;

          // 所有人都看不到 websocket
          if (this.contestId) {
            const infoOpenness = this.contest.features[this.contestStatus === CONTEST_STATUS.RUNNING ? 'contestRunning' : 'contestEnd'];
            const displayCheckpointResult = infoOpenness.displayCheckpointResult;
            if (!displayCheckpointResult) return;
          }

          let length = 0;
          this.listenedSubmissions = {};
          ret.rows.forEach((o, i) => {
            if (o.judgeResult <= JUDGE_RESULT_TYPE.PD) {
              this.$set(o, '$judgedNum', 0);
              this.listenedSubmissions[o.submissionId] = i;
              length++;
            }
          });

          if (length === 0) return;

          this.initWebSocket(
            '/submission',
            Object.keys(this.listenedSubmissions),  // 监听的 submissionId
            this.wsSuccess
          );
          this.$set(this.listenedSubmissions, '$length', length);
        }).catch(reject)
          .finally(() => {
            this.loading = false;
          });
      });
    }
  },
  created: function() {
    this.filteredColumns = this.columns.filter(col => !this.bannedKey.includes(col.key));
    if (this.selection) {
      this.filteredColumns = [{
        type: 'selection',
        width: 55
      }].concat(this.filteredColumns);
    }
  }
}
</script>

<style lang="less" scoped>
.time::after {
  content: " ms";
  white-space: pre;
}

.mem::after {
  content: " KiB";
  white-space: pre;
}

.underline {
  color: #2D8cF0;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}
</style>
