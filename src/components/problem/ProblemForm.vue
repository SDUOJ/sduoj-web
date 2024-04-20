<!--
   Copyright 2020-2022 the original author or authors.

   Licensed under the Affero General Public License, Version 3.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

        https://www.gnu.org/licenses/agpl-3.0.en.html
 -->

<template>
  <div>
    <Form :model="problem" :rules="problemColumnRules" ref="problem" label-position="top">
      <Tabs v-model="tabName" :animated="false" @on-click="openTabs">
        <TabPane :label="tabLabels.basic" :name="tabLabels.basic">
          <FormItem label="Title" prop="problemTitle">
            <Input v-model="problem.problemTitle" />
          </FormItem>
          <FormItem label="Public" required>
            <i-switch v-model="problem.isPublic" :true-value="1" :false-value="0" />
          </FormItem>
          <FormItem label="Time Limit" required>
            <Input v-model.number="problem.timeLimit">
              <span slot="append">ms</span>
            </Input>
          </FormItem>
          <FormItem label="Memory Limit" required>
            <Input v-model.number="problem.memoryLimit">
              <span slot="append">KiB</span>
            </Input>
          </FormItem>
          <FormItem label="Output Limit" required>
            <Input v-model.number="problem.outputLimit">
              <span slot="append">KiB</span>
            </Input>
          </FormItem>
          <!--        tag 暂不可用-->
          <!--        <FormItem label="Tags">-->

          <!--        </FormItem>-->
          <FormItem label="Manager Groups">
            <Select
              transfer
              multiple
              filterable
              v-model="problem.managerGroups"
              :loading="groupQueryLoading"
              :remote-method="queryGroups"
              :default-label="(problem.managerGroupDTOList || []).map(o => `${o.groupId}: ${o.title}`)"
              @on-set-default-options="setGroupSet">
              <Option v-for="group in groupSet" :key="group.groupId" :value="group.groupId" :label="`${group.groupId}: ${group.title}`" />
            </Select>
          </FormItem>
          <FormItem label="Source">
            <Input v-model="problem.source" />
          </FormItem>
        </TabPane>
        <TabPane :label="tabLabels.jt" :name="tabLabels.jt">
          <FormItem label="Type" required>
            <RadioGroup v-model="jtType">
              <Radio :label="JUDGE_TEMPLATE_TYPE.IO">{{ JUDGE_TEMPLATE_PROPERTY[JUDGE_TEMPLATE_TYPE.IO].name }}</Radio>
              <Radio :label="JUDGE_TEMPLATE_TYPE.ADVANCED">{{ JUDGE_TEMPLATE_PROPERTY[JUDGE_TEMPLATE_TYPE.ADVANCED].name }}</Radio>
            </RadioGroup>
          </FormItem>
          <div v-if="jtType === JUDGE_TEMPLATE_TYPE.IO">
            <FormItem label="Judge Template" required>
              <Select
                transfer
                multiple
                filterable
                v-model="ioJudgeTemplates"
                v-if="problemReady"
                :loading="judgeTemplateQueryLoading">
                <Option v-for="template in judgeTemplateSet" :key="template.id"
                        :value="template.id" :label="template.description">
                  <span>{{ template.description }}</span>
                  <span style="color: #ccc"> {{ template.comment }}</span>
                  <span style="float: right;color: #ccc; margin-right: 20px">{{ template.type }}</span>
                </Option>
              </Select>
            </FormItem>
            <FormItem label="Checker" required>
              <Select v-model="checker" transfer >
                <Option value="custom">Customized Checker</Option>
                <Option v-for="ch in PREDEFINED_CHECKERS" :value="ch.name" :key="ch.name">
                  {{ `${ch.name} - ${ch.description}` }}
                </Option>
              </Select>
            </FormItem>
            <div v-if="checker === 'custom'">
              <FormItem label="Source Code" required>
                <div>
                  <CodeEditor ref="CodeEditor-source" mode="cpp" :code.sync="checkerCode" />
                </div>
              </FormItem>
              <FormItem label="Config" required>
                <div>
                  <CodeEditor ref="CodeEditor-config" mode="json" :code.sync="checkerConfig" />
                </div>
              </FormItem>
            </div>
          </div>
          <div v-else-if="jtType === JUDGE_TEMPLATE_TYPE.ADVANCED">
            <JudgeTemplateTable ref="JudgeTemplateTable" />
            <div class="footer-tools">
              <Button type="default" size="small" class="float-left footer-btn" @click="createJudgeTemplate">Add</Button>
            </div>
          </div>
        </TabPane>
        <TabPane :label="tabLabels.ft" :name="tabLabels.ft">
          <FormItem label="Select one Judge Template">
            <Select
              transfer
              style="width: 40%; margin-right: 5px;"
              v-model="selectedJT"
              :loading="judgeTemplateQueryLoading">
              <Option v-for="template in selectableJudgeTemplateSet" :key="template.id"
                      :value="template.id" :label="template.description">
                <span>{{ template.description }}</span>
                <span style="color: #ccc"> {{ template.comment }}</span>
                <span style="float: right;color: #ccc; margin-right: 20px">{{ template.type }}</span>
              </Option>
            </Select>
            <Button type="primary" @click="addFunctionTemplate">Select</Button>
          </FormItem>
          <Collapse accordion @on-change="openCollapse">
            <Panel v-for="ft in functionTemplates" :key="ft.judgeTemplateId"
                   :name="ft.judgeTemplateId">
              <span>{{ judgeTemplateSetMap[ft.judgeTemplateId].description }}</span>
              <div slot="content">
                <FormItem>
                  <Checkbox v-model="ft.isShowFunctionTemplate"
                            :true-value="1" :false-value="0">Show Function Template</Checkbox>
                </FormItem>
                <FormItem label="Template Code">
                  <div class="limit">
                    <CodeEditor ref="CodeEditor-func" mode="text" :code.sync="ft.functionTemplate" />
                  </div>
                </FormItem>
                <FormItem label="Initial Code">
                  <div class="limit">
                    <CodeEditor ref="CodeEditor-init" mode="text" :code.sync="ft.initialTemplate" />
                  </div>
                </FormItem>
              </div>
            </Panel>
          </Collapse>
        </TabPane>
      </Tabs>
    </Form>
  </div>
