<!--
   Copyright 2020-2021 the original author or authors.

   Licensed under the General Public License, Version 3.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

        https://www.gnu.org/licenses/gpl-3.0.en.html
 -->

<template>
  <div>
    <ContestList ref="contestList"/>
    <div class="float-left footer-tools">
      <Select size="small" v-model="selectContestMode" style="width: 100px" transfer>
        <Option value="all" label="All" />
        <Option v-for="mode in CONTEST_MODE" :key="mode" :value="mode" :label="mode.toUpperCase()" />
      </Select>
    </div>
    <div class="float-right footer-pages">
      <Page
        size="small" show-elevator show-sizer
        :total="total"
        :current.sync="pageNow"
        :page-size="pageSize"
        :page-size-opts="pageSizeOpts"
        @on-change="onPageChange"
        @on-page-size-change="onPageSizeChange"/>
    </div>
  </div>
</template>

<script>
import ContestList from '_c/contest/ContestList';
import { CONTEST_MODE } from '_u/constants';

export default {
  name: 'ContestInGroup',
  components: { ContestList },
  data: function () {
    return {
      pageNow: 1,
      pageSize: 15,
      pageSizeOpts: [15, 30, 50, 100],
      total: 0,
      selectContestMode: 'all'
    }
  },
  methods: {
    onPageChange: function (pageNow) {
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
    getContestList: function (groupId) {
      this.$refs.contestList.getContestList({
        groupId,
        pageNow: this.pageNow,
        pageSize: this.pageSize,
        mode: this.selectContestMode === 'all' ? '' : this.selectContestMode
      }).then(ret => {
        this.total = parseInt(ret.totalPage) * this.pageSize;
      }).catch(err => {
        this.$Message.error(err.message);
      });

      this.$refs.contestList.getParticipatedContests().catch(err => {
        this.$Message.error(err.message);
      });
    }
  },
  watch: {
    pageSize: function () {
      this.getContestList();
    },
    pageNow: function () {
      this.getContestList();
    },
    sort: function () {
      this.getContestList();
    },
    ascending: function () {
      this.getContestList();
    },
    selectContestMode: function () {
      this.getContestList();
    }
  },
  computed: {
    CONTEST_MODE: () => CONTEST_MODE
  }
}
</script>

<style scoped>

</style>
