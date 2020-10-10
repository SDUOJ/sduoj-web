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
        <h3 slot="title" style="display: inline">过滤</h3>
        <div slot="extra" class="btns card-extra">
          <Button type="text" @click="onFiltering">过滤</Button>
          <Button type="text" @click="onReset">重置</Button>
        </div>
      <div class="clearfix filter-sets">
        <div>
          <div class="filter-title">由用户</div>
          <Input v-model="filterForm.username"
            placeholder="Username"
            style="width: 200px;"
            @on-enter="onFiltering">
          </Input>
        </div>
        <div>
          <div class="filter-title">由题目</div>
          <Input v-model="filterForm.problemCode"
            placeholder="Problem Code"
            style="width: 200px;"
            @on-enter="onFiltering">
          </Input>
        </div>
        <div>
          <div class="filter-title">由评测结果</div>
          <Input v-model="filterForm.judgeResult"
            placeholder="Status"
            style="width: 200px;"
            @on-enter="onFiltering">
          </Input>
        </div>
        <div>
          <div class="filter-title">由语言</div>
          <Input v-model="filterForm.lang"
            placeholder="Language"
            style="width: 200px;"
            @on-enter="onFiltering">
          </Input>
        </div>
      </div>
    </Card>
    <SubmissionList :filter="filterOption" @on-cell-click="onSubmissionListCellClick"/>
  </div>
</template>

<script>
import SubmissionList from '_c/SubmissionList';
import { mapGetters } from 'vuex';

export default {
  name: 'SubmissionView',
  components: { SubmissionList },
  data: function() {
    return {
      filterOption: {},
      filterForm: {}
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
      if (col.key === 'judgeResult') {
        this.$router.push({
          name,
          params: {
            submissionId: row.submissionId
          }
        });
      }
      if (col.key === 'problemCode') {
        this.$router.push({
          name,
          params: {
            problemCode: row.problemCode
          }
        })
      }
    }
  },
  computed: {
    ...mapGetters('contest', ['contestId'])
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
