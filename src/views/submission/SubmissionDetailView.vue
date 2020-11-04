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
            <JudgeResult class="title" slot="title" v-bind:result="submission.judgeResult"/>
            <Table
              v-if="showCheckpointResults"
              disabled-hover
              no-data-text=""
              size="small"
              :columns="columns"
              :data="submission.checkpointResults"
              class="data-table">
              <template slot-scope="{ row }" slot="judge-result">
                <JudgeResult :result="row.judgeResult" />
              </template>
              <template slot-scope="{ row }" slot="time">
                <span class="time">{{ row.usedTime }}</span>
              </template>
              <template slot-scope="{ row }" slot="mem">
                <span class="mem">{{ row.usedMemory }}</span>
              </template>
            </Table>
          </Card>
          <Card v-if="showJudgerLog" class="box" :title="compilerLogTitle" dis-hover>
            <div class="judge-log">
              {{ submission.judgeLog }}
            </div>
          </Card>
          <Card v-if="showCode" class="box" title="Your Code" icon="md-code" dis-hover :padding="10">
            <p slot="title">
              <span>Your Code</span>
              <Tooltip content="copy" placement="left" style="float: right">
                <Icon class="hover" type="md-copy" @click="copyToClipboard(submission.code)" />
              </Tooltip>
            </p>
            <pre v-highlightjs="submission.code"><code style="font-family: Menlo, Monaco, 'Courier New', monospace;" /></pre>
          </Card>
        </div>
      </Col>
      <Col span="7">
        <Card title="Submission" icon="ios-options" dis-hover :padding="0">
          <CellGroup @on-click="onCellClick">
            <div style="margin-top: 24px;">
              <Cell title="Public" v-if="submission.username === username">
                <i-switch v-model="submission.isPublic" slot="extra" true-color="#19be6b"/>
              </Cell>
              <Divider size="small"/>
              <template v-if="contestId">
                <template v-if="canDoRejudge">
                  <Cell name="rejudge">
                    <strong>Rejudge</strong>
                    <Icon slot="icon" type="md-refresh" color="#2d8cf0" />
                  </Cell>
                  <Cell name="invalidate">
                    <strong>Invalidate</strong>
                    <Icon slot="icon" type="md-close-circle" color="#d9534f" />
                  </Cell>
                </template>
                <Cell
                  title="Contest"
                  :extra="$store.state.contest.contest.contestTitle"
                  :to="{
                        name: 'contest-overview',
                        params: { contestId }
                      }"/>
                <Cell
                  title="Problem Code"
                  :extra="submission.problemCode | contestProblemId"
                  :to="{ name: 'contest-problem', params: {
                      problemCode: submission.problemCode,
                    }}"/>
              </template>
              <template v-else>
                <Cell
                  title="Problem Code"
                  :to="{ name: 'problem-detail', params: { problemCode: submission.problemCode }}">
                  <ProblemCode slot="extra" :problemCode="submission.problemCode"/>
                </Cell>
              </template>
              <Cell title="Problem Title" :extra="submission.problemTitle"/>
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
<!-- 这里待定，等待后端同步 -->
              <Cell title="Judge Template" :extra="submission.judgeTemplateTitle"/>
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
import { mapGetters, mapState } from 'vuex';
import api from '_u/api';
import { sendWebsocket, closeWebsocket } from '_u/socket';
import { contestProblemId } from '_u/transform';
import { JUDGE_STATUS, JUDGE_RESULT } from '_u/constants';

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
        { title: '#', key: 'id' },
        { title: 'Result', minWidth: 50, slot: 'judge-result' },
        { title: 'Score', key: 'judgeScore' },
        { title: 'Time', slot: 'time' },
        { title: 'Memory', slot: 'mem' }
      ]
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
    wsSuccess: function (data) {
      if (typeof data === 'string') {
        data = JSON.parse(data);
      }
      for (let i = 0; i < data.length; ++i) {
        // data[i]不是数组的话就是单独的一个数：表示评测状态 -3 compiling -2 judging
        // 如果data[i]是数组但是只有一个元素也是表示评测状态，此时 fileCheckpointResults 会返回false
        if ((Array.isArray(data[i]) && !this.fillCheckpointResults(data[i]))) {
          switch (data[i][0]) {
            case JUDGE_STATUS.COMPILING:
              this.$set(this.submission, 'judgeResult', JUDGE_RESULT.CP);
              break;
            case JUDGE_STATUS.JUDGING:
              this.submission.checkpointResults.forEach(o => {
                this.$set(o, 'judgeResult', JUDGE_RESULT.JG);
              });
              this.$set(this.submission, 'judgeResult', JUDGE_RESULT.JG);
              break;
            case JUDGE_STATUS.END:
              closeWebsocket();
              this.reload();
              break;
          }
        } else if (!Array.isArray(data[i]) && !this.fillCheckpointResults(data)) {
          switch (data[0]) {
            case JUDGE_STATUS.COMPILING:
              this.$set(this.submission, 'judgeResult', JUDGE_RESULT.CP);
              break;
            case JUDGE_STATUS.JUDGING:
              this.submission.checkpointResults.forEach(o => {
                this.$set(o, 'judgeResult', JUDGE_RESULT.JG);
              });
              this.$set(this.submission, 'judgeResult', JUDGE_RESULT.JG);
              break;
            case JUDGE_STATUS.END:
              closeWebsocket();
              this.reload();
              break;
          }
          break;
        }
      }
    },
    wsRequest: function () {
      sendWebsocket('/submission', { id: this.submission.submissionId },
        this.wsSuccess,
        err => {
          this.$Message.error(err);
        });
    },
    gotoProblem: function (problemCode) {
      this.$router.push({
        name: 'problem-detail',
        params: { problemCode }
      });
    },
    fillCheckpointResults: function (oneJudge) {
      if (oneJudge.length === 5) {
        this.submission.checkpointResults.splice(oneJudge[0], 1, {
          id: parseInt(oneJudge[0]) + 1,
          judgeResult: parseInt(oneJudge[1]),
          judgeScore: parseInt(oneJudge[2]),
          usedTime: oneJudge[3].toString(),
          usedMemory: oneJudge[4].toString()
        });
        return true;
      }
      return false;
    },
    getSubmissionDetail: function(submissionId) {
      api.getSubmissionDetail({ submissionId }).then(ret => {
        this.submission = { ...ret };
        this.submission.checkpointResults = [];
        if (ret.judgeResult <= 0) {
          for (let i = 0; i < ret.checkpointNum; ++i) {
            this.submission.checkpointResults.push({
              id: i + 1,
              judgeResult: 0,
              judgeScore: 0,
              usedTime: 0,
              usedMemory: 0
            });
          }
          this.wsRequest();
        } else {
          ret.checkpointResults.forEach((o, i) => {
            this.fillCheckpointResults([i, ...o])
          });
        }
      });
    },
    onCellClick: function(name) {
      if (name === 'rejudge') {
        // doRejudge
        api.rejudge({
          contestId: this.contestId,
          submissionIds: [this.submission.submissionId]
        });
      } else if (name === 'invalidate') {
        // invalidate the grade
        api.invalidate(this.submission.submissionId);
      }
    }
  },
  computed: {
    ...mapGetters('user', ['username', 'isAdmin']),
    ...mapGetters('contest', ['contestId']),
    ...mapState('contest', ['contest']),
    showCode: function () {
      return !!this.submission.code;
    },
    showJudgerLog: function () {
      return !!this.submission.judgeLog;
    },
    showCheckpointResults: function() {
      if (!this.submission.judgeResult || this.submission.checkpointResults.length === 0) {
        return false;
      }
      if (this.submission.judgeResult > 0) {
        return !(this.submission.judgeResult === JUDGE_RESULT.CE || this.submissionId.judgeResult === JUDGE_RESULT.SE);
      }
      return this.submission.judgeResult === JUDGE_RESULT.JG;
    },
    compilerLogTitle: function () {
      if (this.submission.judgeResult === JUDGE_RESULT.SE) {
        // system error
        return 'System Error'
      } else if (this.submission.judgeResult === JUDGE_RESULT.CE) {
        // compile error
        return 'Compile Error'
      } else if (this.showJudgerLog) {
        return 'Compiler Log'
      }
      return ''
    },
    canDoRejudge: function() {
      return !!(this.contestId && (this.isAdmin || this.username === this.contest.username));
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
