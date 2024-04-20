<!--
   Copyright 2020-2022 the original author or authors.

   Licensed under the Affero General Public License, Version 3.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

        https://www.gnu.org/licenses/agpl-3.0.en.html
 -->

<template>
  <div class="clearfix">
    <div>
      <span class="subtitle">Newline</span>
      <div class="float-right">
        <Dropdown transfer @on-click="onChangeConvertMode">
          <a href="javascript:void(0)">
            {{ NEWLINE_CONVERT[convertMode].description }}
            <Icon type="ios-arrow-down"></Icon>
          </a>
          <DropdownMenu slot="list">
            <DropdownItem
              v-for="convert in NEWLINE_CONVERT" :key="convert.name"
              :name="convert.name">{{ convert.description }}</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>

    <div>
      <span class="subtitle">Single Upload</span>
      <div class="float-right">
        <Button @click="reset" size="small" type="text">Clear All</Button>
      </div>
      <Form :model="singleCheckpoint">
        <FormItem label="Standard Input">
          <Input autocomplete="off" type="textarea" v-model="singleCheckpoint.input" :rows="5"/>
        </FormItem>
        <FormItem label="Standard Output">
          <Input autocomplete="off" type="textarea" v-model="singleCheckpoint.output" :rows="5"/>
        </FormItem>
      </Form>
    </div>

    <div>
      <span class="subtitle">Batch Upload</span>
      <Upload
        multiple
        paste
        type="drag"
        accept=".in, .out"
        :format="['in', 'out']"
        :max-size="102400"
        :file-list.sync="fileList"
        ref="upload">
        <div style="padding: 20px 0">
          <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
          <p>Click or drag files here to upload</p>
          <p>Only .in and .out files are supported</p>
          <p>Each pair of checkpoints' filenames should match</p>
        </div>
      </Upload>
    </div>
  </div>
</template>

<script>
import api from '_u/api';
import Upload from '_c/upload/upload';
import { NEWLINE_CONVERT_INDEX, NEWLINE_CONVERT } from '_u/constants';

export default {
  name: 'CheckpointsUpload',
  components: { Upload },
  data: function () {
    return {
      singleCheckpoint: {
        input: '',
        output: ''
      },
      fileList: [],
      convertMode: NEWLINE_CONVERT_INDEX.DOS2UNIX,
      onUploading: false
    }
  },
  computed: {
    NEWLINE_CONVERT: () => NEWLINE_CONVERT
  },
  methods: {
    reset: function () {
      this.singleCheckpoint.input = '';
      this.singleCheckpoint.output = '';
      this.convertMode = NEWLINE_CONVERT_INDEX.DOS2UNIX;
      this.clearFiles();
    },
    clearFiles: function () {
      this.fileList = [];
      this.$refs.upload.clearFiles();
    },
    validFile: function () {
      if (this.fileList.length === 0) {
        this.$Message.warning('Select files');
        return false;
      }
      let totSize = 0;
      const fileMap = new Map();
      for (let i = 0; i < this.fileList.length; ++i) {
        const file = this.fileList[i].file;
        let name = file.name;
        if (name.endsWith('.in')) {
          name = name.slice(0, -3);
        } else if (name.endsWith('.out')) {
          name = name.slice(0, -4);
        } else {
          this.$Message.error('invalid: ' + name);
          return false;
        }
        totSize += file.size;
        fileMap.set(name, !fileMap.has(name));
      }
      const unmatch = [];
      fileMap.forEach((value, key) => {
        if (value) {
          unmatch.push(key);
        }
      });
      if (unmatch.length > 0) {
        unmatch.slice(0, Math.min(5, unmatch.length)).forEach(value => (this.$Message.error('file ' + value + ' does not match')));
        return false;
      }
      if (totSize > 200 * 1024 * 1024) {
        this.$Message.error('Too large: ' + totSize / 1024 + 'KB');
        return false;
      }
      return true;
    },
    onChangeConvertMode: function(name) {
      this.convertMode = name;
    },
    handleBatchSubmit: function(onSuccess, onFinally) {
      if (!this.validFile()) {
        onFinally();
        return false;
      }

      const form = new FormData();
      this.fileList.forEach(file => form.append('files', file.file));
      form.append('mode', this.convertMode);

      const loading = this.$Message.loading({
        content: `Uploading ${this.fileList.length} files`,
        duration: 0
      });
      api.uploadCheckpointFiles(form)
        .then(ret => {
          onSuccess(ret);
          this.$Message.success('Upload successfully');
          this.reset();
        }).catch(err => {
          this.$Message.error(err);
        }).finally(() => {
          loading();
          onFinally();
        });
    },
    handleSingleSubmit: function (onSuccess, onFinally) {
      const loading = this.$Message.loading({
        content: 'Uploading',
        duration: 0
      });
      api.uploadSingleCheckpoint({
        ...this.singleCheckpoint,
        mode: this.convertMode
      }).then(ret => {
        this.$Message.success(`Upload successfully: ${ret.checkpointId}`);
        onSuccess([ret]);
        this.reset();
      }).catch(err => {
        this.$Message.error(err);
      }).finally(() => {
        loading();
        onFinally();
      });
    },
    save: function (onSuccess, onFinally) {
      if (this.singleCheckpoint.input !== '' || this.singleCheckpoint.output !== '') {
        this.handleSingleSubmit(onSuccess, onFinally);
      } else {
        this.handleBatchSubmit(onSuccess, onFinally);
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .autowrap {
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
  }

  .subtitle {
    font-size: 15px;
    font-weight: bold;
  }

  .list_div {
    padding: 11px;
    background-color: white;
    margin-top: 15px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  }
</style>
