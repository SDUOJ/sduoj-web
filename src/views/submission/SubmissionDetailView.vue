<template>
  <div class="container">
    <Row>
      <Col span="18">
        <div style="margin-right: 20px;">
          <!-- websocket -->
          <Card class="box" dis-hover :padding="0">
            <div class="title" slot="title">
              <Icon type="md-information" color="grey" v-if="submission.judgeResult === 0"/>
              <Icon type="md-checkmark" color="#5cb85c" v-else-if="submission.judgeResult === 1"/>
              <Icon type="md-close" color="orange" v-else-if="submission.judgeResult === 8"/>
              <Icon type="md-close" color="#d9534f" v-else/>
              &nbsp;
              <span :class="utils.status2Class(submission.judgeResult)">{{ submission.judgeResult | judgeResult2Text }}</span>
            </div>
            <Table 
              disabled-hover
              v-if="checkpointResults.length !== 0"
              :show-header="false"
              no-data-text=""
              size="small"
              :columns="columns" 
              :data="checkpointResults" 
              class="data-table" ></Table>
          </Card>
          <Card v-if="showJudgerLog" class="box" :title="compilerLogTitle" dis-hover>
            <pre v-highlightjs="submission.judgerLog"><code style="font-family: Menlo, Monaco, 'Courier New', monospace;" class="plaintext"/></pre>
          </Card>
          <Card v-if="showCode" class="box" title="Your Code" icon="md-code" dis-hover :padding="5">
              <pre v-highlightjs="submission.code"><code style="font-family: Menlo, Monaco, 'Courier New', monospace;" :class="submission.lang" /></pre>
          </Card>
        </div>
      </Col>
      <Col span="6">
        <Card title="Submission" icon="ios-options" dis-hover :padding="0">
            <CellGroup>
                <div style="margin-top: 24px;">
                  <Cell title="Public" v-if="submission.username === username">
                      <i-switch v-model="submission.isPublic" slot="extra" true-color="#19be6b"/>
                  </Cell>
                  <Cell title="Problem ID" :extra="submission.problemId" :to="'/problem/' + submission.problemId" />
                </div>
                <Divider size="small"/>
                <div style="margin-bottom: 24px;">
                  <Cell title="Submission ID" :extra="submission.submissionId" />
                  <Cell title="Username" :extra="submission.username" />
                  <Cell title="Score" :extra="submission.judgeScore.toString()" />
                  <Cell title="Language" :extra="submission.lang" />
                  <Cell title="Total Time">
                    <span class="time" slot="extra">{{ submission.usedTime }}</span>
                  </Cell>
                  <Cell title="Total Memory">
                    <span class="mem" slot="extra">{{ submission.usedMemory }}</span>
                  </Cell>
                </div>
            </CellGroup>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
// import Card from '@/components/Card';
import { mapGetters } from 'vuex';
import { sendWebsocket, closeWebsocket } from '@/utils/socket';
import utils from '@/utils';

export default {
  // components: { Card },
  data: function() {
    return {
      submission: {
        submissionId: '123',
        problemId: '1001',
        username: '',
        usedTime: '',
        usedMemory: '',
        code: '#include <stdio.h>\nint main() {\n\tint a, b;\n\tscanf("%d%d", &a, &b);\n\tprintf("%d\\n", a + b);\n\treturn 0;\n}',
        lang: 'cpp',
        judgeResult: 8,
        judgeScore: 0,
        judgerLog: 'warning: axxxxxx\nxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        isPublic: true
      },
      columns: [
        { title: '#', key: 'submissionId' },
        { 
          title: '评测结果', 
          key: 'judgeResult',
          minWidth: 50,
          render: (h, params) => h('span', {  class: utils.status2Class(params.row.judgeResult) }, utils.judgeResultMap[params.row.judgeResult])
        },
        { title: '用时', key: 'time' },
        { title: '内存', key: 'memory' }
      ],
      checkpointResults: []
    }
  },
  filters: {
    judgeResult2Text: judgeResult => utils.judgeResultMap[judgeResult]
  },
  methods: {
    wsSuccess: function(data) {
      console.log(data);
      if (data.length === this.submission.numOfCheckpoints) {
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
    gotoProblem: function(problemId) {
      this.$router.push('/problem/' + problemId);
    }
  },
  computed: {
    ...mapGetters('user', ['username']),
    utils: () => utils,
    showCode: function() {
      return true || !!this.submission.code;
    },
    showJudgerLog: function() {
      return !!this.submission.judgerLog || this.submission.judgeResult === 5 || this.submission.judgeResult === 8;
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
  // margin-bottom: .75rem;
}
</style>