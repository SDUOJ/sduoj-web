<template>
    <div :class="[prefixCls]">
        <div
            :class="classes"
            @click="handleClick"
            @drop.prevent="onDrop"
            @paste="handlePaste"
            @dragover.prevent="dragOver = true"
            @dragleave.prevent="dragOver = false">
            <input
                ref="input"
                type="file"
                :class="[prefixCls + '-input']"
                @change="handleChange"
                :multiple="multiple"
                :accept="accept">
            <slot></slot>
        </div>
        <slot name="tip"></slot>
        <upload-list
            v-if="showUploadList"
            :files="fileList"
            @on-file-remove="handleRemove"
            @on-file-preview="handlePreview"></upload-list>
    </div>
</template>
<script>
import UploadList from './upload-list.vue'
import SparkMD5 from 'spark-md5'

const prefixCls = 'ivu-upload'

const readMD5 = function (file, setProcess, done) {
  const blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice
  const chunkSize = 2097152 // Read in chunks of 2MB
  const chunks = Math.ceil(file.size / chunkSize)
  const spark = new SparkMD5.ArrayBuffer()
  const fileReader = new FileReader()
  let currentChunk = 0

  fileReader.onload = function (e) {
    spark.append(e.target.result) // Append array buffer
    currentChunk++
    setProcess({ process: currentChunk / chunks }, file);

    if (currentChunk < chunks) {
      loadNext()
    } else {
      done(spark.end(), file);
    }
  }

  function loadNext () {
    const start = currentChunk * chunkSize
    const end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize

    fileReader.readAsArrayBuffer(blobSlice.call(file, start, end))
  }

  loadNext()
}

export default {
  name: 'Upload',
  components: { UploadList },
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    showUploadList: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      validator (value) {
        const validList = ['select', 'drag']
        for (let i = 0; i < validList.length; i++) {
          if (value === validList[i]) {
            return true
          }
        }
        return false
      },
      default: 'select'
    },
    format: {
      type: Array,
      default () {
        return []
      }
    },
    accept: {
      type: String
    },
    maxSize: {
      type: Number
    },
    onProgress: {
      type: Function,
      default () {
        return {}
      }
    },
    onSuccess: {
      type: Function,
      default () {
        return {}
      }
    },
    onRemove: {
      type: Function,
      default () {
        return {}
      }
    },
    onPreview: {
      type: Function,
      default () {
        return {}
      }
    },
    onExceededSize: {
      type: Function,
      default () {
        return {}
      }
    },
    onFormatError: {
      type: Function,
      default () {
        return {}
      }
    },
    paste: {
      type: Boolean,
      default: false
    },
    defaultFileList: {
      type: Array,
      default () {
        return []
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      prefixCls: prefixCls,
      dragOver: false,
      fileList: [],
      tempIndex: 1
    }
  },
  computed: {
    classes () {
      return [
                `${prefixCls}`,
                {
                  [`${prefixCls}-select`]: this.type === 'select',
                  [`${prefixCls}-drag`]: this.type === 'drag',
                  [`${prefixCls}-dragOver`]: this.type === 'drag' && this.dragOver
                }
      ]
    }

  },
  methods: {
    handleClick () {
      if (this.itemDisabled) return
      this.$refs.input.click()
    },
    handleChange (e) {
      const files = e.target.files

      if (!files) {
        return
      }
      this.uploadFiles(files)
      this.$refs.input.value = null
    },
    onDrop (e) {
      this.dragOver = false
      if (this.itemDisabled) return
      this.uploadFiles(e.dataTransfer.files)
    },
    handlePaste (e) {
      if (this.itemDisabled) return
      if (this.paste) {
        this.uploadFiles(e.clipboardData.files)
      }
    },
    uploadFiles (files) {
      let postFiles = Array.prototype.slice.call(files)
      if (!this.multiple) postFiles = postFiles.slice(0, 1)

      if (postFiles.length === 0) return

      postFiles.forEach(file => {
        this.upload(file)
      })
    },
    upload (file) {
      this.post(file)
    },
    post (file) {
      // check format
      if (this.format.length) {
        const _file_format = file.name.split('.').pop().toLocaleLowerCase()
        const checked = this.format.some(item => item.toLocaleLowerCase() === _file_format)
        if (!checked) {
          this.onFormatError(file, this.fileList)
          return false
        }
      }

      // check maxSize
      if (this.maxSize) {
        if (file.size > this.maxSize * 1024) {
          alert('File size exceeds the limit of ' + this.maxSize + 'Bytes. Please select a smaller file.')
          this.onExceededSize(file, this.fileList)
          return false
        }
      }

      this.handleStart(file)
    },
    handleStart (file) {
      file.uid = Date.now() + this.tempIndex++;
      const _file = {
        status: 'uploading',
        name: file.name,
        size: file.size,
        percentage: 0,
        uid: file.uid,
        showProgress: true,
        file: file
      }
      if (this.multiple) {
        this.fileList.push(_file)
      } else {
        this.fileList = [_file];
      }
      readMD5(file, this.handleProgress, this.handleSuccess);
    },
    getFile (file) {
      const fileList = this.fileList
      let target
      fileList.every(item => {
        target = file.uid === item.uid ? item : null
        return !target
      })
      return target
    },
    handleProgress (e, file) {
      const _file = this.getFile(file)
      _file.percentage = parseInt((e.process || 0) * 100)
    },
    handleSuccess (md5, file) {
      const _file = this.getFile(file)

      if (_file) {
        _file.status = 'finished'
        _file.md5 = md5

        setTimeout(() => {
          _file.showProgress = false
        }, 1000)
      }
    },
    handleError (err, response, file) {
      const _file = this.getFile(file)
      const fileList = this.fileList

      _file.status = 'fail'

      fileList.splice(fileList.indexOf(_file), 1)

      this.onError(err, response, file)
    },
    handleRemove (file) {
      const fileList = this.fileList
      fileList.splice(fileList.indexOf(file), 1)
      this.onRemove(file, fileList)
    },
    handlePreview (file) {
      if (file.status === 'finished') {
        this.onPreview(file)
      }
    },
    clearFiles () {
      this.fileList = []
    }
  },
  watch: {
    defaultFileList: {
      immediate: true,
      handler (fileList) {
        this.fileList = fileList.map(item => {
          item.status = 'finished'
          item.percentage = 100
          item.uid = Date.now() + this.tempIndex++
          return item
        })
      }
    },
    fileList: function() {
      this.$emit('update:file-list', this.fileList);
    }
  }
}
</script>
