<!--
   Copyright 2020-2022 the original author or authors.

   Licensed under the Affero General Public License, Version 3.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

        https://www.gnu.org/licenses/agpl-3.0.en.html
 -->

<template>
  <div>
    <div class="utils clearfix">
      <div class="lang">
<!--        <span>Judge Templates: </span>-->
        <Select @on-change="onJudgeTemplateChange" :value="judgeTemplate.id" class="adjust">
          <template v-for="template in judgeTemplateSet">
            <Tooltip v-if="template.comment.trim() !== ''" :key="template.id" :content="template.comment" style="width: 100%"  placement="right" transfer>
              <Option :value="template.id" :label="template.title">
                <span>{{ template.title }}</span>
                <span style="float: right; color: #ccc">{{ template.type | judgeTemplateTypeName }}</span>
              </Option>
            </Tooltip>
            <Option v-else :value="template.id" :key="template.id" :label="template.title">
              <span>{{ template.title }}</span>
              <span style="float: right; color: #ccc">{{ template.type | judgeTemplateTypeName }}</span>
            </Option>
          </template>
        </Select>
      </div>
      <div class="upload">
        <Upload
          style="display: inline"
          :file-list.sync="fileList"
          :show-upload-list="false"
          :format="['zip']"
          maxSize=1024
          accept=".zip">
          <!--:format="judgeTemplate.acceptFileExtensions || []"
          :accept="(judgeTemplate.acceptFileExtensions || []).map(o => `.${o}`).join(',')">-->
          <div v-if="uploadFile">

            <Button icon="ios-cloud-upload-outline" v-if="fileList.length === 0">
              Choose your Zip file
            </Button>
            <Button icon="ios-cloud-upload-outline" v-else>{{ fileList[0].name }}</Button>
          </div>
        </Upload>
        <Button icon="md-close" v-if="fileList.length > 0" @click="clearFiles"/>
      </div>
    </div>
    <div v-if="!this.uploadFile" class="editor">
      <div v-if="functionTemplate.isShowFunctionTemplate">
        <div class="label">
          <span>Your solution will be inserted behind this code (Read Only)</span>
        </div>
        <div class="ft-code">
          <CodeEditor max-height read-only :mode="mode" :code="functionTemplate.functionTemplate" />
        </div>
      </div>
      <div>
        <div class="label">
          <span>Your solution</span>
        </div>
        <div class="editor-code">
          <CodeEditor :mode="mode" :code.sync="editCode" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CodeEditor from './CodeEditor';
import Upload from '_c/upload/upload';
import { JUDGE_TEMPLATE_PROPERITY, JUDGE_TEMPLATE_TYPE } from '_u/constants';

const CODEMIRROR_MODE = {
  cpp: 'text/x-c++src',
  'c++': 'text/x-c++src',
  java: 'text/x-java',
  python: 'text/x-python',
  sql: 'text/x-mysql',
  c: 'text/x-csrc'
};

export default {
  name: 'SubmitBox',
  components: {
    CodeEditor,
    Upload
  },
  props: {
    code: {
      type: String,
      default: ''
    },
    file: {
      type: File,
      default: null
    },
    judgeTemplate: {
      type: Object,
      default: () => {}
    },
    judgeTemplateSet: {
      type: Array,
      default: () => []
    },
    functionTemplateSet: {
      type: Array,
      default: () => []
    }
  },
  filters: {
    judgeTemplateTypeName: type => JUDGE_TEMPLATE_PROPERITY[type].name
  },
  data: function () {
    return {
      mode: '',
      editCode: '',
      functionTemplate: {
        isShowFunctionTemplate: 0
      },
      fileList: []
    }
  },
  mounted: function() {
    this.changeFunctionTemplate(this.judgeTemplate);
    this.changeMode(this.judgeTemplate.title);
  },
  methods: {
    clearFiles: function () {
      this.fileList = [];
    },
    changeMode: function (title) {
      title = title.toLowerCase();
      for (const k in CODEMIRROR_MODE) {
        if (title.includes(k)) {
          this.mode = CODEMIRROR_MODE[k];
          break;
        }
      }
    },
    changeFunctionTemplate: function(judgeTemplate) {
      this.editCode = '';
      this.functionTemplate = {
        isShowFunctionTemplate: 0
      };

      this.functionTemplateSet.some(o => {
        if (o.judgeTemplateId === judgeTemplate.id &&
          o.initialTemplate !== null &&
          o.functionTemplate !== null) {
          this.editCode = o.initialTemplate;
          this.functionTemplate = o;
          return true;
        }
        return false;
      });
    },
    onJudgeTemplateChange: function(id) {
      this.judgeTemplateSet.forEach(o => {
        if (o.id === id) {
          this.changeFunctionTemplate(o);
          this.changeMode(o.title);
          this.$emit && this.$emit('update:judgeTemplate', o);
        }
      });
    }
  },
  computed: {
    uploadFile: function () {
      return this.judgeTemplate.type === JUDGE_TEMPLATE_TYPE.ADVANCED &&
        this.judgeTemplate.acceptFileExtensions.includes('zip');
    }
  },
  watch: {
    fileList: function() {
      if (this.fileList.length > 0) {
        this.$emit && this.$emit('update:file', this.fileList[0].file);
      } else {
        this.$emit && this.$emit('update:file', null);
      }
    },
    editCode: function (newCode) {
      this.$emit && this.$emit('update:code', newCode);
    }
  }
}
</script>

<style lang="less" scoped>
.utils {
  margin-right: -15px;
  .lang {
    float: left;
    padding: 10px 10px 5px 10px;
    .adjust {
      width: 300px;
      margin-left: 10px;
    }
  }
  .upload {
    float: right;
    padding: 10px 10px 5px 0;
  }
}

.label {
  margin: 5px 0 0 10px;
}

.ft-code {
  border-top: 1px solid #d4d4d5;
  border-bottom: 1px solid #d4d4d5;
}

.editor-code {
  border-top: 1px solid #d4d4d5;
}

.editor {
  margin-right: -15px;
  border-top: 1px solid #d4d4d5;
  border-bottom: 1px solid #d4d4d5;
}
</style>