</template>

<script>
import CodeEditor from '_c/editor/CodeEditor';
import JudgeTemplateTable from '_c/tables/JudgeTemplateTable';
import api from '_u/api';
import { JUDGE_TEMPLATE_PROPERTY, JUDGE_TEMPLATE_TYPE, PREDEFINED_CHECKERS } from '_u/constants';

export default {
  name: 'ProblemForm',
  components: {
    CodeEditor,
    JudgeTemplateTable
  },
  data: function() {
    return {
      problemColumnRules: {
        problemTitle: [{ required: true, max: 96, trigger: 'blur' }]
      },
      problem: {},
      groupSet: [],
      groupQueryLoading: false,
      jtType: 0,
      checker: PREDEFINED_CHECKERS[0].name,
      checkerCode: '',
      checkerConfig: '',
      ioJudgeTemplates: [],
      adJudgeTemplates: [],
      judgeTemplateSet: [],
      judgeTemplateSetMap: {},
      selectedJT: undefined,
      ioFunctionTemplates: [],
      adFunctionTemplates: [],
      judgeTemplateQueryLoading: false,
      tabName: 'basic',
      problemReady: false
    }
  },
  computed: {
    JUDGE_TEMPLATE_TYPE: () => JUDGE_TEMPLATE_TYPE,
    JUDGE_TEMPLATE_PROPERTY: () => JUDGE_TEMPLATE_PROPERTY,
    PREDEFINED_CHECKERS: () => PREDEFINED_CHECKERS,
    tabLabels: function () {
      const labels = {
        basic: 'Basic',
        jt: 'Judge Templates',
        ft: 'Function Templates'
      }
      return  labels;
    },
    functionTemplates: function () {
      return this.jtType === JUDGE_TEMPLATE_TYPE.IO ? this.ioFunctionTemplates : this.adFunctionTemplates;
    },
    selectableJudgeTemplateSet: function () {
      if (!this.problemReady) return [];
      const selectedJudgeTemplateSet = this.functionTemplates.map(o => o.judgeTemplateId);
      const selectableJudgeTemplateSet = [];
      this.judgeTemplateSet.forEach(o => {
        if (!selectedJudgeTemplateSet.includes(o.id)) {
          selectableJudgeTemplateSet.push(o);
        }
      });
      return selectableJudgeTemplateSet;
    }
  },
  methods: {
    setProblem: function (problem) {
      if (this.problem.problemCode !== problem.problemCode) {
        this.tabName = this.tabLabels.basic;
      }

      this.problem = problem;
      this.selectedJT = '';

      this.queryJudgeTemplateList(ret => {
        this.ioJudgeTemplates = [];
        this.adJudgeTemplates = [];
        this.ioFunctionTemplates = [];
        this.adFunctionTemplates = [];
        if (problem.judgeTemplateListDTOList && problem.judgeTemplateListDTOList.length > 0) {
          this.jtType = problem.judgeTemplateListDTOList[0].type;
          if (this.jtType === JUDGE_TEMPLATE_TYPE.IO) {
            problem.judgeTemplates.forEach(o => {
              this.ioJudgeTemplates.push(o);
            });
            problem.functionTemplates.forEach(o => {
              this.ioFunctionTemplates.push(o);
            });
          } else {
            problem.judgeTemplates.forEach(o => {
              this.adJudgeTemplates.push(o);
            });
            problem.functionTemplates.forEach(o => {
              this.adFunctionTemplates.push(o);
            });
          }
        }

        if (problem.checkerConfig) {
          if (problem.checkerConfig.spj === null) {
            // predefined checker
            this.checker = problem.checkerConfig.source;
            this.checkerCode = '';
            this.checkerConfig = '';
          } else {
            // customized checker
            this.checker = 'custom';
            this.checkerCode = problem.checkerConfig.source;
            this.checkerConfig = JSON.stringify(JSON.parse(problem.checkerConfig.spj), null, 2);
          }
        }
        this.problemReady = true;
      });
    },
    queryJudgeTemplateList: function(callback) {
      this.judgeTemplateQueryLoading = true;
      api.getJudgeTemplateList({
        type: this.jtType,
        problemCode: this.problem.problemCode
      }).then(ret => {
        this.judgeTemplateQueryLoading = false;
        this.judgeTemplateSet = [];
        ret.forEach(o => {
          const target = {
            id: o.id,
            title: o.title,
            description: `${o.id}: ${o.title}`,
            comment: o.comment,
            type: JUDGE_TEMPLATE_PROPERTY[o.type].name
          };
          this.judgeTemplateSet.push(target);
          this.$set(this.judgeTemplateSetMap, o.id, target);
        });

        callback && callback(ret);

        if (this.jtType === JUDGE_TEMPLATE_TYPE.IO) {
        } else {
          ret.forEach(o => {
            if (this.adJudgeTemplates.includes(o.id)) {
              o._checked = true;  // 默认选中
            }
          });
          this.$nextTick(() => {
            this.$refs.JudgeTemplateTable.setJudgeTemplates(ret);
          });
        }
      }).catch(err => {
        this.$Message.error(err.message);
      });
    },
    queryGroups: function (title) {
      if (title !== '') {
        this.groupQueryLoading = true;
        api.queryGroupTitle({ title }).then(ret => {
          this.groupSet = ret;
          this.groupQueryLoading = false;
        }).catch(err => {
          this.$Message.error(err.message);
        })
      } else {
        this.groupSet = [];
      }
    },
    setGroupSet: function () {
      this.groupSet = this.problem.managerGroupDTOList;
    },
    save: function (apiName) {
      return new Promise((resolve, reject) => {
        this.$refs.problem.validate(valid => {
          if (!valid) {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject({ message: 'Invalid Form' });
            return;
          }
          const data = {
            problemCode: this.problem.problemCode,
            isPublic: this.problem.isPublic,
            problemTitle: this.problem.problemTitle,
            source: this.problem.source,
            judgeTemplates: this.jtType === JUDGE_TEMPLATE_TYPE.IO ? this.ioJudgeTemplates : this.adJudgeTemplates,
            managerGroups: this.problem.managerGroups,
            memoryLimit: parseInt(this.problem.memoryLimit),
            outputLimit: parseInt(this.problem.outputLimit),
            timeLimit: parseInt(this.problem.timeLimit),
            functionTemplates: this.functionTemplates
          };

          if (this.jtType === JUDGE_TEMPLATE_TYPE.IO) {
            if (this.checker === 'custom') {
              data.checkerConfig = {
                source: this.checkerCode,
                spj: this.checkerConfig
              };
            } else {
              data.checkerConfig = {
                source: this.checker,
                spj: null
              };
            }
          }

          api[apiName](data).then(resolve).catch(reject);
        });
      });
    },
    createJudgeTemplate: function () {
      this.$refs.JudgeTemplateTable.createJudgeTemplate(JUDGE_TEMPLATE_TYPE.ADVANCED, this.problem.problemCode);
    },
    addFunctionTemplate: function () {
      if (this.selectedJT) {
        this.functionTemplates.push({
          judgeTemplateId: this.selectedJT,
          isShowFunctionTemplate: 1,
          functionTemplate: '',
          initialTemplate: ''
        });
        this.selectedJT = undefined;
      }
    },
    refreshAllEditors: function() {
      const editorFuncName = 'CodeEditor-func';
      const editorInitName = 'CodeEditor-init';
      this.$refs[editorFuncName] && this.$refs[editorFuncName].forEach(o => {
        o && o.refresh();
      });
      this.$refs[editorInitName] && this.$refs[editorInitName].forEach(o => {
        o && o.refresh();
      });
      this.$refs['CodeEditor-source'] && this.$refs['CodeEditor-source'].refresh();
      this.$refs['CodeEditor-config'] && this.$refs['CodeEditor-config'].refresh();
    },
    openCollapse: function() {
      this.refreshAllEditors();
    },
    openTabs: function(name) {
      switch (name) {
        case this.tabLabels.basic:
          break;
        case this.tabLabels.jt:
          this.refreshAllEditors();
          break;
        case this.tabLabels.ft:
          this.refreshAllEditors();
          break;
      };
    }
  },
  watch: {
    jtType: function (type) {
      switch (type) {
        case JUDGE_TEMPLATE_TYPE.IO:
          // 刷新 Select 下拉框
          this.problemReady = false;
          this.queryJudgeTemplateList(() => {
            this.problemReady = true;
          });
          break;
        case JUDGE_TEMPLATE_TYPE.ADVANCED:
          this.queryJudgeTemplateList(() => {
            this.$refs.JudgeTemplateTable.on('after-update', this.queryJudgeTemplateList);
            this.$refs.JudgeTemplateTable.on('on-selection', selection => {
              this.adJudgeTemplates = selection.map(o => o.id);
            });
            this.$refs.JudgeTemplateTable.setColumns(['Selection', '#', 'Title', 'Comment', 'Actions']);
          });
          break;
        default:
          break;
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
</style>
