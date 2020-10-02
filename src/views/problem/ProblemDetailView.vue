<template>
   <div>
      <div class="container">
      <h2 style="text-align: center;">{{ problem.problemCode }}. &nbsp; {{ problem.problemTitle }}</h2>
      <Row class="main">
        <Col span="17" class="main-lf">
        <!-- 题面描述 -->
          <Card class="box" title="Description" dis-hover :padding="0">
            <div class="problem-markdown">
              <markdown-it-vue-light :content="problemDescription.markdownDescription || ''"></markdown-it-vue-light>
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
                style="float: right; margin: 5px 0;" 
                :loading="submitBtnLoading"
                :disabled="submitColdDown"
                @click="onSubmit">提交</Button>
            </div>
          </Card>
        <!--  -->
        </Col>
        <Col span="7">
        <!-- 题目基本信息 -->
          <Card class="box" title="Details" dis-hover :padding="0">
            <CellGroup>
              <Cell title="Problem Code" :extra="problem.problemCode" />
              <Cell title="Problem ID" :extra="problem.problemId" />
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
              <Cell title="Source" :extra="problem.source" />
              <Cell title="Remote" :extra="problem.problemCode" v-if="problem.remoteOj" :to="problem.remoteUrl" />
            </CellGroup>
        </Card>
        <!--  -->
        <!-- 近期提交记录 -->
        <Card class="box" v-if="isLogin" title="Recent Submissions" :padding="0" dis-hover>
          <Table
            size="small"
            :columns="columns"
            :data="submissions"
            @on-cell-click="onTableClick"></Table>
          <Button type="text" style="width: 100%; margin: 5px auto;" @click="handleShowSubmission">Show all submissions</Button>
        </Card>
        </Col>
      </Row>
      </div>
    </div> 
</template>

<script>
import MarkdownItVueLight from 'markdown-it-vue/dist/markdown-it-vue-light.umd.min.js'
import 'markdown-it-vue/dist/markdown-it-vue-light.css'
import CodeEditor from '@/components/CodeEditor';
import JudgeResult from '@/components/JudgeResult';

import utils from '@/utils';
import api from '@/utils/api';

import { mapGetters } from 'vuex';

export default {
  components: { 
    MarkdownItVueLight,
    CodeEditor
  },
  data: function() {
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
      submissions: [],
      descriptionIndex: -1,
      code: '',
      file: null,
      language: '',
      submitBtnLoading: false,
      submitColdDown: false,
      showTags: true
    }
  },
  filters: {
    parseInt: str => parseInt(str)
  },
  methods: {
    copyToClipboard: function(content) {
      this.$copyText(content).then(e => this.$Message.success('已复制到剪切板'), e => console.log(e));
    },
    showSubmissionDetail: function(submissionId) {
      this.$router.push({
        name: 'submission-detail',
        params: { submissionId }
      });
    },
    onTableClick: function(row, col) {
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
    onChangeLanguage: function(newLanguage) {
      this.language = newLanguage;
    },
    onSubmit: function() {
      if (this.language === '') {
        this.$Message.error('Choose your language');
        return;
      }
      this.submitBtnLoading = true;
      if (this.file) {
        // 交文件
      } else {
        api.submit({
          problemCode: this.problem.problemCode,
          language: this.language,
          code: this.code
        }).then(submissionId => {
          this.submitColdDown = true;
          setTimeout(() => { this.submitColdDown = false }, 5000);
          this.$router.push({
            name: 'submission-detail',
            params: { submissionId }
          });
        }).catch(err => {
          this.$Messag.error(err);
        }).finally(() => {
          this.submitBtnLoading = false;
        })
      }
    },
    handleShowSubmission: function() {
      this.$router.push({
        name: 'submission',
        params: {
          username: this.username,
          problemCode: this.problem.problemCode
        }
      });
    }
  },
  computed: {
    ...mapGetters('user', ['username', 'isLogin']),
    utils: () => utils,
    problemDescription: function() {
      if (!this.problem.problemDescriptionDTO) {
        return {};
      }
      return this.descriptionIndex === -1 ? this.problem.problemDescriptionDTO : this.problem.problemDescriptionDTOList[this.descriptionIndex];
    }
  },
  mounted: function() {
    api.problemQuery(this.$route.params.problemCode).then(ret => {
      this.problem = ret;
      this.language = this.problem.languages[0] || '';
      api.getSubmissionList({
        pageNow: 1,
        pageSize: 5,
        username: this.username,
        problemCode: this.problem.problemCode
      }).then(ret => {
        this.submissions = ret.rows;
      }).catch(err => {
        this.$Message.error(err.message);
      });
    }).catch(err => {
      this.$Message.error(err.message);
    });
  }
}
</script>

<style lang="less" scoped>
.box {
  margin: 20px 10px; 
}

.problem-title::after {
  content: var(--problem-code);
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
  color: red;
  &:after {
    content:" ms\0A";
    white-space:pre; 
  }
}

.mem {
  color: red;
  &:after {
    content:" KB\0A";
    white-space:pre; 
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

.judge-result {
  height: 30px;
}
th, td {
  border-bottom: 1px solid #d4d4d5;
}
</style>