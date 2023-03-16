<!--
   Copyright 2020-2022 the original author or authors.

   Licensed under the Affero General Public License, Version 3.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

        https://www.gnu.org/licenses/agpl-3.0.en.html
 -->

<template>
  <div class="container">
    <Spin size="large" fix v-if="spinShow" />
    <Row>
      <Col span="17">
        <div style="margin-right: 20px;">
          <!-- websocket -->
          <Card class="box" dis-hover :padding="0">
            <JudgeResult class="title" slot="title" :result="submission.judgeResult" :total="submission.checkpointNum" :current="judgedCheckpointNum"/>
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
          <Card v-if="showJudgeLog" class="box" title="Judge Log" dis-hover>
            <div class="judge-log">{{ submission.judgeLog }}</div>
          </Card>
          <Card v-if="showCode" class="box" title="Your Code" icon="md-code" dis-hover :padding="0">
            <p slot="title">
              <span>Your Code</span>
              <Tooltip v-if="submission.code" content="copy" placement="right">
                <Icon class="hover" type="md-copy" @click="copyToClipboard(submission.code)" />
              </Tooltip>
            </p>
            <p v-if="submission.code" slot="extra" style="color: #bbb">{{ submission.codeLength }} B</p>
            <Button v-else-if="submission.zipFileId"
                    slot="extra"
                    type="info"
                    size="small"
                    target="_blank"
                    :to="downloadUrl">Download</Button>
            <div v-if="submission.code" v-highlight-linenumber="submission.code">
              <pre><code /></pre>
            </div>
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
              <Cell v-if="canDoRejudge" name="rejudge" :disabled="submission.judgeResult < 0">
                <strong>Rejudge</strong>
                <Icon slot="icon" type="md-refresh" color="#2d8cf0" />
              </Cell>
              <Cell v-if="canDoInvalidate" name="invalidate" :disabled="submission.judgeResult < 0">
                <strong>Invalidate</strong>
                <Icon slot="icon" type="md-close-circle" color="#d9534f" />
              </Cell>
              <Divider size="small"/>
              <template v-if="contestId">
                <Cell
                  ref="contest_cell"
                  title="Contest"
                  :to="{
                        name: 'contest-overview',
                        params: { contestId }
                      }">
                  <span slot="extra" class="ellipsis" :style="`width: ${getEllipsisWidth('contest_cell')}px`">
                   {{ $store.state.contest.contest.contestTitle }}
                  </span>
                </Cell>
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
              <Cell ref="problem_title_cell" title="Problem Title">
                <span slot="extra" class="ellipsis" :style="`width: ${getEllipsisWidth('problem_title_cell')}px`">
                  {{ submission.problemTitle }}
                </span>
              </Cell>
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
              <Cell title="Judge Template" :extra="submission.judgeTemplateTitle"/>
              <Cell title="Total Time">
                <span class="time" slot="extra">{{ submission.usedTime || 0 }}</span>
              </Cell>
              <Cell title="Total Memory">
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
import ProblemCode from '_c/problem/ProblemCode';
import JudgeResult from '_c/JudgeResult';
import { Websocket } from '_c/mixins';

import { mapGetters, mapState } from 'vuex';

import api from '_u/api';
import { contestProblemIdEncode } from '_u/transform';
import { JUDGE_RESULT_TYPE, CONTEST_STATUS } from '_u/constants';

