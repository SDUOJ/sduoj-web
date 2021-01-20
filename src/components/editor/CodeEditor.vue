<!--
   Copyright 2020-2021 the original author or authors.

   Licensed under the General Public License, Version 3.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

        https://www.gnu.org/licenses/gpl-3.0.en.html
 -->

<template>
  <div>
    <div class="utils clearfix">
      <div class="lang">
        <span>Judge Templates: </span>
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
      <Upload
        class="upload"
        :show-upload-list="false"
        :format="judgeTemplate.acceptFileExtensions || []"
        :accept="(judgeTemplate.acceptFileExtensions || []).map(o => `.${o}`).join(',')"
        :file-list.sync="fileList">
<!--        TODO: 上传文件暂不可用-->
        <Tooltip :disabled="true">
          <div slot="content">
            {{ judgeTemplate.acceptFileExtensions }} ALLOWED
          </div>
          <Button icon="ios-cloud-upload-outline" v-if="fileList.length === 0" :disabled="true">
            Upload
          </Button>
          <Button icon="ios-cloud-upload-outline" v-else>{{ fileList[0].name }}</Button>
        </Tooltip>

      </Upload>
    </div>
    <div class="editor">
      <codemirror :value="code" :options="options" @change="onEditorCodeChange" ref="myEditor"></codemirror>
    </div>
  </div>
</template>
<script>
import { codemirror } from 'vue-codemirror-lite'
import 'codemirror/addon/selection/active-line.js'
import { JUDGE_TEMPLATE_PROPERITY } from '_u/constants';
import Upload from '_c/upload/upload';

export default {
  name: 'CodeMirror',
  components: {
    codemirror,
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
    }
  },
  filters: {
    judgeTemplateTypeName: type => JUDGE_TEMPLATE_PROPERITY[type].name
  },
  data: function () {
    return {
      options: {
        // codemirror options
        tabSize: 2,
        theme: 'default',
        lineNumbers: true,
        line: true,
        // 选中文本自动高亮，及高亮方式
        matchBrackets: true,
        styleSelectedText: true,
        lineWrapping: true,
        highlightSelectionMatches: { showToken: /\w/, annotateScrollbar: true }
      },
      mode: {},
      fileList: []
    }
  },
  mounted: function() {
  },
  methods: {
    onEditorCodeChange: function(newCode) {
      this.$emit('update:code', newCode);
    },
    onJudgeTemplateChange: function(newVal) {
      for (let i = 0; i < this.judgeTemplateSet.length; ++i) {
        if (this.judgeTemplateSet[i].id === newVal) {
          this.$emit('changeJudgeTemplate', this.judgeTemplateSet[i]);
        }
      }
    }
  },
  watch: {
    fileList: function() {
      this.$emit('update:file', this.fileList[0].file);
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
.editor {
  margin-right: -15px;
  border-top: 1px solid #d4d4d5;
  border-bottom: 1px solid #d4d4d5;
}
</style>
