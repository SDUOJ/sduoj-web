<!--
   Copyright 2020-2021 the original author or authors.

   Licensed under the General Public License, Version 3.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

        https://www.gnu.org/licenses/gpl-3.0.en.html
 -->

<template>
  <div class="container">
    <Row class="main" v-if="problemLoaded">
      <Col span="17" class="main-lf">
        <div class="problem-title">
          <ProblemCode v-if="!contestId" :problemCode="problem.problemCode" />
          <strong v-else>{{ problem.problemCode | contestProblemId }}</strong>
          :&nbsp;{{ problem.problemTitle }}
        </div>
        <div v-if="problemDescription">
        <!-- 题面描述 -->
        <Card class="box" title="Description" dis-hover :padding="0">
          <div class="problem-markdown">
            <Markdown :value="problemDescription.markdownDescription || problemDescription.htmlDescription || ''" />
          </div>
        </Card>
        <!--  -->
        <Card class="box" :title="`Case ${problemCase.id}`" dis-hover :padding="10" v-for="problemCase in problem.problemCaseDTOList" :key="problemCase.id">
            <div class="problem-example">
              <span class="clip"> Input </span>
              <Tooltip style="display: inline-block" content="Copy" placement="right">
                <span class="hover" @click="copyToClipboard(problemCase.input)">
                  <Icon type="ios-copy-outline" size="20" />
                </span>
              </Tooltip>
              <div v-highlight="problemCase.input">
                <pre><code class="plaintext" /></pre>
              </div>
            </div>
            <div class="problem-example">
              <span class="clip"> Output </span>
              <Tooltip style="display: inline-block" content="Copy" placement="right">
                <span class="hover" @click="copyToClipboard(problemCase.output)">
                  <Icon type="ios-copy-outline" size="20" />
                </span>
              </Tooltip>
              <div v-highlight="problemCase.output">
                <pre><code class="plaintext" /></pre>
              </div>
            </div>
        </Card>
        </div>
        <!--  -->
        <!-- 代码编辑器 -->
        <Card class="box clearfix" dis-hover :padding="0">
          <div style="padding-right: 15px;">
            <CodeEditor
              :code.sync="code"
              :file.sync="file"
              :judgeTemplate.sync="judgeTemplate"
              :judgeTemplateSet="problem.judgeTemplates">
            </CodeEditor>
            <Button
              style="float: right; margin: 5px 0 5px 10px;"
              :loading="submitBtnLoading"
              @click="onSubmit">Submit</Button>
            <Input
              size="small"
              style="float: right; width: 200px; margin: 8px 0;"
              placeholder="Contest Password"
              v-if="contestId && !hasParticipatedIn"
              v-model="contestPassword" />
          </div>
        </Card>
        <!--  -->
      </Col>
      <Col span="7">
<!--        比赛：题目导航-->
        <div class="box">
          <div class="contest__problems" v-if="contestId">
            <span
              v-for="pb in problems"
              :key="pb.problemCode"
              :class="pb.problemCode === problem.problemCode ? 'active' : ''"
              @click="switchContestProblem(pb.problemCode)">
              {{ pb.problemCode | contestProblemId }}
            </span>
          </div>
          <!-- 题目基本信息 -->
          <Card class="display__card" title="Details" dis-hover :padding="0">
            <CellGroup>
              <Cell title="Contest ID" :extra="contestId" v-if="contestId"></Cell>
              <Cell title="Problem Code">
                <ProblemCode v-if="!contestId" slot="extra" :problemCode="problem.problemCode"/>
                <span v-else slot="extra">{{ problem.problemCode | contestProblemId }}</span>
              </Cell>
              <Cell title="Problem ID" v-if="!contestId" :extra="problem.problemId"/>
              <Cell title="Time Limit">
                <span class="time" slot="extra">{{ problem.timeLimit }}</span>
              </Cell>
              <Cell title="Memory Limit">
                <span class="mem" slot="extra">{{ problem.memoryLimit }}</span>
              </Cell>
              <Cell title="Weight" v-if="problem.problemWeight">
                <span slot="extra">{{ problem.problemWeight }}</span>
              </Cell>
              <Cell title="Judge Templates">
                <div slot="label">
                  <span v-for="lang in problem.judgeTemplates" :key="lang.id" class="judgeTemplate">{{ lang.title }}</span>
                </div>
              </Cell>
              <Cell title="Source" :extra="problem.source"/>
              <Cell title="Remote" :extra="problem.problemCode" v-if="problem.remoteOj" :to="problem.remoteUrl"/>
            </CellGroup>
          </Card>
          <!--  -->
