<!--
   Copyright 2020-2020 the original author or authors.

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
            <markdown-it-vue-light
              v-if="problemDescription.markdownDescription"
              :content="problemDescription.markdownDescription" />
            <div v-else v-html="problemDescription.htmlDescription || ''"></div>
          </div>
        </Card>
        <!--  -->
<!--        &lt;!&ndash; 样例输入输出 &ndash;&gt;-->
        <Card class="box" :title="`Case ${problemCase.id}`" dis-hover :padding="10" v-for="problemCase in problem.problemCaseDTOList" :key="problemCase.id">
            <div class="problem-example">
              <Tooltip style="display: inline-block" content="Copy" placement="right">
                <span class="clip hover" @click="copyToClipboard(problemCase.input)"> Input </span>
                <Icon type="ios-copy-outline" />
              </Tooltip>
              <markdown-it-vue-light :content="`\`\`\`text\n${problemCase.input}\n\`\`\``" />
            </div>
            <div class="problem-example">
              <Tooltip content="Copy" placement="right">
                <span class="clip hover" @click="copyToClipboard(problemCase.output)"> Output </span>
                <Icon type="ios-copy-outline" />
              </Tooltip>
              <markdown-it-vue-light :content="`\`\`\`text\n${problemCase.output}\n\`\`\``" />
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
              :judgeTemplate="judgeTemplate"
              :judgeTemplateSet="problem.judgeTemplates"
              @changeJudgeTemplate="onChangeJudgeTemplate">
            </CodeEditor>
            <Button
              style="float: right; margin: 5px 0 5px 10px;"
              :loading="submitBtnLoading"
              :disabled="submitColdDown"
              @click="onSubmit">Submit
            </Button>
            <Input
              style="float: right; width: 200px; margin: 8px 0;"
              placeholder="Contest Password"
              v-if="contestId && !hasParticipatedIn"
              size="small"
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
              v-for="pb in contest.problems"
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
                  params: { ...$route.pararms },
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
              :data="contest.problems"
              @on-cell-click="onProblemTableClick"></Table>
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
import MarkdownItVueLight from 'markdown-it-vue/dist/markdown-it-vue-light.umd.min.js'
import 'markdown-it-vue/dist/markdown-it-vue-light.css'
import ProblemCode from '_c/ProblemCode';
import CodeEditor from '_c/CodeEditor';
import JudgeResult from '_c/JudgeResult';
import moment from 'moment';

import api from '_u/api';
import { contestProblemId } from '_u/transform';

import { mapGetters, mapState } from 'vuex';

export default {
  components: {
    MarkdownItVueLight,
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
          render: (h, params) => h('strong', contestProblemId(params.row.problemCode))
        },
        {
          key: 'problemTitle',
          minWidth: 80,
          render: (h, params) => h('span', { class: 'hover' }, params.row.problemTitle)
        },
        {
          render: (h, params) => {
            if (params.row.submitNum > 0) {
              return h('span', `${params.row.acceptNum}/${params.row.submitNum}`);
            } else {
              return '';
            }
          }
        },
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
      submitColdDown: false,
      showTags: true,
      showContestProblems: false,
      problemLoaded: false
    }
  },
  filters: {
    parseInt: str => parseInt(str),
    contestProblemId: problemCode => contestProblemId(problemCode)
  },
  methods: {
    copyToClipboard: function (content) {
      this.$copyText(content).then(_ => this.$Message.success('已复制到剪切板'));
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
    onChangeJudgeTemplate: function (newJudgeTemplate) {
      this.judgeTemplate = newJudgeTemplate;
    },
    switchContestProblem: function(problemCode) {
      this.$router.push({
        name: 'contest-problem',
        params: {
          problemCode
        }
      });
    },
    onSubmit: async function () {
      if (this.judgeTemplate === '') {
        this.$Message.error('Choose one judge template');
        return;
      }
      if (this.file) {
        // 交文件
      } else {
        const dataForm = {
          problemCode: this.problem.problemCode,
          judgeTemplateId: this.judgeTemplate.id,
          code: this.code
        };
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
          } catch (_) {
            return;
          }
        }
        this.submitBtnLoading = true;
        api.submit(dataForm).then(submissionId => {
          this.submitColdDown = true;
          setTimeout(() => {
            this.submitColdDown = false
          }, 5000);
          this.$router.push({
            name: this.contestId ? 'contest-submission-detail' : 'submission-detail',
            params: { submissionId }
          });
          this.reload();
        }).finally(() => {
          this.submitBtnLoading = false;
        })
      }
    },
    showAllSubmission: function () {
      this.$router.push({
        name: this.contestId ? 'contest-submission' : 'submission',
        params: {
          username: this.username,
          problemCode: this.problem.problemCode
        }
      });
    },
    getProblem: function(params) {
      api.problemQuery({
        ...this.$route.params,
        ...this.$route.query,
        ...params
      }).then(ret => {
        ret.problemCaseDTOList.forEach((problemCase, index) => (problemCase.id = index + 1));
        this.problem = ret;
        if (ret.judgeTemplates.length > 0) {
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
          this.problemLoaded = true;
        });
      });
    }
  },
  computed: {
    ...mapGetters('user', ['username', 'isLogin']),
    ...mapGetters('contest', ['hasParticipatedIn', 'contestId']),
    ...mapState('contest', ['contest']),
    problemDescription: function () {
      return this.problem.problemDescriptionDTO || {};
    }
  },
  watch: {
    $route: function() {
      this.getProblem();
    }
  },
  created: function () {
    this.getProblem();
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
      font-size: 100%;
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
      content: " KB\0A";
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
</style>
