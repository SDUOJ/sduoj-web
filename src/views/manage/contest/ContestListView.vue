<!--
   Copyright 2020-2022 the original author or authors.

   Licensed under the Affero General Public License, Version 3.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

        https://www.gnu.org/licenses/agpl-3.0.en.html
 -->

<template>
  <div>
    <Card :dis-hover="true">
      <p slot="title">Contest</p>
      <Table
        :columns="contestColumns"
        :data="contests"
        :loading="tableLoading"
        class="content-table"
        @on-selection-change="onSelect"
        @on-sort-change="onSort">
        <template slot-scope="{ row }" slot="title">
          <span>{{ row.contestTitle }}</span>
          <Icon v-if="row.features.openness === CONTEST_OPENNESS.PRIVATE.title"
                :color="CONTEST_OPENNESS.PRIVATE.lockColor"
                type="md-lock"
                size="19" />
          <Icon v-else-if="row.features.openness === CONTEST_OPENNESS.PROTECTED"
                :color="CONTEST_OPENNESS.PROTECTED.lockColor"
                type="md-lock"
                size="19" />
          <Tag v-if="row.isPublic === 0" style="margin-left: 5px" color="volcano">Private</Tag>
        </template>
        <template slot-scope="{ row }" slot="time">
          <Time :time="row.gmtStart | parseInt" type="datetime" />
        </template>
        <template slot-scope="{ row }" slot="duration">
          <span>{{ row.gmtStart | getDuration(row.gmtEnd) }}</span>
        </template>
        <template slot-scope="{ row }" slot="mode">
          <span>{{ row.features.mode.toUpperCase() }}</span>
        </template>
        <template slot-scope="{ row }" slot="group">
          <span v-if="row.managerGroupDTO">{{ `${row.managerGroupDTO.groupId} (${row.managerGroupDTO.title})` }}</span>
        </template>
        <template slot-scope="{ row }" slot="action">
          <a href="#" @click.prevent="onEditContest(row.contestId, false)">Edit</a>
          <Divider type="vertical" />
          <a href="#" @click.prevent="onEditContest(row.contestId, true)">Fork</a>
        </template>
      </Table>
    </Card>
    <div class="footer-tools">
      <Button type="default" size="small" class="footer-btn float-left" @click="onAddContest">Add</Button>
      <Page
        class="float-right"
        size="small" show-elevator show-sizer
        :total="total"
        :current.sync="pageNow"
        :page-size="pageSize"
        :page-size-opts="pageSizeOpts"
        @on-change="onPageChange"
        @on-page-size-change="onPageSizeChange"/>
    </div>

    <Modal
      v-model="contestModal"
      width="80%"
      :mask-closable="false"
      :loading="contestModalLoading"
      :title="isAddContest ? 'Add Contest' : `Edit Contest (Contest ID: ${contest.contestId})`"
      @on-ok="updateContest">
      <Form :model="contest">
        <Tabs v-model="tabName" :animated="false">
          <TabPane :label="tabLabels.basic" name="basic">
            <FormItem label="Title" prop="contestTitle" required>
              <Input v-model="contest.contestTitle" />
            </FormItem>
            <FormItem label="Mode" required>
              <RadioGroup v-model="contest.features.mode">
                <Radio v-for="mode in CONTEST_MODE" :key="mode" :label="mode">{{ mode.toUpperCase() }}</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="Public" required>
              <i-switch v-model="contest.isPublic" :true-value="1" :false-value="0" />
            </FormItem>
            <FormItem label="Openness" required>
              <Select v-model="contest.features.openness" :placeholder="contest.features.openness">
                <Option v-for="openness in CONTEST_OPENNESS" :key="openness.title" :value="openness.title">{{  openness.hint }}</Option>
              </Select>
            </FormItem>
            <FormItem label="Password" v-if="contest.features.openness !== CONTEST_OPENNESS.PUBLIC.title" required>
              <Input v-model="contest.password" />
            </FormItem>
            <Row>
              <Col span="10">
                <FormItem label="Start" required>
                  <DatePicker
                    transfer
                    style="width: 200px"
                    type="datetime"
                    format="yyyy-MM-dd HH:mm:ss"
                    @on-change="changeGmtStart"
                    :value="contest.gmtStart"
                    :disabled="!isAddContest && moment() > contest.gmtStart" />
                </FormItem>
              </Col>
              <Col span="14">
                <FormItem label="Duration" required>
                  <InputNumber v-model="gmtLength" :min="1" />
                </FormItem>
              </Col>
            </Row>
            <FormItem label="End" required>
              <DatePicker
                transfer
                style="width: 200px"
                type="datetime"
                format="yyyy-MM-dd HH:mm:ss"
                @on-change="changeGmtEnd"
                :value="contest.gmtEnd" />
            </FormItem>
            <FormItem label="Source" prop="source">
              <Input v-model="contest.source" />
            </FormItem>
            <FormItem label="Announcement">
              <MarkdownEditor ref="md" />
            </FormItem>
          </TabPane>
          <TabPane :label="tabLabels.manage" name="manage">
            <FormItem label="Frozen" required>
              <InputNumber v-model="contest.features.frozenTime" :min="0" />
            </FormItem>

            <FormItem label="While Running">
              <Checkbox v-model="contest.features.contestRunning.displayPeerSubmission" :true-value="1" :false-value="0">Show Peer Submission</Checkbox>
              <Checkbox v-model="contest.features.contestRunning.displayRank" :true-value="1" :false-value="0">Show Rank</Checkbox>
              <Checkbox v-model="contest.features.contestRunning.displayJudgeScore" :true-value="1" :false-value="0">Show Judge Score</Checkbox>
              <Checkbox v-model="contest.features.contestRunning.displayCheckpointResult" :true-value="1" :false-value="0">Show Checkpoint Results</Checkbox>
              <Checkbox v-model="contest.features.contestRunning.allowToSubmit" :true-value="1" :false-value="0">Allow to Submit</Checkbox>
            </FormItem>
            <FormItem label="After Finished">
              <Checkbox v-model="contest.features.contestEnd.displayPeerSubmission" :true-value="1" :false-value="0">Show Peer Submission</Checkbox>
              <Checkbox v-model="contest.features.contestEnd.displayRank" :true-value="1" :false-value="0">Show Rank</Checkbox>
              <Checkbox v-model="contest.features.contestEnd.displayJudgeScore" :true-value="1" :false-value="0">Show Judge Score</Checkbox>
              <Checkbox v-model="contest.features.contestEnd.displayCheckpointResult" :true-value="1" :false-value="0">Show Checkpoint Results</Checkbox>
              <Checkbox v-model="contest.features.contestEnd.allowToSubmit" :true-value="1" :false-value="0">Allow to Submit</Checkbox>
            </FormItem>

            <FormItem label="Participants">
              <span class="hint-text">Separate username by a TAB '\t', SPACE ' ', NEW LINE '\n' or COMMA ','</span>
              <Input v-model="contest.participants" type="textarea" :autosize="{minRows: 3}"/>
            </FormItem>

            <FormItem label="Unofficial Participants" prop="unofficialParticipants">
              <span class="hint-text">Separate username by a TAB '\t', SPACE ' ', NEW LINE '\n' or COMMA ','</span>
              <Input v-model="contest.unofficialParticipants" type="textarea" :autosize="{minRows: 3}"/>
            </FormItem>

            <FormItem label="Manager Group" v-if="contestModal">
              <Select
                transfer
                clearable
                filterable
                style="width: 200px"
                v-model="contest.groupId"
                :loading="managerGroupQueryLoading"
                :remote-method="queryManagerGroups"
                :label="contest.managerGroupDTO ? `${contest.managerGroupDTO.groupId}: ${contest.managerGroupDTO.title}` : ''">
                <Option v-for="group in managerGroupSet" :key="group.groupId" :value="group.groupId" :label="`${group.groupId}: ${group.title}`" />
              </Select>
            </FormItem>

            <FormItem label="Participating Groups" v-if="contestModal">
              <span class="hint-text">Members of these groups can participate contest without password</span>
              <Select
                transfer
                multiple
                filterable
                v-model="contest.participatingGroups"
                :loading="participatingGroupQueryLoading"
                :remote-method="queryParticipatingGroups"
                :default-label="(contest.participatingGroupDTOList || []).map(o => `${o.groupId}: ${o.title}`)"
                @on-set-default-options="setParticipatingGroupSet">
                <Option v-for="group in participatingGroupSet" :key="group.groupId" :value="group.groupId" :label="`${group.groupId}: ${group.title}`" />
              </Select>
            </FormItem>
          </TabPane>
          <TabPane :label="tabLabels.problem" name="problem">
            <FormItem prop="problems">
              <Table
                disabled-hover
                :max-height="600"
                :columns="problemColumns"
                :data="contest.problems"
                class="modal-form-problem">
                <template slot-scope="{ index }" slot="deleteProblem">
                  <span class="hover" @click="changeProblemIndex(index, 1)"><Icon type="md-arrow-down" /></span>
                  <span class="hover" @click="changeProblemIndex(index, -1)" style="margin: 0 5px"><Icon type="md-arrow-up" /></span>
                  <span class="hover" @click="deleteProblem(index)"><Icon type="md-remove" color="#CD6155" /></span>
                </template>
                <template slot-scope="{ index }" slot="index">
                  <span>{{ index | problemEncode }}</span>
                </template>
                <template slot-scope="{ row, index }" slot="problemCode">
                  <Input
                    v-model="row.problemCode"
                    @on-focus="row.oldProblemCode = row.problemCode"
                    @on-keypress.enter="updateProblem(row, index, 'problemCode')"
                    @on-blur="updateProblem(row, index, 'problemCode')" />
                </template>
                <template slot-scope="{ row, index }" slot="problemTitle">
                  <Input v-model="row.problemTitle" @on-change="updateProblem(row, index, 'problemTitle')" />
                </template>
                <template slot-scope="{ row, index }" slot="problemWeight">
                  <InputNumber v-model="row.problemWeight" :min="0" @on-change="updateProblem(row, index, 'problemWeight')" />
                </template>
                <template slot-scope="{ row, index }" slot="problemDescriptionId">
                  <div style="position: relative; top: 3px" v-if="row.$ready === CONTEST_PROBLEM_STATUS.INIT">
                    <Loading />
                  </div>
                  <Select v-else v-model="row.problemDescriptionId" transfer @on-change="updateProblem(row, index, 'problemDescriptionId')">
                    <Option v-for="desc in row.problemDescriptionList" :key="desc.id" :value="desc.id" :label="desc.title" />
                  </Select>
                </template>
                <template slot-scope="{ row, index }" slot="color">
                  <ColorPicker v-model="row.problemColor" transfer @on-change="updateProblem(row, index, 'problemColor')" />
                </template>
                <template slot-scope="{ row }" slot="check">
                  <div style="position: relative; top: 3px" v-if="row.$ready === CONTEST_PROBLEM_STATUS.INIT">
                    <Loading />
                  </div>
                  <Icon v-else-if="row.$ready === CONTEST_PROBLEM_STATUS.READY" type="md-checkmark" color="#50ad56" />
                  <Icon v-else type="md-close" color="#CD6155" />
                </template>
              </Table>
            </FormItem>
          </TabPane>
        </Tabs>
      </Form>
    </Modal>
  </div>
