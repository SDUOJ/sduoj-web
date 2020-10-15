<!--
   Copyright 2020-2020 the original author or authors.

   Licensed under the General Public License, Version 3.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

        https://www.gnu.org/licenses/gpl-3.0.en.html
 -->

<template>
  <div class="container">
    <Row>
      <Col span="17">
        <div style="margin-right: 20px;">
          <!-- websocket -->
          <Card class="box" dis-hover :padding="0">
            <JudgeResult class="title" slot="title" :result="submission.judgeResult"/>
            <Table
              disabled-hover
              v-if="submission.checkpointResults"
              no-data-text=""
              size="small"
              :columns="columns"
              :data="submission.checkpointResults"
              class="data-table"></Table>
          </Card>
          <Card v-if="showJudgerLog" class="box" :title="compilerLogTitle" dis-hover>
            <div class="judge-log">
              {{ submission.judgeLog }}
            </div>
          </Card>
          <Card v-if="showCode" class="box" title="Your Code" icon="md-code" dis-hover :padding="5">
            <pre v-highlightjs="submission.code"><code style="font-family: Menlo, Monaco, 'Courier New', monospace;"
                                                       :class="submission.lang"/></pre>
          </Card>
        </div>
      </Col>
      <Col span="7">
        <Card title="Submission" icon="ios-options" dis-hover :padding="0">
          <CellGroup>
            <div style="margin-top: 24px;">
              <Cell title="Public" v-if="submission.username === username">
                <i-switch v-model="submission.isPublic" slot="extra" true-color="#19be6b"/>
              </Cell>
              <template v-if="contestId">
                <Cell
                  title="Problem Code"
                  :extra="submission.problemCode | contestProblemId"
                  :to="{ name: 'contest-problem', params: {
                      problemCode: submission.problemCode,
                    }}"/>
                <Cell
                  title="Contest"
                  :extra="$store.state.contest.contest.contestTitle"
                  :to="{
                        name: 'contest-overview',
                        params: { contestId }
                      }"/>
              </template>
              <template v-else>
                <Cell
                  title="Problem Code"
                  :to="{ name: 'problem-detail', params: { problemCode: submission.problemCode }}">
                  <ProblemCode slot="extra" :problemCode="submission.problemCode"/>
                </Cell>
                <Cell title="Problem ID" :extra="submission.problemId"/>
              </template>
            </div>
            <Divider size="small"/>
            <div style="margin-bottom: 24px;">
              <Cell title="Submission ID" :extra="submission.submissionId"/>

              <Cell title="Create Time">
                <Time slot="extra" :time="submission.gmtCreate | parseInt" type="datetime"/>
              </Cell>
              <Cell title="Judge Time">
                <Time slot="extra" :time="submission.gmtModified | parseInt" type="datetime"/>
              </Cell>
              <Cell title="Username" :extra="submission.username"/>
              <Cell title="Judge Result">
                <JudgeResult slot="extra" :result="submission.judgeResult"/>
              </Cell>
              <Cell v-if="submission.judgeScore" title="Score">
                <span slot="extra">{{ submission.judgeScore || 0 }}</span>
              </Cell>
              <Cell title="Language" :extra="submission.language"/>
              <Cell v-if="submission.codeLength" title="Code Length">
                <span slot="extra">{{ submission.codeLength || 0 }}</span>
              </Cell>
              <Cell v-if="submission.usedTime" title="Total Time">
                <span class="time" slot="extra">{{ submission.usedTime || 0 }}</span>
              </Cell>
              <Cell v-if="submission.usedMemory" title="Total Memory">
                <span class="mem" slot="extra">{{ submission.usedMemory || 0 }}</span>
              </Cell>
            </div>
          </CellGroup>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import ProblemCode from '_c/ProblemCode';
import JudgeResult from '_c/JudgeResult';
import { mapGetters } from 'vuex';
import { sendWebsocket, closeWebsocket } from '_u/socket';
import api from '_u/api';
import { contestProblemId } from '_u/transform';