<!--          题面描述选择列表-->
          <Card class="display__card"
                title="Descriptions"
                v-if="problem.problemDescriptionListDTOList"
                dis-hover :padding="0">
            <CellGroup>
              <Cell
                v-for="pd in problem.problemDescriptionListDTOList"
                :key="pd.id"
                :title="pd.title"
                :label="pd.username"
                :extra="pd.voteNum.toString()"
                :selected="pd.id === problemDescription.id"
                :to="{
                  name: $route.name,
                  params: { ...$route.params },
                  query: { descriptionId: pd.id }
                }"/>
            </CellGroup>
          </Card>
<!--          比赛： 其他题目简要预览-->
          <Card class="dispay__card"
                title="Contest Problems"
                v-if="contestId"
                dis-hover :padding="0">
            <span class="hover" slot="extra" @click="showContestProblems = !showContestProblems">
              {{ showContestProblems ? 'HIDE' : 'SHOW' }}
            </span>
            <Table
              size="small"
              v-if="showContestProblems"
              :show-header="false"
              :columns="problemColumn"
              :data="problems"
              @on-cell-click="onProblemTableClick">
              <template slot-scope="{ row }" slot="title">
                <div class="circle" v-if="row.problemColor" :style="`background: ${row.problemColor};`" />
                <div class="nocircle" v-else />
                <router-link
                  :to="{
                    name: 'contest-problem',
                    params: { problemCode: row.problemCode }
                  }"
                  style="text-decoration: none; color: black">{{ row.problemTitle }}</router-link>
              </template>
              <template slot-scope="{ row }" slot="ratio">
                <span v-if="row.submitNum > 0">{{ `${row.acceptNum}/${row.submitNum}` }}</span>
              </template>
            </Table>
          </Card>
          <!-- 近期提交记录 -->
          <Card class="display__card"
                title="Recent Submissions"
                v-if="isLogin && submissions && submissions.length > 0"
                dis-hover :padding="0">
            <Table
              size="small"
              :columns="submissionColumn"
              :data="submissions"
              @on-cell-click="onSubmissionTableClick"></Table>
            <Button type="text" style="width: 100%; margin: 5px auto;" @click="showAllSubmission">Show all submissions</Button>
          </Card>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
import ProblemCode from '_c/problem/ProblemCode';
import CodeEditor from '_c/editor/CodeEditor';
import JudgeResult from '_c/JudgeResult';
import Markdown from '_c/editor/Markdown';
import moment from 'moment';

import api from '_u/api';
import { contestProblemIdEncode } from '_u/transform';

import { mapGetters, mapState } from 'vuex';
import store from '@/store';

function getStorage(problemCode, contestId) {
  let _key = `PROBLEM_${problemCode}`;
  if (contestId) {
    _key += `_${contestId}`;
  }
  return JSON.parse(localStorage.getItem(_key)) || null;
}

function setStorage(problemCode, contestId, value) {
  let _key = `PROBLEM_${problemCode}`;
  if (contestId) {
    _key += `_${contestId}`;
  }
  localStorage.setItem(_key, JSON.stringify(value));
}

