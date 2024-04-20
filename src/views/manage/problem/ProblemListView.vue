<!--
   Copyright 2020-2022 the original author or authors.

   Licensed under the Affero General Public License, Version 3.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

        https://www.gnu.org/licenses/agpl-3.0.en.html
 -->

<template>
  <div>
    <Card dis-hover>
      <p slot="title">Problem</p>
      <Table
        :loading="tableLoading"
        :columns="problemColumns"
        :data="problems"
        no-data-text=""
        class="content-table"
        @on-sort-change="onSort">
        <template slot-scope="{ row }" slot="code">
          <Tooltip v-if="row.problemCode.length > 20" max-width="180">
            <span slot="content" style="white-space: normal; word-break: break-all">
              <ProblemCode :problemCode="row.problemCode" />
            </span>
            <span>{{ row.problemCode.substring(0, 20) + '...' }}</span>
          </Tooltip>
          <ProblemCode v-else :problemCode="row.problemCode" />
        </template>
        <template slot-scope="{ row }" slot="title">
          <span>{{ row.problemTitle }}</span>
          <Tag v-if="row.isPublic === 0" style="margin-left: 5px" color="volcano">Private</Tag>
        </template>
        <template slot-scope="{ row }" slot="ratio">
          <span>{{ `${row.acceptNum} / ${row.submitNum}` }}</span>
        </template>
        <template slot-scope="{ row }" slot="time">
          <span class="time">{{ row.timeLimit || 0 }}</span>
        </template>
        <template slot-scope="{ row }" slot="mem">
          <span class="mem">{{ row.memoryLimit || 0 }}</span>
        </template>
        <template slot-scope="{ row }" slot="tag">
          <div class="tags">
            <Tag v-for="item in row.tagDTOList" :key="item.id">{{ item.title }}</Tag>
          </div>
        </template>
        <template slot-scope="{ row }" slot="action">
          <span class="clickable" @click="onEditProblem(row, false)">Edit</span>
          <Divider type="vertical" />
          <span class="clickable" @click="onEditProblem(row, true)">Fork</span>
          <Divider type="vertical" />
          <span class="clickable" @click="showProblemDescriptions(row)">Description</span>
          <Divider type="vertical" />
          <span class="clickable" @click="showProblemCheckpoints(row)">Checkpoints</span>
        </template>
      </Table>
    </Card>
    <div class="footer-tools">
      <Button type="default" size="small" class="float-left footer-btn" @click="addProblem">Add</Button>
      <Button type="default" size="small" class="float-left footer-btn" @click="tagsManagement">Tags</Button>
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

    <Modal
      v-model="formModal"
      width="60%"
      :mask-closable="false"
      :loading="formModalLoading"
      @on-ok="handleUpdateProblem">
      <template slot="header">
        <div v-if="isAddProblem" class="ivu-modal-header-inner">Add Problem</div>
        <ProblemCode v-else :problemCode="problemCode"/>
      </template>
      <ProblemForm ref="ProblemForm" />
    </Modal>
<!--    题面-->
    <Modal
      v-model="descriptionModel"
      width="80%"
      footer-hide>
      <template slot="header">
        <ProblemCode :problemCode="problemCode"/>
        <span>{{ problemTitle }}</span>
      </template>
      <ProblemDescription ref="ProblemDescription" />
    </Modal>
<!--    测试数据-->
    <Modal
      v-model="checkpointModel"
      width="80%"
      ok-text="Save"
      :mask-closable="false"
      :loading="uploadModalLoading"
      @on-ok="saveCheckpoints">
      <template slot="header">
        <ProblemCode :problemCode="problemCode"/>
        <span>{{ problemTitle }}</span>
      </template>
      <ProblemCheckpoint ref="ProblemCheckpoint" />
    </Modal>
  </div>
</template>

<script>
import ProblemCode from '_c/ProblemCode';
import ProblemCheckpoint from '_c/problem/ProblemCheckpoint';
import ProblemDescription from '_c/problem/ProblemDescription';
import ProblemForm from '_c/problem/ProblemForm';

import api from '_u/api';
import { Page } from '_c/mixins';

