<template>
  <div>
    <details style="margin-bottom: 5px">
      <summary>Upload File Attachment</summary>
      <Upload
        multiple
        paste
        type="drag"
        :max-size="102400"
        :file-list.sync="fileList"
        ref="upload">
        <div style="padding: 20px 0">
          <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
          <p>Click or drag files here to upload</p>
        </div>
      </Upload>
      <Button size="small" type="info" @click="attachAdd">Add</Button>
    </details>
    <mavon-editor
      ref="md"
      @imgAdd="$imgAdd"
      v-model="markdown"
      :externalLink="externalLink"
      style="min-height: 600px"/>
  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

import Upload from '_c/upload/upload';

import api from '_u/api';
import { SDUOJ_ENV } from '_u/env';

// 替换 mavonEditor 的 $img2Url 方法
// 占位符识别 <img src="fileIndex" ...
function $img2Url(fileIndex, url) {
  // <img src="1"
  var reg_str = '/\\<img src=\\"' + fileIndex + '\\"/g';
  /* eslint-disable */
  var reg = eval(reg_str);
  this.d_value = this.d_value.replace(reg, '<img src="' + url + '"');
  this.$refs.toolbar_left.$changeUrl(fileIndex, url);
  this.iRender();
}

// 替换 mavonEditor 的 $imgAdd 方法
// 生产的 markdown 图片为 html 中的 img 标签，不再是 ![]()
function $imgAdd(pos, $file, isinsert) {
  if (isinsert === undefined) isinsert = true;
  var $vm = this;
  if (this.__rFilter == null) {
    this.__rFilter = /^image\//i;
  }
  this.__oFReader = new FileReader();
  this.__oFReader.onload = function (oFREvent) {
    $vm.markdownIt.image_add(pos, oFREvent.target.result);
    $file.miniurl = oFREvent.target.result;
    if (isinsert === true) {
      // 去除特殊字符
      /* eslint-disable no-useless-escape */
      $file._name = $file.name.replace(/[\[\]\(\)\+\{\}&\|\\\*^%$#@\-]/g, '');

      $vm.insertText($vm.getTextareaDom(),
        {
          prefix: `<img src="${pos}" alt="${$file._name}" style="zoom:100%;" />`,
          subfix: '',
          str: ''
        });
      $vm.$nextTick(function () {
        $vm.$emit('imgAdd', pos, $file);
      })
    }
  }
  if ($file) {
    var oFile = $file;
    if (this.__rFilter.test(oFile.type)) {
      this.__oFReader.readAsDataURL(oFile);
    }
  }
}

export default {
  name: 'MarkdownEditor',
  components: { mavonEditor, Upload },
  data: function() {
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
      externalLink,
      markdown: '',
      fileList: []
    }
  },
  methods: {
    $imgAdd: function(pos, file) {
      const formdata = new FormData();
      formdata.append('files', file);
      api.multiUpload(formdata).then(ret => {
        const $vm = this.$refs.md;
        $vm.$img2Url(pos, `/api/filesys/download/${ret[0].id}/${ret[0].name}`);
        $vm.$refs.toolbar_left.img_file = [[0, null]];
        $vm.$refs.toolbar_left.num = 0;
      }, err => {
        this.$Message.error(err.message);
      })
    },
    $attachAdd: function(files) {
      return new Promise((resolve, reject) => {
        const formdata = new FormData();
        files.forEach(file => {
          formdata.append('files', file.file)
        });
        api.multiUpload(formdata).then(ret => {
          ret.forEach(o => {
            const $vm = this.$refs.md;
            // 去除特殊字符
            /* eslint-disable no-useless-escape */
            const _name = o.name.replace(/[\[\]\(\)\+\{\}&\|\\\*^%$#@\-]/g, '');
            $vm.insertText($vm.getTextareaDom(),
              {
                prefix: '[' + _name + '](' + `/api/filesys/download/${o.id}/${o.name.replace(' ', '_')}` + ')',
                subfix: '',
                str: ''
              }
            );
          });
          resolve();
        }, reject);
      })
    },
    $clear: function() {
      this.$refs.upload.clearFiles();
      const $vm = this.$refs.md;
      $vm.$refs.toolbar_left.img_file = [[0, null]];
      $vm.$refs.toolbar_left.num = 0;
    },
    attachAdd: function () {
      const removeLoading = this.$Message.loading({
        content: 'Uploading',
        duration: 0
      });
      this.$attachAdd(this.fileList).then(() => {
        this.$refs.upload.clearFiles();
      }).catch(err => {
        this.$Message.error(err.message);
      }).finally(() => {
        removeLoading();
      });
    },
    setMarkdown: function(markdown) {
      this.markdown = markdown;
    },
    getMarkdown: function () {
      return this.markdown;
    }
  },
  mounted: function() {
    const $vm = this.$refs.md;
    $vm.$imgAdd = $imgAdd.bind($vm);
    $vm.$img2Url = $img2Url.bind($vm);
  }
}
</script>

<style scoped>

</style>
