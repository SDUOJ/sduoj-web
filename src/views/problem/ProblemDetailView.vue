<template>
  <div class="container">
    <Row class="main">
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
        <!-- 样例输入输出 -->
        <!-- <Card class="box" v-for="ex in problemDescription.examples" :key="ex.id">
          <div slot="header" class="box-header">
            Example {{ ex.id }}
          </div>
            <div class="problem-example">
              <Tooltip content="Copy" placement="right">
                <h3 class="clip" @click="copyToClipboard(ex.input)"> Input </h3>
              </Tooltip>
              <markdown-it-vue-light :content="'```text\n' + ex.input + '\n```'"></markdown-it-vue-light>
            </div>
            <div class="problem-example">
              <Tooltip content="Copy" placement="right">
                <h3 class="clip" @click="copyToClipboard(ex.output)"> Output </h3>
              </Tooltip>
              <markdown-it-vue-light :content="'```text\n' + ex.output + '\n```'"></markdown-it-vue-light>
            </div>
        </Card> -->
        </div>
        <!--  -->
        <!-- 代码编辑器 -->
        <Card class="box clearfix" dis-hover :padding="0">
          <div style="padding-right: 15px;">
            <CodeEditor
              :code.sync="code"
              :file.sync="file"
              :language="language"
              :languageSet="problem.languages"
              @changeLanguage="onChangeLanguage">
            </CodeEditor>
            <Button
              style="float: right; margin: 5px 0 5px 10px;"
              :loading="submitBtnLoading"
              :disabled="submitColdDown"
              @click="onSubmit">提交
            </Button>
            <Input
              style="float: right; width: 200px; margin: 8px 0;"
              placeholder="Contest Password"
              v-if="contestId && $store.getters['contest/needPassword']"
              size="small"
              v-model="contestPassword" />
          </div>
        </Card>
        <!--  -->
      </Col>
      <Col span="7">
<!--        比赛的题目导航-->
        <div class="box">
          <div class="contest__problems" v-if="contestId">
            <span
              v-for="pb in $store.state.contest.contest.problems"
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
              <Cell title="Languages">
                <div slot="label">
                  <span v-for="lang in problem.languages" :key="lang" class="language">{{ lang }}</span>
                </div>
              </Cell>
              <Cell title="Source" :extra="problem.source"/>
              <Cell title="Remote" :extra="problem.problemCode" v-if="problem.remoteOj" :to="problem.remoteUrl"/>
            </CellGroup>
          </Card>
          <!--  -->
          <Card class="display__card"
                title="Descriptions"
                v-if="problem.problemDescriptionListDTOList"
                dis-hover :padding="0">
            <CellGroup>
              <Cell
                v-for="pd in problem.problemDescriptionListDTOList"
                :key="pd.id"
                :title="pd.username"
                :extra="pd.voteNum.toString()"
                :selected="pd.id === problemDescription.id"
                :to="{
                  name: $route.name,
                  params: { ...$route.pararms },
                  query: { descriptionId: pd.id }
                }"/>
            </CellGroup>
          </Card>
          <!-- 近期提交记录 -->
          <Card class="display__card"
                title="Recent Submissions"
                v-if="isLogin && submissions"
                dis-hover :padding="0">
            <Table
              size="small"
              :columns="columns"
              :data="submissions"
              @on-cell-click="onTableClick"></Table>
            <Button type="text" style="width: 100%; margin: 5px auto;" @click="handleShowSubmission">Show all
              submissions
            </Button>
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

import api from '_u/api';
import utils from '_u';

import { mapGetters } from 'vuex';

export default {
  components: {
    MarkdownItVueLight,
    CodeEditor,
    ProblemCode
  },
  inject: ['reload'],
  data: function () {
    return {
      columns: [
        {
          title: 'Result',
          key: 'judgeResult',
          render: (h, params) => h(JudgeResult, { props: { result: params.row.judgeResult } })
        },
        {
          title: 'Submit time',
          key: 'gmtCreate',
          render: (h, params) => h('Time', { props: { time: parseInt(params.row.gmtCreate) } })
        }
      ],
      problem: {},
      contestPassword: '',
      submissions: null,
      code: '',
      file: null,
      language: '',
      submitBtnLoading: false,
      submitColdDown: false,
      showTags: true
    }
  },
  filters: {
    parseInt: str => parseInt(str),
    contestProblemId: problemCode => utils.contestProblemId(problemCode)
  },
  methods: {
    copyToClipboard: function (content) {
      this.$copyText(content).then(e => this.$Message.success('已复制到剪切板'), e => console.log(e));
    },
    showSubmissionDetail: function (submissionId) {
      this.$router.push({
        name: 'submission-detail',
        params: { submissionId }
      });
    },
    onTableClick: function (row, col) {
      if (col.key === 'judgeResult') {
        this.$router.push({
          name: 'submission',
          params: {
            username: this.username,
            problemCode: row.problemCode
          }
        });
      }
    },
    onChangeLanguage: function (newLanguage) {
      this.language = newLanguage;
    },
    switchContestProblem: function(problemCode) {
      this.$router.push({
        name: 'contest-problem',
        params: {
          contestId: this.contestId,
          problemCode
        }
      });
    },
    onSubmit: async function () {
      if (this.language === '') {
        this.$Message.error('Choose your language');
        return;
      }
      if (this.file) {
        // 交文件
      } else {
        const dataForm = {
          problemCode: this.problem.problemCode,
          language: this.language,
          code: this.code
        };
        if (this.contestId) {
          dataForm.contestId = this.contestId;
          if (this.$store.getters['contest/needPassword']) {
            try {
              await api.participateIn({
                contestId: this.contestId,
                password: this.contestPassword
              });
            } catch (_) {}
          }
        }
        this.submitBtnLoading = true;
        api.submit(dataForm).then(submissionId => {
          this.submitColdDown = true;
          setTimeout(() => {
            this.submitColdDown = false
          }, 5000);
          this.$router.push({
            name: 'submission-detail',
            params: {
              submissionId,
              contestId: this.contestId
            }
          });
          this.reload();
        }).finally(() => {
          this.submitBtnLoading = false;
        })
      }
    },
    handleShowSubmission: function () {
      this.$router.push({
        name: 'submission',
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
        this.problem = ret;
        this.language = this.problem.languages[0] || '';
        // 查最多5个提交记录
        // api.getSubmissionList({
        //   pageNow: 1,
        //   pageSize: 5,
        //   username: this.username,
        //   problemCode: this.problem.problemCode
        // }).then(ret => {
        //   this.submissions = ret.rows;
        // });
      });
    }
  },
  computed: {
    ...mapGetters('user', ['username', 'isLogin']),
    problemDescription: function () {
      return this.problem.problemDescriptionDTO;
    },
    contestId: function() {
      return this.$route.params.contestId;
    }
  },
  watch: {
    $route: function(to, from) {
      this.getProblem();
    }
  },
  mounted: function () {
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

    .clip:hover {
      cursor: pointer;
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

  .language::after {
    content: ", ";
  }

  .language:last-child {
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
</style>
