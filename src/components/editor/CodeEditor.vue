<!--
   Copyright 2020-2021 the original author or authors.

   Licensed under the General Public License, Version 3.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

        https://www.gnu.org/licenses/gpl-3.0.en.html
 -->

<template>
  <div :class="{ 'limit': maxHeight }">
    <textarea ref="editor" class="codeEditor" />
  </div>
</template>

<script>
import CodeMirror from 'codemirror'
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/sql/sql';
import 'codemirror/mode/python/python';

import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/selection/active-line';
import 'codemirror/addon/edit/closebrackets';

export default {
  props: {
    code: String,
    mode: String,
    maxHeight: Boolean,
    readOnly: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      editor: null,
      cmOptions: {
        cursorHeight: 1,
        tabSize: 2,
        smartIndent: true,        // 是否智能缩进
        styleActiveLine: true,    // 当前行高亮
        lineNumbers: true,        // 显示行号
        lineWrapping: false,      // 自动换行
        matchBrackets: true,      // 括号匹配显示
        autoCloseBrackets: true,  // 输入和退格时成对
        autoRefresh: true         // 自动刷新
      }
    }
  },
  methods: {
    initialize: function () {
      this.editor = CodeMirror.fromTextArea(this.$refs.editor, this.cmOptions);
      this.editor.setValue(this.code || '');
      this.editor.setOption('mode', this.mode);
      if (this.readOnly) {
        this.editor.setOption('readOnly', this.readOnly);
        this.editor.setOption('styleActiveLine', false);
      }
      this.editor.refresh();
      this.editor.on('change', cm => {
        this.$emit && this.$emit('update:code', cm.getValue());
      });
    },
    refresh: function () {
      this.$nextTick && this.$nextTick(() => {
        this.editor && this.editor.refresh();
      });
    }
  },
  mounted: function() {
    this.cmOptions.mode = this.mode;
    this.initialize();
  },
  watch: {
    mode: function (mode) {
      this.editor && this.editor.setOption('mode', mode);
    },
    code: function (val) {
      const editorValue = this.editor.getValue();
      if (val !== editorValue) {
        this.editor.setValue(val);
      }
    }
  }
}
</script>

<style lang="less" scoped>
.limit /deep/ .CodeMirror {
  height: auto;
  max-height: 200px;
}

.limit /deep/ .CodeMirror-scroll {
  height: auto;
  max-height: 200px;
}

/deep/ .CodeMirror {
  font-size: 14px;
  line-height: 1.5;
}

</style>