export default {
  name: 'ProblemView',
  components: {
    ProblemCode,
    ProblemCheckpoint,
    ProblemDescription,
    ProblemForm
  },
  mixins: [Page],
  data: function() {
    return {
      problemColumns: [
        { title: 'Id', key: 'problemId', maxWidth: 80 },
        { key: 'problemCode', maxWidth: 130, slot: 'code' },
        { title: 'Title', slot: 'title' },
        { title: 'Time Limit', key: 'timeLimit', sortable: 'custom', slot: 'time' },
        { title: 'Memory Limit', key: 'memoryLimit', sortable: 'custom', slot: 'mem' },
        { title: 'AC Ratio', sortable: 'custom', slot: 'ratio' },
        { title: 'Source', key: 'source' },
        { title: 'Owner', key: 'username' },
        // { title: '\b', slot: 'tag' },
        { title: 'Actions', slot: 'action', minWidth: 150 }
      ],
      problems: [],
      problemCode: '',
      problemTitle: '',
      tableLoading: false,
      formModalLoading: true,
      uploadModalLoading: true,
      formModal: false,
      checkpointModel: false,
      descriptionModel: false,
      isAddProblem: false
    }
  },
  methods: {
    getProblemManageList: function() {
      this.tableLoading = true;
      api.getProblemManageList({
        pageNow: this.pageNow,
        pageSize: this.pageSize,
        sortBy: this.sortBy,
        ascending: this.ascending
      }).then(ret => {
        this.problems = ret.rows;
        this.total = parseInt(ret.totalPage) * this.pageSize;
      }).catch(err => {
        this.$Message.error(err.message);
      }).finally(() => {
        this.tableLoading = false;
      });
    },
    handleUpdateProblem: function() {
      this.$refs.ProblemForm.save(this.isAddProblem ? 'createProblem' : 'updateProblemInfo')
        .then(_ => {
          this.getProblemManageList();
          this.$Message.success('Success');
          this.formModal = false;
        })
        .catch(err => {
          this.$Message.error(err.message);
          this.formModalLoading = false;
          this.$nextTick(() => {
            this.formModalLoading = true;
          });
        });
    },
    addProblem: function() {
      this.problemCode = '';
      this.problemTitle = '';
      this.isAddProblem = true;
      this.$refs.ProblemForm.setProblem({
        problemCode: '',
        problemTitle: '',
        isPublic: 1,
        tagDTOList: [],
        judgeTemplateListDTOList: [],
        judgeTemplates: [],
        timeLimit: 1000,
        memoryLimit: 262144,
        outputLimit: 102400,
        source: '',
        managerGroupDTOList: [],
        managerGroups: []
      });
      this.formModal = true;
    },
    onEditProblem: function(row, isFork) {
      const removeLoading = this.$Message.loading({
        content: 'Loading',
        duration: 0
      });
      api.getProblem({ problemCode: row.problemCode }).then(ret => {
        this.problemCode = row.problemCode;
        this.problemTitle = row.problemTitle;
        this.$refs.ProblemForm.setProblem(Object.assign(ret, row));
        this.isAddProblem = isFork;
        this.formModal = true;
      }).catch(err => {
        this.$Message.error(err.message);
      }).finally(() => {
        removeLoading();
      });
    },
    showProblemDescriptions: function(problem) {
      const removeLoading = this.$Message.loading({
        content: 'Loading',
        duration: 0
      });
      this.$refs.ProblemDescription.query(problem).then(() => {
        this.problemCode = problem.problemCode;
        this.problemTitle = problem.problemTitle;
        this.descriptionModel = true;
      }).catch(err => {
        this.$Message.error(err.message);
      }).finally(() => {
        removeLoading();
      });
    },
    showProblemCheckpoints: function(problem) {
      const removeLoading = this.$Message.loading({
        content: 'Loading',
        duration: 0
      });
      this.$refs.ProblemCheckpoint.query(problem.problemCode).then(() => {
        this.problemCode = problem.problemCode;
        this.problemTitle = problem.problemTitle;
        this.checkpointModel = true;
      }).catch(err => {
        this.$Message.error(err.message);
      }).finally(() => {
        removeLoading();
      });
    },
    saveCheckpoints: function() {
      this.$refs.ProblemCheckpoint.save(() => {
        this.checkpointModel = false;
      }, () => {
        this.uploadModalLoading = false;
        this.$nextTick(() => {
          this.uploadModalLoading = true;
        });
      });
    },
    tagsManagement: function() {
    }
  },
  mounted: function() {
    this.getProblemManageList();
  },
  watch: {
    $route: function () {
      this.getProblemManageList()
    }
  }
}
</script>

<style lang="less" scoped>

</style>
