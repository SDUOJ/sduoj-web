<!--
   Copyright 2020-2022 the original author or authors.

   Licensed under the Affero General Public License, Version 3.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

        https://www.gnu.org/licenses/agpl-3.0.en.html
 -->

<template>
   <div class="clearfix">
     <Table
       disabled-hover
       :columns="descriptionColumns"
       :data="descriptions">
       <template slot-scope="{ row }" slot="title">
         <Input
           ref="titleInput"
           v-if="row.isSelected"
           v-model="row.title"
           @on-focus="row.oldTitle = row.title"
           @on-blur="updateDescriptionTitle(row)"
           @keydown.enter.native="row.isSelected = !row.isSelected"
           v-focus />
         <span v-else @click="row.isSelected = !row.isSelected" class="editable">{{ row.title }}</span>
       </template>
       <template slot-scope="{ row }" slot="public">
         <i-switch
           v-model="row.isPublic"
           :true-value="1" :false-value="0"
           @mousedown.native="onMousedown(row.id, row.isPublic)"
           :before-change="updateDescriptionVisibility" />
       </template>
       <template slot-scope="{ row }" slot="default">
         <i-switch
           true-color="#19be6b"
           :value="row.id === problem.defaultDescriptionId"
           @mousedown.native="onMousedown(row.id)"
           :before-change="updateDefaultDescription" />
       </template>
       <template slot-scope="{ row }" slot="action">
         <span class="clickable" @click="onEditDescription(row)">Edit</span>
         <Divider type="vertical" />
         <span class="clickable" @click="onDeleteDescription(row)">Delete</span>
       </template>
     </Table>
     <div class="footer-tools">
       <Button type="primary" size="small" class="float-right footer-btn" @click="onAddDescription" :loading="addLoading">Add</Button>
     </div>

     <Modal
      v-model="contentModal"
      width="80%"
      :mask-closable="false"
      :loading="modalLoading"
      :title="curDescription.title"
      @on-ok="updateDescriptionContent"
      @on-cancel="closeContestModal">
         <MarkdownEditor ref="md" />
     </Modal>
   </div>
</template>

<script>
import api from '_u/api';

import MarkdownEditor from '_c/editor/MarkdownEditor';