export default {
  components: {
    JudgeResult,
    ProblemCode
  },
  mixins: [Websocket],
  inject: ['reload'],
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
      ],
      spinShow: false
    }
  },
  filters: {
    parseInt: str => parseInt(str),
    contestProblemId: problemCode => contestProblemIdEncode(problemCode)
  },
  methods: {
    // 获得元素宽度并且计算文本最大显示宽度
    getEllipsisWidth: function(ref) {
      const cell = this.$refs[ref];
      return cell ? cell.$el.clientWidth - 107 : 200;
    },
    copyToClipboard: function (content) {
      this.$copyText(content).then(_ => this.$Message.success('已复制到剪切板'));
    },
    gotoProblem: function (problemCode) {
      this.$router.push({
        name: 'problem-detail',
        params: { problemCode }
      });
    },
    wsSuccess: function (data) {
      if (typeof data === 'string') {
        data = JSON.parse(data);
      }
      for (let i = 0; i < data.length; ++i) {
        if (Array.isArray(data[i])) {
          this.fillCheckpointResults(data[i]);
        } else {
          this.fillCheckpointResults(data);
          break;
        }
      }
    },
    fillCheckpointResults: function (oneJudge) {
      // oneJudge 格式为:
      // [submissionIdHex, submissionVersion,
      // checkpointType, checkpointIndex, checkpointId,
      // judgeResult, judgeScore, usedTime, usedMemory]

      // const submissionIdHex = oneJudge[0]
      // const submissionVersion = oneJudge[1]
      // const checkpointType = oneJudge[2]
      const checkpointIndex = oneJudge[3]
      // const checkpointId = oneJudge[4]
      const judgeResult = oneJudge[5]
      const judgeScore = oneJudge[6]
      const usedTime = oneJudge[7]
      const usedMemory = oneJudge[8]

      if (checkpointIndex < 0) {
        switch (checkpointIndex) {
          case JUDGE_RESULT_TYPE.CP:
            this.$set(this.submission, 'judgeResult', JUDGE_RESULT_TYPE.CP);
            break;
          case JUDGE_RESULT_TYPE.JG:
            this.submission.checkpointResults.forEach(o => {
              this.$set(o, 'judgeResult', JUDGE_RESULT_TYPE.JG);
            });
            this.$set(this.submission, 'judgeResult', JUDGE_RESULT_TYPE.JG);
            break;
          case JUDGE_RESULT_TYPE.END:
            this.websock.close();
            this.submission = {
              ...this.submission,
              judgeResult: judgeResult,
              judgeScore: judgeScore,
              usedTime: usedTime.toString(),
              usedMemory: usedMemory.toString()
            };
            this.getSubmissionDetail(this.submission.submissionId);
            break;
        }
      } else {
        this.submission.checkpointResults.splice(checkpointIndex, 1, {
          id: checkpointIndex + 1,
          judgeResult: judgeResult,
          judgeScore: judgeScore,
          usedTime: usedTime.toString(),
          usedMemory: usedMemory.toString()
        });
      }
    },
    getSubmissionDetail: function(submissionId) {
      api.getSubmissionDetail({ submissionId }).then(ret => {
        this.submission = { ...ret };
        // 数据脱敏后 ret.checkpointResults === null
        if (this.submission.checkpointResults) {
          this.submission.checkpointResults.forEach((o, i) => {
            this.fillCheckpointResults([ret.submissionId, 0, 0, i, ...o]);
          });
        }

        if (!this.showCode) {
          return;
        }

        if (this.contestId) {
          const infoOpenness = this.contest.features[this.contestStatus === CONTEST_STATUS.RUNNING ? 'contestRunning' : 'contestEnd'];
          const displayCheckpointResult = infoOpenness.displayCheckpointResult;
          if (!displayCheckpointResult) {
            return;
          }
        }

        if (ret.judgeResult <= 0) {
          for (let i = 0; i < ret.checkpointNum; ++i) {
            this.submission.checkpointResults.push({
              id: i + 1,
              judgeResult: ret.judgeResult,
              judgeScore: 0,
              usedTime: 0,
              usedMemory: 0
            });
          }
          this.initWebSocket(
            '/submission',
            [this.submission.submissionId],
            this.wsSuccess
          );
        }
      }).finally(() => {
        this.spinShow = false;
      });
    },
    onCellClick: function(name) {
      if (this.submission.judgeResult < 0) {
        return;
      }
      if (name === 'rejudge') {
        // doRejudge
        api.rejudge([this.submission.submissionId]).then(_ => {
          this.reload();
        }).catch(err => {
          this.$Message.error(err.message);
        });
      } else if (name === 'invalidate') {
        // invalidate the grade
        api.invalidate({
          submissionId: this.submission.submissionId,
          contestId: this.contestId
        }).then(_ => {
          this.getSubmissionDetail(this.submission.submissionId);
        }).catch(err => {
          this.$Message.error(err.message);
        });
      }
    },
    query: function(submissionId) {
      if (submissionId) {
        this.spinShow = true;
        this.getSubmissionDetail(submissionId);
      }
    }
  },
  computed: {
    ...mapGetters('user', ['username', 'isAdmin', 'isLogin']),
    ...mapGetters('contest', ['contestId']),
    ...mapState('contest', ['contest']),
    showCode: function () {
      return !!this.submission.code || !!this.submission.zipFileId;
    },
    showJudgeLog: function () {
      return !!this.submission.judgeLog;
    },
    showCheckpointResults: function() {
      if (this.submission.checkpointResults === undefined || this.submission.checkpointResults === null ||
          this.submission.checkpointResults.length === 0) {
        return false;
      }
      if (this.submission.judgeResult === JUDGE_RESULT_TYPE.CAN) {
        return false;
      }
      if (this.submission.judgeResult > 0) {
        return !(this.submission.judgeResult === JUDGE_RESULT_TYPE.CE || this.submission.judgeResult === JUDGE_RESULT_TYPE.SE);
      }
      return this.submission.judgeResult === JUDGE_RESULT_TYPE.JG;
    },
    canDoRejudge: function() {
      return this.isAdmin || (this.contestId && this.isLogin && this.username === this.contest.username);
    },
    canDoInvalidate: function() {
      return this.isAdmin || (this.contestId && this.isLogin && this.username === this.contest.username);
    },
    judgedCheckpointNum: function() {
      if (this.submission.checkpointResults) {
        return this.submission.checkpointResults.filter(o => o.judgeResult > JUDGE_RESULT_TYPE.PD).length;
      }
      return 0;
    },
    downloadUrl: function() {
      return `${process.env.VUE_APP_OJ_SERVER}/api/filesys/download/${this.submission.zipFileId}/source`
    }
  },
  mounted: function () {
    this.query(this.$route.params.submissionId);
  },
  watch: {
    $route: function() {
      this.query(this.$route.params.submissionId);
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
    content: " KiB\0A";
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

  .ellipsis {
    float: right;
    text-align: right;
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

</style>

<style lang="less">
  /* for block of numbers */
  .hljs-ln-numbers {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    text-align: right;
    color: #ccc;
    vertical-align: top;
    padding-right: 10px;

    /* your custom style here */
    // 假装是 github 那样
    /*&:hover {*/
    /*  cursor: pointer;*/
    /*  color: rgba(27, 31, 35, 0.6);*/
    /*}*/
  }

  /* for block of code */
  .hljs-ln-code {
    padding-left: 10px !important;
  }

  .hljs {
    display: block;
    overflow-x: auto;
    padding: 0.5em;
    color: #333;
    background: #fff;
  }
</style>
