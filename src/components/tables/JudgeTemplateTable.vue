<!--
   Copyright 2020-2022 the original author or authors.

   Licensed under the Affero General Public License, Version 3.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

        https://www.gnu.org/licenses/agpl-3.0.en.html
 -->

<template>
  <div>
    <Table
      :columns="judgeTemplateColumns"
      :data="judgeTemplateData"
      :loading="tableLoading"
      class="content-table"
      @on-selection-change="selectChange">
      <template slot-scope="{ row }" slot="type">
        <Tag :color="row.type | judgeTemplateTypeClass">{{ row.type | judgeTemplateTypeName }}</Tag>
      </template>
      <template slot-scope="{ row }" slot="create-time">
        <Time slot="extra" :time="row.gmtCreate | parseInt" type="datetime"/>
      </template>
      <template slot-scope="{ row }" slot="update-time">
        <Time slot="extra" :time="row.gmtModified | parseInt" type="datetime"/>
      </template>
      <template slot-scope="{ row }" slot="action">
        <span class="clickable" @click="onEditJudgeTemplate(row, false)">Edit</span>
        <Divider type="vertical" />
        <span class="clickable" @click="onEditJudgeTemplate(row, true)">Fork</span>
      </template>
    </Table>

    <!-- 评测模板修改框 -->
    <Modal
      v-model="jtModal"
      width="50%"
      :loading="jtModalLoading"
      :mask-closable="false"
      :title="isAddJT ? 'Add Judge Template' : `Template #${judgeTemplate.id}`"
      @on-ok="onUpdateJudgeTemplate">
      <Form ref="judgeTemplate" :model="judgeTemplate" label-position="top">
        <FormItem label="Title" prop="title" required>
          <Input v-model="judgeTemplate.title" />
        </FormItem>
        <FormItem label="Comment">
          <Input v-model="judgeTemplate.comment" />
        </FormItem>
        <FormItem label="File Extensions" prop="acceptFileExtensions" required>
          <Select
            v-model="judgeTemplate.acceptFileExtensions"
            filterable
            multiple
            allow-create
            @on-create="handleCreateExtension">
            <Option v-for="item in fileExtensionList" :value="item" :key="item">{{ item }}</Option>
          </Select>
        </FormItem>
        <FormItem label="Script" prop="shellScript" required>
            <CodeEditor ref="CodeEditor" :mode="judgeTemplate.type === JUDGE_TEMPLATE_TYPE.ADVANCED ? 'shell' : 'application/json'" :code.sync="judgeTemplate.shellScript" />
        </FormItem>
        <FormItem>
          <div slot="label">
            <span>ZIP</span>
            <Divider type="vertical" />
            <Tooltip content="Download" placement="right" v-if="!!judgeTemplate.zipFileId" >
              <Tag class="hover" closable @on-close="judgeTemplate.zipFileId=''" @click.native="handleDownload(judgeTemplate.zipFileId)">
                {{ judgeTemplate.zipFileId }}
              </Tag>
            </Tooltip>
            <span class="clickable" style="margin-left: 5px" v-if="fileList.length > 0" @click="clearFileList">Clear</span>
          </div>
          <Upload
            paste
            type="drag"
            accept=".zip"
            :format="['zip']"
            :file-list.sync="fileList"
            ref="upload">
            <div style="padding: 20px 0">
              <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
              <strong>Only support .zip</strong>
              <p>Click or drag files here to upload</p>
            </div>
          </Upload>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import { JUDGE_TEMPLATE_PROPERTY, JUDGE_TEMPLATE_TYPE } from '_u/constants';
import api from '_u/api';
import CodeEditor from '_c/editor/CodeEditor';
import Upload from '_c/upload/upload';

const originalColumns = [
  { type: 'selection', width: 60, align: 'center', title: 'Selection' },
  { key: 'id', title: '#', maxWidth: 80 },
  { title: 'Type', slot: 'type' },
  { title: 'Owner', key: 'username' },
  { title: 'Title', key: 'title' },
  { title: 'Comment', key: 'comment' },
  { title: 'Remote OJ', key: 'remoteOj' },
  { title: 'Create', slot: 'create-time', minWidth: 50 },
  { title: 'Update', slot: 'update-time', minWidth: 50 },
  { title: 'Actions', slot: 'action' }
];