export default {
  name: 'ProblemDescription',
  components: { MarkdownEditor },
  directives: {
    focus: {
      inserted: function (el) {
        el.querySelector('input').focus();
      }
    }
  },
  data: function() {
    return {
      descriptionColumns: [
        { key: 'id', maxWidth: 200 },
        { title: 'Title', slot: 'title' },
        { title: 'Public', slot: 'public' },
        { title: 'Default', slot: 'default' },
        { title: 'Votes', key: 'voteNum' },
        { title: 'Owner', key: 'username' },
        { title: 'Actions', slot: 'action' }
      ],
      selectedDescriptions: [],
      descriptions: [],
      curDescription: {
        id: '',
        markdownDescription: ''
      },
      problem: {},
      modalLoading: true,
      addLoading: false,
      contentModal: false
    }
  },
  methods: {
    onAddDescription: function() {
      // 初始化描述内容为空
      this.addLoading = true;
      const problemCode = this.problem.problemCode;
      api.createDescription({
        problemCode,
        title: this.descriptions.length === 0 ? 'Default' : `New ${this.descriptions.length}`,
        markdownDescription: ''
      }).then(async (ret) => {
        if (this.descriptions.length === 0) {
          this.curDescription.id = ret;
          this.getProblemDescriptions(problemCode).catch(err => {
            this.$Message.error(err.message);
          });
          try {
            await this.updateDefaultDescription(false, false);
            await this.updateDescriptionVisibility(false, false);
          } catch (err) {
            this.$Message.error(err.message);
          }
        }
        this.$Message.success('Success');
        this.getProblemDescriptions(problemCode).catch(err => {
          this.$Message.error(err.message);
        });
      }, err => {
        this.$Message.error(err.message);
      }).finally(() => {
        this.addLoading = false;
      });
    },
    onDeleteDescription: function(description) {
      this.$Modal.confirm({
        title: 'Confirm',
        content: `Delete #${description.id}-${description.title}?`,
        loading: true,
        onOk: () => {
          api.deleteDescription({
            id: description.id
          }).then(_ => {
            this.$Message.success('Deleted');
            this.getProblemDescriptions(this.problem.problemCode).catch(err => {
              this.$Message.error(err.message);
            });
          }).catch(err => {
            this.$Message.error(err.message);
          }).finally(() => {
            this.$Modal.remove();
          });
        }
      });
    },
    onMousedown: function(id, isPublic) {
      this.curDescription.id = id;
      if (isPublic !== undefined) {
        this.curDescription.isPublic = isPublic === 1 ? 0 : 1;
      }
    },
    updateDescriptionContent: function() {
      this.curDescription.markdownDescription = this.$refs.md.getMarkdown();
      api.updateDescription({
        id: this.curDescription.id,
        markdownDescription: this.curDescription.markdownDescription
      }).then(_ => {
        this.$Message.success('Success');
        this.contentModal = false;
        this.clear();
      }).catch(err => {
        this.$Message.error(err.message);
        this.modalLoading = false;
        this.$nextTick(() => {
          this.modalLoading = true;
        });
      });
    },
    updateDescriptionTitle: function(row) {
      row.isSelected = !row.isSelected;
      if (row.title !== row.oldTitle) {
        api.updateDescription({
          id: row.id,
          title: row.title
        }).then(_ => {
          this.$Message.success('Success');
        }, err => {
          this.$Message.error(err.message);
        });
      }
    },
    updateDescriptionVisibility: function(showSuccess = true, showError = true) {
      return new Promise((resolve, reject) => {
        api.updateDescription({
          id: this.curDescription.id,
          isPublic: this.curDescription.isPublic
        }).then(_ => {
          resolve(_);
          if (showSuccess) this.$Message.success('Success');
        }, err => {
          reject(err);
          if (showError) this.$Message.error(err.message);
        });
      });
    },
    updateDefaultDescription: function(showSuccess = true, showError = true) {
      return new Promise((resolve, reject) => {
        if (this.problem.defaultDescriptionId === this.curDescription.id) {
          const err = {
            message: 'Must have one default description'
          };
          // reject(err);
          if (showError)  this.$Message.error(err.message);
          return;
        }
        api.updateProblemInfo({
          problemCode: this.problem.problemCode,
          defaultDescriptionId: this.curDescription.id
        }).then(_ => {
          resolve(_);
          if (showSuccess) this.$Message.success('Success');
          this.$nextTick(() => {
            this.problem.defaultDescriptionId = this.curDescription.id;
          });
        }).catch(err => {
          reject(err);
          if (showError) this.$Message.error(err.message);
        });
      });
    },
    onEditDescription: function(row) {
      const removeLoading = this.$Message.loading({
        content: 'Loading',
        duration: 0
      });
      api.getProblemDescription({
        descriptionId: row.id
      }).then(ret => {
        this.curDescription = ret;
        this.$refs.md.setMarkdown(this.curDescription.markdownDescription);
        this.contentModal = true;
      }).catch(err => {
        this.$Message.error(err.message);
      }).finally(() => {
        removeLoading();
      });
    },
    getProblemDescriptions: function(problemCode) {
      return new Promise((resolve, reject) => {
        api.getProblemDescriptionList({ problemCode })
          .then(ret => {
            this.descriptions = ret.map(o => {
              return { ...o, isSelected: false }
            });
            resolve(ret);
          }).catch(reject);
      });
    },
    query: function(problem) {
      this.problem = problem;
      return this.getProblemDescriptions(problem.problemCode);
    },
    clear: function() {
      this.$refs.md.$clear();
    },
    closeContestModal: function() {
      this.clear();
      this.contentModal = false;
    }
  }
}
</script>

<style lang="less" scoped>
  .editable:hover {
    cursor: pointer;
    border: #ccc 1px solid;
    border-radius: 2px;
  }
</style>
