<template>
  <div class="container">
    <Row>
      <Col span="17">
        <div style="margin-right: 20px;">
          <!-- websocket -->
          <Card class="box" dis-hover :padding="0">
            <JudgeResult class="title" slot="title" :result="submission.judgeResult" />
            <!-- <Table
              disabled-hover
              v-if="submission.checkpointResults.length !== 0"
              :show-header="false"
              no-data-text=""
              size="small"
              :columns="columns"
              :data="submission.checkpointResults"
              class="data-table" ></Table> -->
          </Card>
          <Card v-if="showJudgerLog" class="box" :title="compilerLogTitle" dis-hover>
            <pre v-highlightjs="submission.judgeLog"><code style="font-family: Menlo, Monaco, 'Courier New', monospace;" class="plaintext"/></pre>
          </Card>
          <Card v-if="showCode" class="box" title="Your Code" icon="md-code" dis-hover :padding="5">
              <pre v-highlightjs="submission.code"><code style="font-family: Menlo, Monaco, 'Courier New', monospace;" :class="submission.lang" /></pre>
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
                  <Cell
                    title="Problem Code"
                    :to="{ name: 'problem-detail', params: { problemCode: submission.problemCode }}">
                    <ProblemCode slot="extra" :problemCode="submission.problemCode"></ProblemCode>
                  </Cell>
                  <Cell title="Problem ID" :extra="submission.problemId" />
                </div>
                <Divider size="small"/>
                <div style="margin-bottom: 24px;">
                  <Cell title="Submission ID" :extra="submission.submissionId" />

                  <Cell title="Create Time">
                    <Time slot="extra" :time="submission.gmtCreate | parseInt" type="datetime" />
                  </Cell>
                  <Cell title="Judge Time">
                    <Time slot="extra" :time="submission.gmtModified | parseInt" type="datetime" />
                  </Cell>
                  <Cell title="Username" :extra="submission.username" />
                  <Cell title="Judge Result">
                    <JudgeResult slot="extra" :result="submission.judgeResult" />
                  </Cell>
                  <Cell title="Score">
                    <span slot="extra">{{ submission.judgeScore || 0 }}</span>
                  </Cell>
                  <Cell title="Language" :extra="submission.language" />
                  <Cell title="Code Length">
                    <span slot="extra">{{ submission.codeLength || 0 }}</span>
                  </Cell>
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
import ProblemCode from '@/components/ProblemCode';
import JudgeResult from '@/components/JudgeResult';
import { mapGetters } from 'vuex';
import { sendWebsocket, closeWebsocket } from '@/utils/socket';
import api from '@/utils/api';

export default {
  components: { JudgeResult, ProblemCode },
  data: function() {
    return {
      submission: {},
      columns: [
        { title: '#', key: 'submissionId' },
        {
          title: '评测结果',
          key: 'judgeResult',
          minWidth: 50,
          render: (h, params) => h(JudgeResult, {  props: { result: params.row.judgeResult } })
        },
        { title: '用时', key: 'time' },
        { title: '内存', key: 'memory' }
      ]
    }
  },
  filters: {
    parseInt: str => parseInt(str)
  },
  methods: {
    wsSuccess: function(data) {
      console.log(data);
      if (data.length === this.submission.checkpointNum) {
        closeWebsocket();
      }
      this.checkpointResults = data;
    },
    wsError: function(err) {
      console.log('Err: ' + err);
    },
    wsRequest: function() {
      sendWebsocket('/ws/submission', { id: this.submission.submissionId }, this.wsSuccess, this.wsError);
    },
    gotoProblem: function(problemCode) {
      this.$router.push({
        name: 'problem-detail',
        params: { problemCode }
      });
    }
  },
  computed: {
    ...mapGetters('user', ['username']),
    showCode: function() {
      return !!this.submission.code;
    },
    showJudgerLog: function() {
      return !!this.submission.judgeLog || this.submission.judgeResult === 5 || this.submission.judgeResult === 8;
    },
    compilerLogTitle: function() {
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
  mounted: function() {
    api.getSubmissionDetail(this.$route.params.submissionId).then(ret => {
      this.submission = ret;
    })
    // this.wsRequest();
  },
  beforeDestroy: function() {
    closeWebsocket();
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
    content:" ms\0A";
    white-space:pre;
  }
.mem::after {
  content:" KB\0A";
  white-space:pre;
}

.box {
  margin-bottom: 20px;
}

.title {
  line-height: 35px;
  font-size: 1.7rem;
}
</style>
