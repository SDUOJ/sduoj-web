<!--
   Copyright 2020-2020 the original author or authors.

   Licensed under the General Public License, Version 3.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

        https://www.gnu.org/licenses/gpl-3.0.en.html
 -->

<template>
  <div class="container">
    <Card class="filter" dis-hover :padding="0">
        <h3 slot="title" style="display: inline">Filter</h3>
        <div slot="extra" class="btns card-extra">
          <Button type="text" @click="onFiltering">Filter</Button>
          <Button type="text" @click="onReset">Reset</Button>
        </div>
      <Row class="clearfix filter-sets">
        <Col span="6">
          <div class="filter-title">By Username</div>
          <Input v-model="tUsername"
            placeholder="Username"
            style="width: 200px;"
            @on-enter="onFiltering">
          </Input>
        </Col>
        <Col span="6">
          <div class="filter-title">By Problem Code</div>
          <Input v-model="tProblemCode"
            placeholder="Problem Code"
            style="width: 200px;"
            @on-enter="onFiltering">
          </Input>
        </Col>
        <Col span="6">
          <div class="filter-title">By Judge Result</div>
          <Input v-model="tJudgeResult"
            placeholder="Judge Result"
            style="width: 200px;"
            @on-enter="onFiltering">
          </Input>
        </Col>
        <Col span="6">
          <div class="filter-title">By Judge Template</div>
          <Input v-model="tJudgeTemplate"
            placeholder="Judge Template"
            style="width: 200px;"
            @on-enter="onFiltering">
          </Input>
        </Col>
      </Row>
    </Card>
    <SubmissionList
      ref="SubmissionList"
      :selection="canDoRejudge"
      @update-total-page="onUpdateTotal"
      @on-selection-change="onSelectionChange"
      @on-sort="onSort"
      @on-cell-click="onSubmissionListCellClick">
      <template>
        <div v-if="canDoRejudge" class="left footer-btns">
          <Button @click="handleRejudge(selectedSubmissions)"><Icon type="md-refresh" />&nbsp;Rejudge</Button>
        </div>
        <div class="right footer-pages">
          <Page
            size="small" show-elevator show-sizer
            :total="total"
            :current.sync="pageNow"
            :page-size="pageSize"
            :page-size-opts="pageSizeOpts"
            @on-change="onPageChange"
            @on-page-size-change="onPageSizeChange"/>
        </div>
      </template>
    </SubmissionList>
  </div>
</template>

<script>
import SubmissionList from '_c/SubmissionList';
import { mapGetters, mapState } from 'vuex';
import api from '_u/api';

import { Page } from '_c/mixins';

export default {
  name: 'SubmissionView',
  components: { SubmissionList },
  mixins: [Page],
  data: function() {
    return {
      tUsername: '',
      tProblemCode: '',
      tJudgeResult: '',
      tJudgeTemplate: '',
      selectedSubmissions: []
    }
  },
  methods: {
    onFiltering: function() {
      this.username = this.tUsername;
      this.problemCode = this.tProblemCode;
      this.judgeResult = this.tJudgeResult;
      this.judgeTemplate = this.tJudgeTemplate;
    },
    onReset: function() {
      this.username = '';
      this.problemCode = '';
      this.judgeResult = '';
      this.judgeTemplate = '';
    },
    onSubmissionListCellClick: function(row, col) {
      const name = this.contestId ? 'contest-submission-detail' : 'submission-detail';
      switch (col.key) {
        case 'submissionId':
        case 'judgeResult':
          this.$router.push({
            name,
            params: { submissionId: row.submissionId }
          });
          break;
        case 'problemCode':
        case 'problemTitle':
          this.$router.push({
            name: 'problem-detail',
            params: { problemCode: row.problemCode }
          });
          break;
      }
    },
    onSelectionChange: function(selections) {
      this.selectedSubmissions = selections;
    },
    onUpdateTotal: function(totalPage) {
      this.total = totalPage * this.pageSize;
    },
    handleRejudge: function(submissions) {
      api.rejudge({
        contestId: this.contestId,
        submissionIds: submissions.map(item => item.submissionId)
      });
    },
    getSubmissionList: function() {
      this.$refs.SubmissionList.querySubmissionList({
        username: this.username,
        problemCode: this.problemCode,
        judgeResult: this.judgeResult,
        judgeTemplate: this.judgeTemplate,
        pageNow: this.pageNow,
        pageSize: this.pageSize,
        sortBy: this.sortBy,
        ascending: this.ascending
      });
    }
  },
  computed: {
    ...mapState('contest', ['contest']),
    ...mapGetters('contest', ['contestId']),
    ...mapGetters('user', ['isAdmin', 'username']),
    canDoRejudge: function() {
      return !!(this.contestId && (this.isAdmin || this.contest.username === this.username));
    },
    username: {
      get: function() {
        return this.$route.params.username || this.$route.query.username || '';
      },
      set: function(username) {
        this.$router.push({ query: { ...this.$route.query, username } });
      }
    },
    problemCode: {
      get: function() {
        return this.$route.params.problemCode || this.$route.query.problemCode || '';
      },
      set: function(problemCode) {
        this.$router.push({ query: { ...this.$route.query, problemCode } });
      }
    },
    judgeResult: {
      get: function() {
        return this.$route.params.judgeResult || this.$route.query.judgeResult || '';
      },
      set: function(judgeResult) {
        this.$router.push({ query: { ...this.$route.query, judgeResult } });
      }
    },
    judgeTemplate: {
      get: function() {
        return this.$route.params.judgeTemplate || this.$route.query.judgeTemplate || '';
      },
      set: function(judgeTemplate) {
        this.$router.push({ query: { ...this.$route.query, judgeTemplate } });
      }
    }
  },
  mounted: function() {
    this.tUsername = this.$route.params.username || this.$route.query.username;
    this.tProblemCode = this.$route.params.problemCode || this.$route.query.problemCode;
    this.tJudgeResult = this.$route.params.judgeResult || this.$route.query.judgeResult;
    this.tJudgeTemplate = this.$route.params.judgeTemplate || this.$route.query.judgeTemplate;
    this.onFiltering();
    this.getSubmissionList();
  },
  watch: {
    $route: function() {
      this.getSubmissionList();
    }
  }
}
</script>

<style lang="less" scoped>
.filter {
  margin-bottom: 20px;
}

.filter-sets {
  margin: 10px 20px;
  display: flex;
  justify-content: space-between;
}

.filter-title {
  font-weight: 500;
  margin-bottom: 3px;
}

.btns {
  .ivu-btn:hover {
    background: rgba(0, 0, 0, .05);
  }
}

.footer-btns {
  margin: 15px;
}

.footer-pages {
  margin: 15px auto;
  padding-right: 15px;
}

</style>
