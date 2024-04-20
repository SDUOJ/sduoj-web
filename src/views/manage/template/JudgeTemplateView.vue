<!--
   Copyright 2020-2022 the original author or authors.

   Licensed under the Affero General Public License, Version 3.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

        https://www.gnu.org/licenses/agpl-3.0.en.html
 -->

<template>
  <div>
    <Card title="Judge Template" dis-hover>
      <Input slot="extra"
             search
             enter-button
             style="width: 280px"
             @on-search="searchJudgeTemplate"/>
      <JudgeTemplateTable ref="JudgeTemplateTable" />
    </Card>
    <div class="footer-tools">
      <Button type="default" size="small" class="float-left footer-btn" @click="createJudgeTemplate">Add</Button>
      <Page
        class="float-right"
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
import api from '_u/api';
import JudgeTemplateTable from '_c/tables/JudgeTemplateTable';

import { Page } from '_c/mixins';
import { JUDGE_TEMPLATE_TYPE } from '_u/constants';

export default {
  components: {
    JudgeTemplateTable
  },
  mixins: [Page],
  methods: {
    getTemplateList: function() {
      this.tableLoading = true;
      api.pageTemplateList({
        pageNow: this.pageNow,
        pageSize: this.pageSize,
        title: this.searchTitle
      }).then(ret => {
        this.$refs.JudgeTemplateTable.setJudgeTemplates(ret.rows);
        this.total = parseInt(ret.totalPage) * this.pageSize;
      }).catch(err => {
        this.$Message.error(err.message);
      }).finally(() => {
        this.tableLoading = false;
      });
    },
    createJudgeTemplate: function () {
      this.$refs.JudgeTemplateTable.createJudgeTemplate(JUDGE_TEMPLATE_TYPE.IO);
    },
    searchJudgeTemplate: function (searchTitle) {
      this.searchTitle = searchTitle;
    }
  },
  mounted: function () {
    this.$refs.JudgeTemplateTable.setColumns(['#', 'Type', 'Owner', 'Title', 'Comment', 'Remote OJ', 'Create', 'Update', 'Actions']);
    this.$refs.JudgeTemplateTable.on('after-update', this.getTemplateList);
    this.getTemplateList();
  },
  computed: {
    searchTitle: {
      get: function() {
        return this.$route.query.searchTitle || '';
      },
      set: function(searchTitle) {
        this.$router.push({ query: { ...this.$route.query, searchTitle } });
      }
    }
  },
  watch: {
    $route: function() {
      this.getTemplateList();
    }
  }
}
</script>
