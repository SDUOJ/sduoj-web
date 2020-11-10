<!--
   Copyright 2020-2020 the original author or authors.

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
      <template slot-scope="{ row }" slot="id">
        <span class="underline">{{ row.submissionId }}</span>
      </template>
      <template slot-scope="{ row }" slot="title">
        <span class="underline">{{ row.problemTitle }}</span>
      </template>
      <template slot-scope="{ row }" slot="judge-result">
        <JudgeResult :result="row.judgeResult" />
      </template>
      <template slot-scope="{ row }" slot="time">
        <span class="time">{{ row.usedTime || 0 }}</span>
      </template>
      <template slot-scope="{ row }" slot="mem">
        <span class="mem">{{ row.usedMemory || 0 }}</span>
      </template>
      <template slot-scope="{ row }" slot="submit-time">
        <Tooltip :content="row.gmtCreate | timeformat('yyyy-MM-DD HH:mm:ss')" transfer>
          <span>{{ row.gmtCreate | fromnow }}</span>
        </Tooltip>
      </template>
    </Table>
    <div>
      <slot></slot>
<!--      <div v-if="doRejudge" class="left btns">-->
<!--        <Button @click="onRejudge"><Icon type="md-refresh" />&nbsp;Rejudge</Button>-->
<!--      </div>-->
<!--      <div class="right pages">-->
<!--        <Page-->
<!--          size="small" show-elevator show-sizer-->
<!--          :total="total"-->
<!--          :current.sync="pageNow"-->
<!--          @on-change="onPageChange"-->
<!--          @on-page-size-change="onPageSizeChange"/>-->
<!--      </div>-->
    </div>
  </Card>
</template>

<script>
import ProblemCode from '_c/ProblemCode';
import JudgeResult from '_c/JudgeResult';
import { contestProblemId } from '_u/transform';
import api from '_u/api';
import store from '@/store';
import { mapGetters } from 'vuex';
import moment from 'moment';

export default {
  name: 'SubmissionList',
  components: { JudgeResult },
  props: {
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
        { title: '#', key: 'submissionId', minWidth: 60, slot: 'id' },
        { title: 'Username', key: 'username' },
        {
          title: 'Problem Code',
          key: 'problemCode',
          minWidth: 15,
          render: function(h, params) {
            if (store.state.contest.contest.contestId) {
              return h('strong', contestProblemId(params.row.problemCode));
            } else {
              if (params.row.problemCode !== undefined) {
                if (params.row.problemCode.length > 20) {
                  const texts = params.row.problemCode.substring(0, 20) + '...';
                  return h('Tooltip', {
                    props: {
                      placement: 'top',
                      maxWidth: '180'
                    }
                  }, [
                    h(ProblemCode, {
                      class: 'hover',
                      props: {
                        problemCode: texts
                      }
                    }),
                    h('span', {
                      slot: 'content',
                      style: {
                        whiteSpace: 'normal',
                        wordBreak: 'break-all'
                      }
                    }, params.row.problemCode)
                  ]);
                } else {
                  return h(ProblemCode, {
                    class: 'hover',
                    props: {
                      problemCode: params.row.problemCode
                    }
                  });
                }
              }
            }
          }
        },
        { title: 'Title', key: 'problemTitle', slot: 'title' },
        { title: 'Judge Result', key: 'judgeResult', slot: 'judge-result', minWidth: 95 },
        { title: 'Time', key: 'usedTime', slot: 'time', sortable: true, maxWidth: 100 },
        { title: 'Memory', key: 'usedMemory', slot: 'mem', sortable: true, maxWidth: 120 },
        { title: 'Template', key: 'judgeTemplateTitle' },
        { title: 'Submit Time', key: 'gmtCreate', sortable: true, slot: 'submit-time' }
      ]
    },
    filter: {
      type: Object,
      default: () => {
        return {
          username: '',
          problemCode: '',
          judgeResult: '',
          language: ''
        }
      }
    },
    pageSize: {
      type: Number,
      default: 15
    },
    pageNow: {
      type: Number,
      default: 1
    },
    sortBy: {
      type: String,
      default: ''
    },
    ascending: {
      type: [String, Boolean],
      default: ''
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
    }
  },
  data: function() {
    return {
      filteredColumns: [],
      submissions: [],
      loading: false
    }
  },
  computed: {
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
    querySubmissionList: function() {
      this.loading = true;
      api.getSubmissionList({
        ...this.filter,
        contestId: this.contestId,
        sortBy: this.sortBy,
        ascending: this.ascending,
        pageNow: this.pageNow,
        pageSize: this.pageSize
      }).then(ret => {
        this.submissions = ret.rows;
        this.$emit('update-total', parseInt(ret.totalPage) * this.pageSize);
      }).finally(() => (this.loading = false));
    }
  },
  created: function() {
    this.filteredColumns = this.columns.filter(col => !this.bannedKey.includes(col.key));
    this.querySubmissionList();
  },
  watch: {
    pageNow: function() {
      this.querySubmissionList();
    },
    pageSize: function() {
      this.querySubmissionList();
    },
    sortBy: function() {
      this.querySubmissionList();
    },
    ascending: function() {
      this.querySubmissionList();
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
    content: " KB";
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
