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
      <div class="clearfix filter-sets">
        <div>
          <div class="filter-title">By Username</div>
          <Input v-model="filterForm.username"
            placeholder="Username"
            style="width: 200px;"
            @on-enter="onFiltering">
          </Input>
        </div>
        <div>
          <div class="filter-title">By Problem Code</div>
          <Input v-model="filterForm.problemCode"
            placeholder="Problem Code"
            style="width: 200px;"
            @on-enter="onFiltering">
          </Input>
        </div>
        <div>
          <div class="filter-title">By Judge Result</div>
          <Input v-model="filterForm.judgeResult"
            placeholder="Judge Result"
            style="width: 200px;"
            @on-enter="onFiltering">
          </Input>
        </div>
        <div>
          <div class="filter-title">By Judge Template</div>
          <Input v-model="filterForm.judgeTemplate"
            placeholder="Judge Template"
            style="width: 200px;"
            @on-enter="onFiltering">
          </Input>
        </div>
      </div>
    </Card>
    <SubmissionList
      :filter="filterOption"
      :doRejudge="canDoRejudge"
      @on-rejudge="handleRejudge"
      @on-cell-click="onSubmissionListCellClick"/>
  </div>
</template>

<script>
import SubmissionList from '_c/SubmissionList';
import { mapGetters, mapState } from 'vuex';
import api from '_u/api';

export default {
  name: 'SubmissionView',
  components: { SubmissionList },
  data: function() {
    return {
      filterOption: {},
      filterForm: {},
      selectedSubmissions: []
    }
  },
  methods: {
    clearFilterOptions: function() {
      for (const key in this.filterOption) {
        this.filterOption[key] = '';
      }
    },
    onFiltering: function() {
      this.filterOption = { ...this.filterForm };
    },
    onReset: function() {
      this.clearFilterOptions();
    },
    onSubmissionListCellClick: function(row, col) {
      const name = this.contestId ? 'contest-submission-detail' : 'submission-detail';
      switch (col.key) {
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
    handleRejudge: function(submissions) {
      api.rejudge({
        contestId: this.contestId,
        submissionIds: submissions.map(item => item.submissionId)
      });
    }
  },
  computed: {
    ...mapState('contest', ['contest']),
    ...mapGetters('contest', ['contestId']),
    ...mapGetters('user', ['isAdmin', 'username']),
    canDoRejudge: function() {
      return !!(this.contestId && (this.isAdmin || this.contest.username === this.username));
    }
  },
  mounted: function() {
    this.filterForm = { ...this.$route.params };
    this.onFiltering();
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

</style>
