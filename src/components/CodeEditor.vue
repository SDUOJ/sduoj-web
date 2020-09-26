<template>
  <div>
    <div class="utils clearfix">
      <div class="lang">
        <span>Languages: </span>
        <Select :value="language" @on-change="onLangChange" class="adjust">
          <Option v-for="item in languageSet" :key="item" :value="item">
            {{item}}
          </Option>
        </Select>
      </div>
      <Upload class="upload" :before-upload="onFileUpload" action="">
        <Button icon="ios-cloud-upload-outline" v-if="filename === ''">Upload</Button>
        <Button icon="ios-cloud-upload-outline" v-else>{{ filename }}</Button>
      </Upload>
    </div>
    <div class="editor">
      <codemirror :value="code" :options="options" @change="onEditorCodeChange" ref="myEditor"></codemirror>
    </div>
  </div>
</template>
<script>
// Thanks for @QingdaoU
// import utils from '@/utils/utils'
import { codemirror } from 'vue-codemirror-lite'
// mode
import 'codemirror/mode/clike/clike.js'
import 'codemirror/mode/python/python.js'
// active-line.js
import 'codemirror/addon/selection/active-line.js'
export default {
  name: 'CodeMirror',
  components: {
    codemirror
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
    languageSet: {
      type: Array,
      default: () => {
        return ['C', 'C++', 'Java', 'Python2', 'Python3']
      }
    },
    language: {
      type: String,
      default: 'C++'
    }
  },
  data () {
    return {
      options: {
        // codemirror options
        tabSize: 4,
        mode: 'text/x-csrc',
        theme: 'default',
        lineNumbers: true,
        line: true,
        // 选中文本自动高亮，及高亮方式
        styleSelectedText: true,
        lineWrapping: true,
        highlightSelectionMatches: { showToken: /\w/, annotateScrollbar: true }
      },
      mode: {
        'C++': 'text/x-csrc'
      },
      filename: ''
    }
  },
  mounted () {
    // utils.getLanguages().then(languages => {
    //   const mode = {}
    //   languages.forEach(lang => {
    //     mode[lang.name] = lang.content_type
    //   })
    //   this.mode = mode
    //   this.editor.setOption('mode', this.mode[this.language])
    // })
    this.editor.focus()
  },
  methods: {
    onEditorCodeChange: function(newCode) {
      this.$emit('update:code', newCode)
    },
    onLangChange: function(newVal) {
      this.editor.setOption('mode', this.mode[newVal])
      this.$emit('changeLang', newVal)
    },
    onFileUpload: function(newFile) {
      this.filename = newFile.name;
      this.$emit('update:file', newFile);
      return false;
    }
  },
  computed: {
    editor () {
      // get current editor object
      return this.$refs.myEditor.editor
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