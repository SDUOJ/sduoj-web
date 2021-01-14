<template>
  <mavon-editor
    style="z-index: 0; min-height: 0"
    :value="value || ''"
    :subfield="false"
    :boxShadow="false"
    :toolbarsFlag="false"
    :transition="false"
    :editable="false"
    :shortCut="false"
    :imageClick="doNothing"
    :externalLink="externalLink"
    defaultOpen="preview"/>
</template>

<script>
import { mavonEditor } from 'mavon-editor';
import 'mavon-editor/dist/css/index.css'

import { SDUOJ_ENV } from '_u/env';

export default {
  name: 'Markdown',
  components: {
    mavonEditor
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data: function () {
    const externalLink = SDUOJ_ENV.PROD ? {
      markdown_css: function () {
        // 这是你的markdown css文件路径
        return '/markdown/github-markdown.min.css';
      },
      hljs_js: function () {
        // 这是你的hljs文件路径
        return '/highlightjs/highlight.min.js';
      },
      hljs_css: function (css) {
        // 这是你的代码高亮配色文件路径
        return '/highlightjs/styles/' + css + '.min.css';
      },
      hljs_lang: function (lang) {
        // 这是你的代码高亮语言解析路径
        return '/highlightjs/languages/' + lang + '.min.js';
      },
      katex_css: function () {
        // 这是你的katex配色方案路径路径
        return '/katex/katex.min.css';
      },
      katex_js: function () {
        // 这是你的katex.js路径
        return '/katex/katex.min.js';
      }
    } : true;

    return {
      externalLink
    }
  },
  methods: {
    doNothing: function () {
    }
  }
}
</script>
