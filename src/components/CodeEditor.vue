<!--
   Copyright 2020-2020 the original author or authors.

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
          <Tooltip v-for="template in judgeTemplateSet" :key="template.id" :content="template.comment" style="width: 100%"  placement="right" transfer>
            <Option :value="template.id" :label="template.title">
              <span>{{ `${template.id}:${template.title}` }}</span>
              <span style="float:right;color:#ccc">{{ template.type | judgeTemplateTypeName }}</span>
            </Option>
          </Tooltip>
        </Select>
      </div>
      <Upload
        class="upload"
        :show-upload-list="false"
        :format="judgeTemplate.acceptFileExtensions"
        :accept="judgeTemplate.acceptFileExtensions.map(o => `.${o}`).join(',')"
        :file-list.sync="fileList">
        <Tooltip>
          <div slot="content">
            {{ judgeTemplate.acceptFileExtensions }} ALLOWED
          </div>
          <Button icon="ios-cloud-upload-outline" v-if="fileList.length === 0">
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
import { judgeTemplateProperity } from '_u/constants';
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
    judgeTemplateTypeName: type => judgeTemplateProperity[type].name
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
    this.$refs.myEditor.editor.focus();
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
      width: 150px;
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