export default {
  components: {
    Markdown,
    CodeEditor,
    ProblemCode
  },
  inject: ['reload'],
  data: function () {
    return {
      submissionColumn: [
        {
          title: 'Result',
          key: 'judgeResult',
          minWidth: 60,
          render: (h, params) => h(JudgeResult, { props: { result: params.row.judgeResult } })
        },
        {
          title: 'Submit time',
          key: 'gmtCreate',
          render: (h, params) => h('span', moment(parseInt(params.row.gmtCreate)).fromNow())
        }
      ],
      problemColumn: [
        {
          key: 'problemCode',
          maxWidth: 60,
          render: (h, params) => h('strong', contestProblemIdEncode(params.row.problemCode))
        },
        { key: 'problemTitle', minWidth: 80, slot: 'title' },
        { slot: 'ratio' },
        {
          key: 'judgeResult',
          render: (h, params) => h(JudgeResult, { props: { result: params.row.judgeResult, abbr: true } })
        }
      ],
      problem: {},
      contestPassword: '',
      submissions: null,
      code: '',
      file: null,
      judgeTemplate: {
        id: ''
      },
      submitBtnLoading: false,
      showTags: true,
      showContestProblems: false,
      problemLoaded: false
    }
  },
  filters: {
    parseInt: str => parseInt(str),
    contestProblemId: problemCode => contestProblemIdEncode(problemCode)
  },
  methods: {
    copyToClipboard: function (content) {
      this.$copyText(content).then(_ => this.$Message.success('Copy to Clipboard'));
    },
    onSubmissionTableClick: function (row, col) {
      if (col.key === 'judgeResult') {
        this.$router.push({
          name: this.contestId ? 'contest-submission-detail' : 'submission-detail',
          params: {
            submissionId: row.submissionId
          }
        });
      }
    },
    onProblemTableClick: function (row, col) {
      if (col.key === 'problemTitle') {
        this.$router.push({
          name: 'contest-problem',
          params: {
            problemCode: row.problemCode
          }
        });
      }
    },
    switchContestProblem: function(problemCode) {
      this.$router.push({
        name: 'contest-problem',
        params: { problemCode }
      });
    },
    onSubmit: async function () {
      if (this.judgeTemplate.id === '') {
        this.$Message.error('Choose one judge template');
        return;
      }

      // protected contest problem
      if (this.contestId && !this.hasParticipatedIn) {
        if (this.contestPassword === '') {
          this.$Message.error('Please input contest password');
          return;
        }
        try {
          await api.participateIn({
            contestId: this.contestId,
            password: this.contestPassword
          });
        } catch (err) {
          this.$Message.error(err.message);
          return;
        }
      }

      const submitForm = {
        problemCode: this.problem.problemCode,
        judgeTemplateId: this.judgeTemplate.id
      };

      if (this.file) {
        // 交文件
        const formdata = new FormData();
        formdata.append('file', this.file);

        const removeLoading = this.$Message.loading({
          content: 'Uploading',
          duration: 0
        });

        try {
          const ret = await api.singleUpload(formdata);
          submitForm.zipFileId = ret.id;
          removeLoading();
        } catch (err) {
          this.$Message.error(err.message);
          removeLoading();
          return;
        }
      } else {
        if (this.code.length > 60000) {
          this.$Message.error('Source code should contain 60000 bytes in UTF-8 at most');
          return;
        }
        submitForm.code = this.code || '';
      }

      this.submitBtnLoading = true;
      api.submit(submitForm).then(submissionId => {
        this.$router.push({
          name: this.contestId ? 'contest-submission-detail' : 'submission-detail',
          params: { submissionId }
        });
      }).catch(err => {
        this.$Message.error(err.message);
      }).finally(() => {
        this.submitBtnLoading = false;
      });
    },
    showAllSubmission: function () {
      this.$router.push({
        name: this.contestId ? 'contest-submission' : 'submission',
        query: {
          username: this.username,
          problemCode: this.problem.problemCode
        }
      });
    },
    getProblem: function(params) {
      params = params || {};
      Object.assign(params, params, this.$route.params, this.$route.query);
      delete params._t;
      api.problemQuery(params).then(ret => {
        ret.problemCaseDTOList.forEach((problemCase, index) => (problemCase.id = index + 1));
        this.problem = ret;
        if (this.code === '' && ret.judgeTemplates.length > 0) {
          this.judgeTemplate = ret.judgeTemplates[0];
        }
        // 查最多5个提交记录
        api.getSubmissionList({
          pageNow: 1,
          pageSize: 5,
          username: this.username,
          problemCode: this.problem.problemCode
        }).then(ret => {
          this.submissions = ret.rows;
        });
        this.problemLoaded = true;
      }).finally(() => this.$Spin.hide());
    }
  },
  computed: {
    ...mapGetters('user', ['username', 'isLogin']),
    ...mapGetters('contest', ['hasParticipatedIn', 'contestId', 'problems']),
    ...mapState('contest', ['contest']),
    problemDescription: function () {
      return this.problem.problemDescriptionDTO || {};
    }
  },
  watch: {
    $route: function(to, from) {
      setStorage(from.params.problemCode, this.contestId, {
        code: this.code,
        judgeTemplate: this.judgeTemplate
      });
      const value = getStorage(to.params.problemCode, this.contestId);
      this.code = '';
      this.judgeTemplate = {};
      if (value) {
        this.code = value.code;
        this.judgeTemplate = value.judgeTemplate;
      }
      this.getProblem();
    }
  },
  created: function () {
    this.$Spin.show();
    this.getProblem();
  },
  beforeRouteLeave: function(to, from, next) {
    setStorage(this.$route.params.problemCode, this.contestId, {
      code: this.code,
      judgeTemplate: this.judgeTemplate
    });
    next();
  },
  beforeRouteEnter: function(to, from, next) {
    const value = getStorage(to.params.problemCode, store.getters['contest/contestId']);
    if (value) {
      next(vm => {
        vm.code = value.code;
        vm.judgeTemplate = value.judgeTemplate;
      });
    } else {
      next();
    }
  }
}
</script>

