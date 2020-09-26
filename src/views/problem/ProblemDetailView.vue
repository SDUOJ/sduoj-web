<template>
   <div>
       <!-- <NavPath></NavPath> -->
       <div class="container">
          <!-- 标题 -->
            <h2 v-text="problemInfo.title"></h2>
          <!--  -->
        <Row class="main">
          <Col span="17" class="main-lf">
          <!-- 题面描述 -->
            <DisplayCard class="problem-block">
              <div slot="header" class="problem-block-header">Description</div>
              <div class="problem-markdown">
                <markdown-it-vue-light :content="problemInfo.content"></markdown-it-vue-light>
              </div>
            </DisplayCard>
          <!--  -->
          <!-- 样例输入输出 -->
            <DisplayCard class="problem-block" v-for="ex in problemInfo.examples" :key="ex.id">
              <div slot="header" class="problem-block-header">
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
            </DisplayCard>
          <!--  -->
          </Col>
          <Col span="7">
          <!-- 题目基本信息 -->
            <DisplayCard class="problem-block">
              <div slot="header" class="problem-block-header">Info</div>
              <div class="problem-info">
                <dl>
                  <dt>Problem ID</dt>
                  <dd>{{ problemInfo.pid }}</dd>
                </dl>
                <dl>
                  <dt>Time Limit</dt>
                  <dd class="timelimit">{{ problemInfo.timeLimit }}</dd>
                </dl>
                <dl>
                  <dt>Memory Limit</dt>
                  <dd class="memlimit">{{ problemInfo.memoryLimit }}</dd>
                </dl>
                <dl>
                  <dt>Source</dt>
                  <dd>{{ problemInfo.source }}</dd>
                </dl>
              </div>
            </DisplayCard>
          <!--  -->
          <!-- 近期提交记录 -->
          <DisplayCard class="problem-block clearfix">
            <div slot="header" class="problem-block-header">近期提交</div>
            <table border="0" cellpadding="0" cellspacing="0" style="margin: 5px 0; width: 100%;">
              <tr style="height: 30px;">
                <th>结果</th>
                <th>时间</th>
              </tr>
              <tr class="judge-result" @click="showDetail(sb.sid)" v-for="sb in submissions" :key="sb.sid">
                <td width="70%" :class="sb.judge_result === 1 ? 'verdict-accepted' : 'verdict-failed'" style="text-align: center;">{{ sb.judge_result | changeResult }}</td>
                <td width="30%" style="text-align: center;">{{ sb.date | changeTime }}</td>
              </tr>
            </table>
            <Button type="text" style="width: 100%; margin: 5px auto;">查看所有提交</Button>
          </DisplayCard>
          </Col>
        </Row>
       </div>
    </div> 
</template>

<script>
// import NavPath from '../../components/NavPath.vue';
import DisplayCard from '../../components/DisplayCard';
import MarkdownItVueLight from 'markdown-it-vue/dist/markdown-it-vue-light.umd.min.js'
import 'markdown-it-vue/dist/markdown-it-vue-light.css'
import { format } from 'timeago.js';
import JudgeResultMap from '../../utils/JudgeResultMap';

export default {
  components: { 
    DisplayCard,
    MarkdownItVueLight
  },
  filters: {
    changeTime: timestamp => format(new Date(timestamp), 'zh_CN'),
    changeResult: res => JudgeResultMap[res]
  },
  data: function() {
    return {
      problemInfo: {
        pid: '',
        title: '',
        content: '',
        timeLimit: '',
        memoryLimit: '',
        examples: [],
        source: ''
      },
      submissions: []
    }
  },
  methods: {
    copyToClipboard: function(content) {
      this.$copyText(content).then(e => console.log(e), e => console.log(e));
    },
    showDetail: function(sid) {
      console.log(sid);
    }
  },
  mounted: function() {
    this.problemInfo = {
      pid: 1001,
      title: 'A + B Problem',
      content: '## 123123123\n`$a^2+b^2=c^2$`\n```c\n#include <sdtio.h>\nint main() {\n\rleturn 0;\n}\n```\n',
      timeLimit: '1000',
      memoryLimit: '1024',
      source: 'unknown',
      examples: [
        { id: 1, input: '1 2', output: '3' },
        { id: 2, input: '4 5', output: '9' }
      ]
    };

    this.submissions = [
      { sid: 1, judge_result: 1, date: 1601125200000 },
      { sid: 2, judge_result: 2, date: 1601125200000 },
      { sid: 3, judge_result: 8, date: 1601125200000 }
    ]
  }
}
</script>

<style lang="less" scoped>
.problem-block {
  margin: 20px 20px 20px 0; 
  .problem-block-header {
    margin-left: 8px;
  }
}

.problem-markdown {
  padding: 12px 0;
}

.problem-example {
  padding: 12px 0;
  .clip:hover {
    cursor: pointer;
  }
}

.problem-info {
  user-select: none;
  dl {
    margin: 8px 0;
  }
  dt,dd {
    display:inline; 
    margin:0; 
    padding:0;
  } 
  dd {
    float: right;
  }
  dt {
    font-weight: bold;
  }
  dd::after{
    content:"\0A";
    white-space:pre;
  }
  .timelimit::after {
    content:" ms\0A";
    white-space:pre; 
  }
  .memlimit::after {
    content:" KB\0A";
    white-space:pre; 
  }
}

.judge-result {
  height: 30px;
  :hover {
    cursor: pointer;
  }
}
th, td {
  border-bottom: 1px solid #d4d4d5;
}

.verdict-accepted {
  color: #5cb85c;
  font-weight: 500;
}

.verdict-failed {
  color: #d9534f;
  font-weight: 500;
}
</style>