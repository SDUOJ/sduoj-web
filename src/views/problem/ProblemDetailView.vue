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
            <Card class="problem-box">
              <div slot="header" class="problem-box-header">Description</div>
              <div class="problem-markdown">
                <markdown-it-vue-light :content="problemInfo.content"></markdown-it-vue-light>
              </div>
            </Card>
          <!--  -->
          <!-- 样例输入输出 -->
            <Card class="problem-box" v-for="ex in problemInfo.examples" :key="ex.id">
              <div slot="header" class="problem-box-header">
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
            </Card>
          <!--  -->
          <!-- 代码编辑器 -->
          <Card class="problem-box clearfix">
            <CodeEditor style="margin-left: -15px;" 
              :code.sync="code" 
              :file.sync="file"
              :language="lang" 
              @changeLang="onChangeLang">
            </CodeEditor>
            <Button style="float: right; margin: 5px 0;" @click="onSubmit">提交</Button>
          </Card>
          <!--  -->
          </Col>
          <Col span="7">
          <!-- 题目基本信息 -->
            <Card class="problem-box">
              <div slot="header" class="problem-box-header">Info</div>
              <div class="problem-info">
                <dl>
                  <dt>Problem ID</dt>
                  <dd>{{ problemInfo.problemId }}</dd>
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
                <dl>
                  <dt>Tags</dt>
                  <dd v-if="showTags" class="show-tags">
                    <Poptip placement="bottom">
                      <a>Show</a>
                      <div slot="content">
                        <span style="margin: 5px 5px" v-for="tag in problemInfo.tags" :key="tag">{{tag}}</span>
                      </div>
                    </Poptip>
                  </dd>
                  <dd v-else>Disabled</dd>
                </dl>
              </div>
            </Card>
          <!--  -->
          <!-- 近期提交记录 -->
          <Card class="problem-box">
            <div slot="header" class="problem-box-header">近期提交</div>
            <table border="0" cellpadding="0" cellspacing="0" style="margin: 5px 0; width: 100%;">
              <tr style="height: 30px;">
                <th>结果</th>
                <th>时间</th>
              </tr>
              <tr class="judge-result" @click="showDetail(sb.submissionId)" v-for="sb in submissions" :key="sb.submissionId">
                <td width="70%" :class="utils.status2Class(sb.judgeResult)" style="text-align: center;">{{ sb.judgeResult | changeResult }}</td>
                <td width="30%" style="text-align: center;">{{ sb.when | changeTime }}</td>
              </tr>
            </table>
            <Button type="text" style="width: 100%; margin: 5px auto;">查看所有提交</Button>
          </Card>
          </Col>
        </Row>
       </div>
    </div> 
</template>

<script>
// import NavPath from '../../components/NavPath.vue';
import Card from '@/components/Card';
import MarkdownItVueLight from 'markdown-it-vue/dist/markdown-it-vue-light.umd.min.js'
import 'markdown-it-vue/dist/markdown-it-vue-light.css'
import CodeEditor from '@/components/CodeEditor';

import { format } from 'timeago.js';
import utils from '@/utils';

export default {
  components: { 
    Card,
    MarkdownItVueLight,
    CodeEditor
  },
  filters: {
    changeTime: timestamp => format(new Date(timestamp), 'zh_CN'),
    changeResult: res => utils.judgeResultMap[res]
  },
  data: function() {
    return {
      problemInfo: {
        problemId: '',
        title: '',
        content: '',
        timeLimit: '',
        memoryLimit: '',
        examples: [],
        source: '',
        tags: []
      },
      submissions: [],
      code: '',
      file: null,
      lang: 'C++',
      showTags: true
    }
  },
  methods: {
    copyToClipboard: function(content) {
      this.$copyText(content).then(e => this.$Message.success('已复制到剪切板'), e => console.log(e));
    },
    showDetail: function(sid) {
      console.log(sid);
    },
    onChangeLang: function(newLang) {
      this.lang = newLang;
    },
    onSubmit: function() {
      console.log(this.code);
      console.log(this.file);
    }
  },
  computed: {
    utils: () => utils
  },
  mounted: function() {
    this.problemInfo = {
      problemId: 1001,
      title: 'A + B Problem',
      content: '## 123123123\n`$a^2+b^2=c^2$`\n```c\n#include <sdtio.h>\nint main() {\n\rleturn 0;\n}\n```\n',
      timeLimit: '1000',
      memoryLimit: '1024',
      source: 'unknown',
      examples: [
        { id: 1, input: '1 2', output: '3' },
        { id: 2, input: '4 5', output: '9' }
      ],
      tags: ['greedy', 'math']
    };

    this.submissions = [
      { submissionId: 1, judgeResult: 0, when: 1601125200000 },
      { submissionId: 2, judgeResult: 1, when: 1601125200000 },
      { submissionId: 3, judgeResult: 2, when: 1601125200000 },
      { submissionId: 4, judgeResult: 8, when: 1601125200000 }
    ]
  }
}
</script>

<style lang="less" scoped>
.problem-box {
  margin: 20px 20px 20px 0; 
  .problem-box-header {
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
  .show-tags:hover {
    cursor: pointer;
  }
}

.judge-result {
  height: 30px;
}
th, td {
  border-bottom: 1px solid #d4d4d5;
}
</style>