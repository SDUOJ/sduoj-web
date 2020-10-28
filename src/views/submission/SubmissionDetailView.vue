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
              v-if="submission.checkpointResults"
              disabled-hover
              no-data-text=""
              size="small"
              :columns="columns"
              :data="submission.checkpointResults"
              class="data-table" />
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
        { title: '#', key: 'id' },
        {
          title: 'Result',
          minWidth: 50,
          render: (h, params) => h(JudgeResult, { props: { result: params.row.judgeResult } })
        },
        {
          title: 'Time',
          render: (h, params) => h('span', { class: 'time' }, params.row.usedTime)
        },
        {
          title: 'Memory',
          render: (h, params) => h('span', { class: 'mem' }, params.row.usedMemory)
        }
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
      sendWebsocket('/submission', { id: this.submission.submissionId }, this.wsSuccess, _ => (closeWebsocket()));
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