export default {
  components: {
    JudgeResult,
    ProblemCode
  },
  inject: ['reload'],
  props: {
    submissionId: {
      type: String,
      default: ''
    }
  },
  data: function () {
    return {
      submission: {
        checkpointResults: []
      },
      columns: [
        {
          title: '#',
          key: 'id'
        },
        {
          title: '评测结果',
          key: 'judgeResult',
          minWidth: 50,
          render: (h, params) => h(JudgeResult, { props: { result: params.row.judgeResult } })
        },
        {
          title: '用时',
          key: 'usedTime'
        },
        {
          title: '内存',
          key: 'usedMemory'
        }
      ]
    }
  },
  filters: {
    parseInt: str => parseInt(str),
    contestProblemId: problemCode => contestProblemId(problemCode)
  },
  methods: {
    wsSuccess: function (data) {
      if (typeof data === 'string') {
        data = JSON.parse(data);
      }
      for (let i = 0; i < data.length; ++i) {
        const item = data[i];
        if (Array.isArray(item)) {
          this.fillCheckpointResults(item);
        } else {
          if (data[0] === -1) {
            closeWebsocket();
            this.reload();
            break;
          }
          this.fillCheckpointResults(data);
          break;
        }
      }
    },
    wsRequest: function () {
      sendWebsocket('/ws/submission', { id: this.submission.submissionId }, this.wsSuccess, _ => (closeWebsocket()));
    },
    gotoProblem: function (problemCode) {
      this.$router.push({
        name: 'problem-detail',
        params: { problemCode }
      });
    },
    fillCheckpointResults: function (oneJudge) {
      this.submission.checkpointResults.splice(oneJudge[0], 1, {
        id: parseInt(oneJudge[0]) + 1,
        judgeResult: parseInt(oneJudge[1]),
        usedTime: oneJudge[2].toString(),
        usedMemory: oneJudge[3].toString()
      })
    },
    getSubmissionDetail: function(submissionId) {
      api.getSubmissionDetail({ submissionId }).then(ret => {
        this.submission = { ...ret };
        this.submission.checkpointResults = [];
        if (ret.checkpointResults === null || ret.checkpointResults.length === 0) {
          for (let i = 0; i < this.submission.checkpointNum; ++i) {
            this.submission.checkpointResults.push({
              id: i + 1,
              judgeResult: 0,
              usedTime: 0,
              usedMemory: 0
            });
          }
          this.wsRequest();
        } else {
          for (let i = 0; i < this.submission.checkpointNum; ++i) {
            this.fillCheckpointResults([i, ...ret.checkpointResults[i]]);
          }
        }
      });
    }
  },
  computed: {
    ...mapGetters('user', ['username']),
    ...mapGetters('contest', ['contestId']),
    showCode: function () {
      return !!this.submission.code;
    },
    showJudgerLog: function () {
      return !!this.submission.judgeLog || this.submission.judgeResult === 5 || this.submission.judgeResult === 8;
    },
    compilerLogTitle: function () {
      if (this.submission.judgeResult === 5) {
        // system error
        return 'System Error'
      } else if (this.submission.judgeResult === 8) {
        // compile error
        return 'Compile Error'
      } else if (this.showJudgerLog) {
        return 'Compiler Log'
      }
      return ''
    }
  },
  created: function () {
    if (this.$route.params.submissionId) {
      this.getSubmissionDetail(this.$route.params.submissionId);
    }
  },
  beforeDestroy: function () {
    closeWebsocket();
  },
  watch: {
    submissionId: function() {
      this.getSubmissionDetail(this.submissionId);
    }
  }
}
</script>

<style lang="less" scoped>
  .btns {
    width: 100%;
  }

  .submission-box {
    margin: 5px 0 20px 0;

    .problem-box-header {
      margin-left: 8px;
    }
  }

  .time::after {
    content: " ms\0A";
    white-space: pre;
  }

  .mem::after {
    content: " KB\0A";
    white-space: pre;
  }

  .box {
    margin-bottom: 20px;
  }

  .title {
    line-height: 35px;
    font-size: 1.7rem;
  }

  .judge-log {
    white-space: pre;
    word-wrap: break-word;
    word-break: break-all;
    overflow-x: scroll;
  }
</style>