export default {
  name: 'JudgeTemplateTable',
  components: {
    CodeEditor,
    Upload
  },
  data: function() {
    return {
      judgeTemplateColumns: originalColumns,
      judgeTemplateData: [],
      isAddJT: false,
      jtModal: false,
      jtModalLoading: true,
      judgeTemplate: {},
      fileList: [],
      fileExtensionList: [],
      tableLoading: false,
      callbacks: {}
    }
  },
  filters: {
    parseInt: (val) => parseInt(val),
    judgeTemplateTypeClass: type => {
      return JUDGE_TEMPLATE_PROPERTY[type].color;
    },
    judgeTemplateTypeName: type => {
      return JUDGE_TEMPLATE_PROPERTY[type].name;
    }
  },
  methods: {
    setJudgeTemplates: function(data) {
      this.judgeTemplateData = data;
    },
    setColumns: function(columnTitles) {
      if (!columnTitles) {
        this.judgeTemplateColumns = originalColumns;
        return;
      }
      this.judgeTemplateColumns = [];
      originalColumns.forEach(o => {
        if (columnTitles.includes(o.title)) {
          this.judgeTemplateColumns.push(o);
        }
      });
    },
    createJudgeTemplate: function(type, problemCode) {
      this.judgeTemplate = {
        title: '',
        comment: '',
        type,
        shellScript: '',
        acceptFileExtensions: [],
        zipFileId: '',
        problemCode
      };
      this.fileExtensionList = [];
      this.isAddJT = true;
      this.jtModal = true;
    },
    on: function (event, callback) {
      const old = this.callbacks[event];
      this.callbacks[event] = callback;
      return old;
    },
    // 表格全选
    selectChange: function (selection) {
      this.callbacks['on-selection'] && this.callbacks['on-selection'](selection);
    },
    clearFileList: function() {
      this.fileList = [];
      this.$refs.upload.clearFiles()
    },
    handleCreateExtension: function(val) {
      this.judgeTemplate.acceptFileExtensions.push(val);
    },
    handleDownload: function(zipFileId) {
      api.download(zipFileId)
        .then(_ => {
          this.callbacks['after-donwload']  && this.callbacks['after-download']();
        })
        .catch(err => {
          this.$Message.error(err.message);
        });
    },
    onUpdateJudgeTemplate: function() {
      this.$refs.judgeTemplate.validate(async valid => {
        if (valid) {
          const removeLoading = this.$Message.loading({
            content: 'Uploading',
            duration: 0
          });

          // check md5
          if (this.fileList.length > 0) {
            const file = this.fileList[0];
            let ret = await api.checkMD5(file.md5);
            if (ret) {
              this.judgeTemplate.zipFileId = ret.id;
            } else {
              const form = new FormData();
              form.append('files', file.file)
              ret = await api.multiUpload(form);
              this.judgeTemplate.zipFileId = ret[0].id;
            }
            this.clearFileList();
          }

          if (this.isAddJT) {
            api.createTemplate(this.judgeTemplate)
              .then(_ => {
                this.callbacks['after-update'] && this.callbacks['after-update']();
                this.jtModal = false;
                this.$Message.success('Success');
              }).catch(_ => {
                this.jtModalLoading = false;
                this.$nextTick(() => {
                  this.jtModalLoading = true;
                })
              }).finally(() => {
                removeLoading();
              });
          } else {
            api.updateTemplate({
              id: this.judgeTemplate.id,
              type: this.judgeTemplate.type,
              title: this.judgeTemplate.title,
              shellScript: this.judgeTemplate.shellScript,
              zipFileId: this.judgeTemplate.zipFileId || '',
              acceptFileExtensions: this.judgeTemplate.acceptFileExtensions,
              comment: this.judgeTemplate.comment
            }).then(_ => {
              this.$Message.success('Updated');
              this.callbacks['after-update'] && this.callbacks['after-update']();
              this.jtModal = false;
            }).catch(_ => {
              this.jtModalLoading = false;
              this.$nextTick(() => {
                this.jtModalLoading = true;
              })
            }).finally(() => {
              removeLoading();
            });
          }
        } else {
          this.$Message.error('Invalid format');
          this.jtModalLoading = false;
          this.$nextTick(() => {
            this.jtModalLoading = true;
          })
        }
      })
    },
    onEditJudgeTemplate: function (row, isFork) {
      const removeLoading = this.$Message.loading({
        content: 'Loading',
        duration: 0
      });
      api.getOneTemplate(row.id).then(ret => {
        this.judgeTemplate = ret;
        this.fileExtensionList = this.judgeTemplate.acceptFileExtensions;
        this.isAddJT = isFork;
        this.jtModal = true;
      }).catch(err => {
        this.$Message.error(err.message);
      }).finally(() => {
        removeLoading();
      });
    }
  },
  computed: {
    JUDGE_TEMPLATE_TYPE: () => JUDGE_TEMPLATE_TYPE
  },
  watch: {
    jtModal: function(status) {
      if (status) {
        this.$refs.CodeEditor.refresh();
      }
    }
  }
}
</script>

<style scoped>

</style>