</template>

<script>
import moment from 'moment';
import { Page } from '_c/mixins';
import Loading from '_c/Loading';
import MarkdownEditor from '_c/editor/MarkdownEditor';

import api from '_u/api';
import { split } from '_u/split';
import { CONTEST_OPENNESS, CONTEST_MODE, CONTEST_PROBLEM_STATUS } from '_u/constants';

function $contestProblemIdEncode(problemCode) {
  problemCode = parseInt(problemCode);
  const str = [];
  do {
    const ch = problemCode % 26;
    if (str.length === 0) {
      str.push(String.fromCharCode(65 + ch));
    } else {
      str.push(String.fromCharCode(64 + ch));
    }
    problemCode = parseInt(problemCode / 26);
  } while (problemCode > 0)
  return str.reverse().join('');
}

export default {
  name: 'ContestListView',
  mixins: [Page],
  components: { Loading, MarkdownEditor },
  data: function () {
    return {
      contestColumns: [
        // { type: 'selection', width: 60, align: 'center' },
        { key: 'contestId', maxWidth: 80 },
        { title: 'Title', slot: 'title', minWidth: 150 },
        { title: 'Start', key: 'gmtStart', sortable: 'custom', width: 200, slot: 'time' },
        { title: 'Duration', sortable: 'custom', slot: 'duration' },
        { title: 'Mode', key: 'mode', sortable: 'custom', slot: 'mode' },
        { title: 'Participants', key: 'participantNum', width: 140, sortable: 'custom' },
        { title: 'Manager Group', slot: 'group', minWidth: 100 },
        { title: 'Owner', key: 'username' },
        { title: 'Actions', slot: 'action' }
      ],
      problemColumns: [
        {
          title: '\b',
          width: 100,
          align: 'right',
          slot: 'deleteProblem',
          renderHeader: h =>
            h('Icon', {
              class: 'hover',
              props: { type: 'md-add', color: 'green' },
              on: { click: this.addProblem }
            })
        },
        { width: 80, slot: 'index' },
        { title: 'Problem', minWidth: 150, slot: 'problemCode' },
        { title: 'Alias', minWidth: 150, slot: 'problemTitle' },
        { title: 'Description', minWidth: 150, slot: 'problemDescriptionId' },
        { title: 'Weight', width: 100, slot: 'problemWeight' },
        { title: 'Color', slot: 'color' },
        { title: '\b', width: 70, slot: 'check' }
      ],
      contests: [],
      contest: {
        features: {
          contestEnd: {},
          contestRunning: {}
        },
        groupId: '',
        problems: []
      },
      selectedContests: [],
      contestModal: false,
      contestModalLoading: true,
      tableLoading: false,
      isAddContest: false,
      tabErrors: {
        basic: false,
        manage: false,
        problem: true
      },
      tabName: 'basic',
      managerGroupQueryLoading: false,
      participatingGroupQueryLoading: false,
      managerGroupSet: [],
      participatingGroupSet: []
    }
  },
  filters: {
    // 格式化比赛进行时长
    getDuration: (start, end) => {
      const diff = parseInt(end) - parseInt(start);
      const duration = moment.duration(diff, 'milliseconds');
      const minutes = duration.minutes() < 10 ? '0' + duration.minutes() : duration.minutes().toString();
      const seconds = duration.seconds() < 10 ? '0' + duration.seconds() : duration.seconds().toString();
      return [Math.floor(duration.asHours()), minutes, seconds].join(':');
    },
    parseInt: val => parseInt(val),
    // 二十六进制转换
    problemEncode: problemCode => $contestProblemIdEncode(problemCode)
  },
  methods: {
    changeGmtStart: function (newDate) {
      this.contest.gmtStart = newDate;
      if (new Date(this.contest.gmtEnd) < new Date(newDate)) {
        this.contest.gmtEnd = newDate;
      }
    },
    changeGmtEnd: function (newDate) {
      this.contest.gmtEnd = newDate;
    },
    onSelect: function (selection) {
      this.selectedContests = selection;
    },
    openModal: function () {
      this.tabErrors.basic = false;
      this.tabErrors.manage = false;
      this.tabErrors.problem = false;
      this.tabName = 'basic';
      this.contestModal = true;
    },
    onAddContest: function () {
      const datetime = Math.ceil(new Date().getTime() / (10 * 60 * 1000)) * (10 * 60 * 1000);
      this.contest = {
        contestTitle: '',
        isPublic: 1,
        features: {
          mode: CONTEST_MODE.ACM,
          openness: CONTEST_OPENNESS.PUBLIC.title,
          frozenTime: 0,
          contestRunning: {
            displayPeerSubmission: 1,
            displayRank: 1,
            displayJudgeScore: 1,
            displayCheckpointResult: 1,
            allowToSubmit: 1
          },
          contestEnd: {
            displayPeerSubmission: 1,
            displayRank: 1,
            displayJudgeScore: 1,
            displayCheckpointResult: 1,
            allowToSubmit: 1
          }
        },
        managerGroupDTO: {},
        gmtStart: moment(datetime).format('yyyy-MM-DD HH:mm:ss'),
        gmtEnd: moment(datetime).format('yyyy-MM-DD HH:mm:ss'),
        source: '',
        markdownDescription: '',
        problems: [],
        participants: '',
        unofficialParticipants: '',
        password: '',
        participatingGroups: [],
        groupId: ''
      };
      this.$refs.md.setMarkdown('');
      this.isAddContest = true;
      this.openModal();
    },
    onEditContest: function (contestId, fork) {
      const removeLoading = this.$Message.loading({
        content: 'Loading',
        duration: 0
      });
      api.getContestManage({ contestId }).then(ret => {
        this.contest = ret;
        this.contest.gmtStart = new Date(parseInt(ret.gmtStart));
        this.contest.gmtEnd = new Date(parseInt(ret.gmtEnd));
        this.contest.participants = ret.participants.join(',');
        this.contest.unofficialParticipants = ret.unofficialParticipants.join(',');

        this.$refs.md.setMarkdown(this.contest.markdownDescription);

        this.contest.problems.forEach(o => {
          this.$set(o, '$ready', CONTEST_PROBLEM_STATUS.INIT);
          this.$set(o, 'problemDescriptionList', []);
          this.getProblemDescriptionList(o);
        });

        this.managerGroupSet = [];
        if (this.contest.managerGroupDTO) {
          this.managerGroupSet.push(this.contest.managerGroupDTO);
        }
        this.isAddContest = fork;
        this.openModal();
      }).catch(err => {
        this.$Message.error(err.message);
      }).finally(() => {
        removeLoading();
      });
    },
    changeProblemIndex: function (index, dir) {
      if ((index === 0 && dir === -1) ||
        (index === this.contest.problems.length - 1 && dir === 1)) return;
      const tmp = { ...this.contest.problems[index] };
      this.$set(this.contest.problems, index, this.contest.problems[index + dir]);
      this.$set(this.contest.problems, index + dir, tmp);
    },
    addProblem: function () {
      let problemCode = '';
      if (this.contest.problems.length > 0) {
        const tmp = this.contest.problems[this.contest.problems.length - 1].problemCode.split('-');
        if (tmp.length === 2) {
          tmp[1] = (parseInt(tmp[1]) + 1).toString();
        }
        problemCode = tmp.join('-');
      }
      const newProblem = {
        problemCode,
        problemTitle: '',
        problemWeight: 1,
        problemSearch: 0,
        problemDescriptionId: '',
        problemDescriptionList: [],
        problemColor: '',
        oldProblemCode: '',
        $ready: CONTEST_PROBLEM_STATUS.INIT
      };
      const index = this.contest.problems.length;
      this.contest.problems.push(newProblem);
      this.updateProblem(newProblem, index, 'problemCode');
    },
    deleteProblem: function (index) {
      this.contest.problems.splice(index, 1);
    },
    updateProblem: function (row, index, field) {
      switch (field) {
        case 'problemCode':
          if (!row.problemCode || row.oldProblemCode === row.problemCode) return;
          row.oldProblemCode = row.problemCode;
          api.getProblem({ problemCode: row.problemCode }).then(ret => {
            row.$ready = CONTEST_PROBLEM_STATUS.INIT;
            row.problemDescriptionId = '';
            row.problemWeight = 1;
            row.problemTitle = ret.problemTitle;
            this.getProblemDescriptionList(row).catch(_ => {
              row.problemTitle = '';
              row.problemDescriptionId = '';
              row.problemDescriptionList = [];
            });
          }).catch(err => {
            this.$Message.error(err.message);
            row.$ready = CONTEST_PROBLEM_STATUS.FAILED;
            row.problemTitle = '';
            row.problemDescriptionId = '';
            row.problemDescriptionList = [];
          });
          break;
        case 'problemTitle':
        case 'problemWeight':
        case 'problemDescriptionId':
        case 'problemColor':
          break;
        default:
          break;
      }
      this.contest.problems[index] = row;
      this.contest.problems.splice(0, 0);
    },
    updateContest: function () {
      if (!this.validateUnofficialParticipants() || !this.validateProblems()) {
        this.contestModalLoading = false;
        this.$nextTick(() => {
          this.contestModalLoading = true;
        });
        return;
      }
      const apiName = this.isAddContest ? 'createContest' : 'updateContest';
      const data = {
        ...this.contest,
        markdownDescription: this.$refs.md.getMarkdown(),
        gmtStart: new Date(this.contest.gmtStart).getTime(),
        gmtEnd: new Date(this.contest.gmtEnd).getTime(),
        participants: split(this.contest.participants, /[\s,]+/),
        unofficialParticipants: split(this.contest.unofficialParticipants,  /[\s,]+/),
        problems: this.contest.problems.map(o => {
          return {
            problemColor: o.problemColor,
            problemCode: o.problemCode,
            problemTitle: o.problemTitle,
            problemDescriptionId: o.problemDescriptionId,
            problemWeight: o.problemWeight
          };
        })
      };
      api[apiName](data).then(_ => {
        this.$Message.success('Success');
        this.contestModal = false;
        this.getContestManageList();
      }).catch(err => {
        this.$Message.error(err.message);
        this.contestModalLoading = false;
        this.$nextTick(() => {
          this.contestModalLoading = true;
        });
      });
    },
    getProblemDescriptionList: function (row) {
      return new Promise((resolve, reject) => {
        api.getProblemDescriptionList({ problemCode: row.problemCode }).then(ret => {
          row.problemDescriptionList = ret;
          resolve(ret);
          if (row.problemDescriptionId === '') {
            if (ret.length > 0) {
              row.problemDescriptionId = ret[0].id;
              row.$ready = CONTEST_PROBLEM_STATUS.READY;
            } else {
              row.problemDescriptionId = '';
              row.$ready = CONTEST_PROBLEM_STATUS.FAILED;
            }
          } else {
            const problemDescriptionIds = ret.map(o => o.id);
            if (problemDescriptionIds.includes(row.problemDescriptionId)) {
              row.$ready = CONTEST_PROBLEM_STATUS.READY;
            } else {
              row.$ready = CONTEST_PROBLEM_STATUS.FAILED;
            }
          }
        }).catch(err => {
          this.$Message.error(err.message);
          row.$ready = CONTEST_PROBLEM_STATUS.FAILED;
          reject(err);
        });
      });
    },
    getContestManageList: function() {
      this.tableLoading = true;
      api.getContestManageList({
        pageNow: this.pageNow,
        pageSize: this.pageSize,
        sortBy: this.sortBy,
        ascending: this.ascending
      }).then(ret => {
        this.contests = ret.rows;
        this.total = parseInt(ret.totalPage) * this.pageSize;
      }).catch(err => {
        this.$Message.error(err.message);
      }).finally(() => {
        this.tableLoading = false;
      });
    },
    queryManagerGroups: function (title) {
      if (title !== '') {
        this.managerGroupQueryLoading = true;
        api.queryGroupTitle({ title }).then(ret => {
          this.managerGroupSet = ret;
          this.managerGroupQueryLoading = false;
        }).catch(err => {
          this.$Message.error(err.message);
        });
      } else {
        this.managerGroupSet = [];
      }
    },
    queryParticipatingGroups: function (title) {
      if (title !== '') {
        this.participatingGroupQueryLoading = true;
        api.queryGroupTitle({ title }).then(ret => {
          this.participatingGroupSet = ret;
          this.participatingGroupQueryLoading = false;
        }).catch(err => {
          this.$Message.error(err.message);
        });
      } else {
        this.participatingGroupSet = [];
      }
    },
    setParticipatingGroupSet: function () {
      this.participatingGroupSet = this.contest.participatingGroupDTOList;
    },
    validateUnofficialParticipants: function () {
      const participants = split(this.contest.participants, /[\s,]+/);
      const observers = split(this.contest.unofficialParticipants, /[\s,]+/);
      for (let i = 0; i < observers.length; ++i) {
        if (!participants.includes(observers[i])) {
          this.$Message.error('Unofficial participants must be the subset of participants');
          this.tabErrors.manage = true;
          return false;
        }
      }
      this.tabErrors.manage = false;
      return true;
    },
    validateProblems: function () {
      if (this.contest.problems.length === 0) {
        this.$Message.error('Add at least one problem');
        this.tabErrors.problem = true;
        return false;
      }
      for (let i = 0; i < this.contest.problems.length; ++i) {
        const o = this.contest.problems[i];
        if (o.$ready !== CONTEST_PROBLEM_STATUS.READY || !o.problemDescriptionId || !o.problemTitle) {
          this.$Message.error(`Problem ${$contestProblemIdEncode(i)} is not ready`);
          this.tabErrors.problem = true;
          return false;
        }
      }
      this.tabErrors.problem = false;
      return true;
    }
  },
  computed: {
    CONTEST_OPENNESS: () => CONTEST_OPENNESS,
    CONTEST_MODE: () => CONTEST_MODE,
    CONTEST_PROBLEM_STATUS: () => CONTEST_PROBLEM_STATUS,
    moment: () => moment,
    gmtLength: {
      get: function () {
        const contestStartTime = new Date(this.contest.gmtStart).getTime();
        const contestEndTime = new Date(this.contest.gmtEnd).getTime();
        const length = parseInt((contestEndTime - contestStartTime) / 60000);
        return Math.max(0, length);
      },
      set: function (length) {
        const start = new Date(this.contest.gmtStart).getTime();
        this.contest.gmtEnd = moment(new Date(start + length * 60000)).format('yyy-MM-DD HH:mm:ss');
      }
    },
    tabLabels: function () {
      const labels = {
        basic: 'Basic',
        manage: 'Management',
        problem: 'Problem'
      };
      if (this.tabErrors.basic) {
        labels.basic = (h) => {
          return h('div', [
            h('span', 'Basic'),
            h('Badge', { props: { text: 'error' } })
          ]);
        };
      }
      if (this.tabErrors.manage) {
        labels.manage = (h) => {
          return h('div', [
            h('span', 'Management'),
            h('Badge', { props: { text: 'error' } })
          ]);
        }
      }
      if (this.tabErrors.problem) {
        labels.problem = (h) => {
          return h('div', [
            h('span', 'Problem'),
            h('Badge', { props: { text: 'error' } })
          ]);
        }
      }
      return labels;
    }
  },
  mounted: function () {
    this.getContestManageList();
  },
  watch: {
    $route: function () {
      this.getContestManageList();
    }
  }
}
</script>

<style scoped>

</style>