<style lang="less" scoped>
  @sdu-red                : #9e0a11;
  .box {
    margin: 20px 10px;
  }

  .problem-title {
    font-size: 20px;
    text-align: center;
  }

  .problem-markdown {
    padding: 12px 15px;
  }

  .problem-example {
    padding: 12px 0;

    .clip{
      font-size: 120%;
      font-weight: bold;
    }
  }

  .time {
    color: @sdu-red;

    &:after {
      content: " ms\0A";
      white-space: pre;
    }
  }

  .mem {
    color: @sdu-red;

    &:after {
      content: " KiB\0A";
      white-space: pre;
    }
  }

  .judgeTemplate::after {
    content: ", ";
  }

  .judgeTemplate:last-child {
    &:after {
      content: "";
    }
  }

  .display__card {
    margin: 20px 0;
  }

  .contest__problems {
    margin-bottom: 5px;
    span {
      border-radius: 5px;
      display: inline-block;
      text-align: center;
      width: 30px;
      margin: 0 4px;
      font-size: 16px;
    }
    span:hover {
      cursor: pointer;
      color: @sdu-red;
      background-color: rgba(0, 0, 0, .15);
    }
    .active {
      font-weight: bold;
      color: @sdu-red;
      background-color: rgba(0, 0, 0, .15);
    }
  }

  .block__normal {

  }
  .block__ac {
    display: block;
    border-left: 6px solid rgba(92, 184, 92, .15) !important;
  }
  .block__wa {
    display: block;
    border-left: 6px solid rgba(217, 83, 79, .15) !important;
  }
  .block__ce {
    display: block;
    border-left: 6px solid rgba(255, 165, 0, .15) !important;
  }

  .nocircle {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    display: inline-block;
    margin-right: 5px;
    vertical-align: middle;
  }
  .circle {
    margin-right: 5px;
  }
</style>
