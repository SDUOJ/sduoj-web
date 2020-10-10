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
      @on-sort-change="onSort"
      @on-cell-click="onCellClick"></Table>
    <div class="pages">
      <Page
        size="small" show-elevator show-sizer
        :total="total"
        :current.sync="pageNow"
        @on-change="onPageChange"
        @on-page-size-change="onPageSizeChange"/>
    </div>
  </Card>
</template>

<script>
import ProblemCode from '_c/ProblemCode';
import JudgeResult from '_c/JudgeResult';
import utils from '_u';
import api from '_u/api';
import { mapGetters } from 'vuex';
import store from '@/store';

export default {
  name: 'SubmissionList',
  props: {
    size: {
      type: String,
      default: 'default'
    },
    showHeader: {
      type: Boolean,
      default: true
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
        { title: '#', key: 'submissionId', minWidth: 70 },
        { title: 'Username', key: 'username' },
        {
          title: 'Problem Code',
          key: 'problemCode',
          minWidth: 15,
          render: function(h, params) {
            if (store.state.contest.contest.contestId) {
              return h('strong', utils.contestProblemId(params.row.problemCode));
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
        {
          title: 'Judge Result',
          key: 'judgeResult',
          minWidth: 100,
          render: (h, params) => h(JudgeResult, { props: { result: params.row.judgeResult } })
        },
        { title: 'Time', key: 'usedTime', sortable: true, maxWidth: 90 },
        { title: 'Memory', key: 'usedMemory', sortable: true, maxWidth: 120 },
        { title: 'Language', key: 'language' },
        {
          title: 'Submit Time',
          key: 'gmtCreate',
          minWidth: 55,
          render: (h, params) => h('Time', { props: { time: parseInt(params.row.gmtCreate), type: 'datetime' } })
        }
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
    }
  },
  data: function() {
    return {
      filteredColumns: [],
      submissions: [],
      total: 0,
      pageNow: 1,
      pageSize: 10,
      sortBy: '',
      ascending: false,
      loading: false
    }
  },
  computed: {
    ...mapGetters('contest', ['contestId'])
  },
  methods: {
    onPageChange: function(pageNow) {
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
    onCellClick: function(row, col, data, event) {
      this.$emit('on-cell-click', row, col, data, event);
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
        this.total = parseInt(this.pageSize) * parseInt(ret.totalPage);
      }).finally(() => (this.loading = false));
    }
  },
  watch: {
    filter: function() {
      this.querySubmissionList();
    },
    pageNow: function () {
      this.querySubmissionList();
    },
    pageSize: function() {
      this.querySubmissionList();
    },
    sortBy: function () {
      this.querySubmissionList();
    },
    ascending: function() {
      this.querySubmissionList();
    }
  },
  created: function() {
    this.filteredColumns = this.columns.filter(col => !this.bannedKey.includes(col.key));
  }
}
</script>

<style scoped>
  .data-table {
    user-select: none;
  }
  .pages {
    float: right;
    margin: 20px auto;
    padding-right: 15px;
  }
</style>
