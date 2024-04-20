<template>
  <div style="background:#eee; padding: 20px">
    <Row>
      <Col span="10" v-for="(item, index) in utilSelectorConfig" :key="item.introduction+index.toString()">
        <UtilMenuCard
        :util-title="item.title"
        :util-introduction="item.introduction"
        @change-dialog="changeDialog(item.name)"></UtilMenuCard>
      </Col>
    </Row>

    <Modal class-name="comprehensive" ref="comprehensiveDialog" v-model="comprehensive"
      title="Export the contest comprehensive report"
      :styles="comprehensiveDialogStyles"
      class="tool-modal"
      @on-ok="exportComprehensive">
      <Input search enter-button
             placeholder="Enter groupId ..."
             @on-search="getSearchContestList"
             v-model="selectedGroupId"
             style="width: 30%" >
        <span slot="prepend">Group Id</span>
        <Button slot="append" icon="ios-return-right" ></Button>
      </Input>
      <Menu mode="horizontal" active-name="1" @on-select="changeMenuState">
        <MenuItem name="1" key="1">配置比赛</MenuItem>
        <MenuItem name="2" key="2">配置学生</MenuItem>
      </Menu>
      <div class="contestConfig" v-show="contestConfigShow">
        <Table
          :columns="contestColumns"
          :data="contests"
          :loading="tableLoading"
          class="content-table"
          @on-select="selectContest"
          @on-select-cancel="unselectContest">
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
          <template slot-scope="{ row }" slot="action">
            <span class="clickable" @click="EditConfig(row)">Edit Config</span>
          </template>
          <template slot-scope="{ row }" slot="weight">
            <Input style="width: 100px" v-model="recordWeight[row.contestId]" />
          </template>
        </Table>

        <div class="footer-tools">
          <Page
            class="float-right"
            size="small" show-elevator show-sizer
            :total="total"
            :current.sync="PageNow"
            :page-size="PageSize"
            :page-size-opts="pageSizeOpts"
            @on-change="getContestManageList"
            @on-page-size-change="tableSizeChange"
          />
        </div>
      </div>

      <div class="studentConfig" v-show="studentConfigShow">
        <div>
          <Card class="tag-card">
            <p class="prefix">全部学生:</p>
            <Tag v-for="item in allStudent" :key="item.userId" :name="item.username" :ref="item.username + ' tag'"
                 color="primary" checkable @on-change="handleStudentSelectedChange">{{ item.username }}</Tag>
          </Card>
          <Divider />
          <Card class="tag-card">
            <p class="prefix">已选择的学生:</p>
            <Tag v-for="item in selectedStudent" :key="item"
                 closable type="border" @on-close="deleteSelectedTag(item)"
                 color="primary">{{ item }}</Tag>
          </Card>
        </div>

        <Tooltip content="手动增加" v-show="!extraTextVisible">
          <Button size="default" icon="ios-add"
                  @click="changeExtraVisible"
                  type="primary"
                  style="margin-left: 10px">
          </Button>
        </Tooltip>

        <Button size="default" icon="ios-remove"
                v-show="extraTextVisible"
                style="margin-left: 10px"
                type="primary"
                @click="changeExtraVisible">
        </Button>

        <Modal  v-model="extraTextVisible" @on-ok="addStudentHandin">
          <Form>
            <FormItem label="Participants">
              <span class="hint-text">Separate username by a TAB '\t', SPACE ' ', NEW LINE '\n' or COMMA ','</span>
              <Input v-model="handInParticipants" type="textarea" :autosize="{minRows: 3}"/>
            </FormItem>
          </Form>
        </Modal>
      </div>
    </Modal>

    <Modal v-model="comprehensiveConfigDetailVisible"
           title="ConfigDetail"
           width="400px"
           @on-ok="pushComprehensiveConfig">
      <Form label-position="left" :label-width="100">
        <FormItem label="超时时间">
          <Input v-model="timeCost" placeholder="请填写整数(ms)"></Input>
        </FormItem>
        <FormItem label="超时权重">
          <Input v-model="outTimeWeight" placeholder="请填写小数(<=1)"></Input>
          <Button type="success" class="add-config-btn" @click="addTimeWeight">添加配置</Button>
        </FormItem>

        <Poptip>
          添加详细配置, <a>example</a>
          <Timeline slot="content">
            <TimelineItem v-for="item in exampleWeight" color="green" :key="item[0]">超出比赛结束时间 {{ item[0] }}ms内 得分率: {{ item[1] }}</TimelineItem>
          </Timeline>
        </Poptip>
        <p class="timeline-prefix">你的配置：</p>
        <Timeline>
          <TimelineItem v-for="item in timeWeightDetail" color="green" :key="item[0]">
            <p style="height: 20px; line-height: 20px">超出比赛结束时间 {{ item[0] }}ms内 得分率: {{ item[1] }}
              <Button shape="circle" icon="md-close" size="small" type="error"
                      style="float: right; margin-top: -5px; margin-right: 10px"
                      @click="deleteTimeConfig(item)"></Button></p>
          </TimelineItem>
        </Timeline>
      </Form>
    </Modal>

  </div>
</template>

<script>
import UtilMenuCard from '_c/card/UtilMenuCard';
import moment from 'moment';
import { CONTEST_OPENNESS, CONTEST_MODE, CONTEST_PROBLEM_STATUS } from '_u/constants';
import api from '_u/api.js';
import { split } from '_u/split';
import { indexof } from '_u/ObjectArrayIndexof';
export default {
  components: {
    UtilMenuCard
  },
  data: function () {
    return {
      utilSelectorConfig: [
        {
          name: 'comprehensive',
          title: 'Export the contest comprehensive report',
          introduction: '根据提供的组号，比赛号，学生等配置导出比赛数据'
        }
      ],

      contestColumns: [
        { type: 'selection', width: 60, align: 'center' },
        { key: 'contestId', maxWidth: 80 },
        { title: 'Title', slot: 'title', minWidth: 150 },
        { title: 'Start', key: 'gmtStart', sortable: 'custom', width: 200, slot: 'time' },
        { title: 'Duration', sortable: 'custom', slot: 'duration' },
        { title: 'Actions', slot: 'action' },
        { title: 'Weight', slot: 'weight' }
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
      contestConfig: {},

      tableLoading: false,
      total: 0,
      PageNow: 1,
      PageSize: 10,
      pageSizeOpts: [10, 30, 50],

      contestConfigShow: true,
      studentConfigShow: false,
      selectedGroupId: '',

      /* 权重 */
      configSelectContest: '',
      timeCost: '',
      outTimeWeight: '',
      weight: '',
      exampleWeight: [
        ['0', 1],
        ['100', 0.8],
        ['1000', 0.6]
      ],
      timeWeightDetail: [
        [0, 1]
      ],
      recordWeight: [],

      /* 学生配置 */
      handInParticipants: '',
      selectedStudent: [],
      allStudent: '',

      /* Dialog Visible variable */
      comprehensive: false,
      comprehensiveConfigDetailVisible: false,
      extraTextVisible: false,
      comprehensiveDialogStyles: {
        width: '70%'
      }
    }
  },
  methods: {
    changeDialog (item) {
      this[item] = !this[item]
    },
    tableSizeChange: function (size) {
      this.PageSize = size
      this.getContestManageList()
    },
    getSearchContestList: function () {
      this.PageNow = 1;
      this.getContestManageList();
      this.getStudentList();
    },

    changeModalWidth: function () {
      if (this.contestConfigShow) this.comprehensiveDialogStyles.width = '70%'
      else this.comprehensiveDialogStyles.width = '50%'
    },

    getContestManageList: function () {
      this.tableLoading = true;
      this.selectedContests = [];
      api.getContestManageListByGroupId({
        pageNow: this.PageNow,
        pageSize: this.PageSize,
        groupId: this.selectedGroupId
      }).then(ret => {
        this.contests = ret.rows;
        this.total = this.PageSize * ret.totalPage
      }).catch(err => {
        this.$Message.error(err.message);
      }).finally(() => {
        this.tableLoading = false;
      });
    },
    getStudentList: function () {
      this.selectedStudent = [];
      this.allStudent = [];
      api.getStudentListByGroupId({
        groupId: this.selectedGroupId
      }).then(ret => {
        this.allStudent = ret.members
        this.allStudent.forEach(item => {
          this.selectedStudent.push(item.username)
        })
      }).catch(err => {
        this.$Message.error(err.message);
      })
    },

    selectContest: function (selection, row) {
      this.selectedContests.push(row.contestId)
    },
    unselectContest: function (selection, row) {
      this.selectedContests.splice(this.selectedContests.indexOf(row.contestId), 1)
    },
    EditConfig: function (row) {
      this.configSelectContest = row.contestId
      this.weight = ''
      this.timeCost = ''
      this.outTimeWeight = ''
      this.changeComprehensiveConfigDetailVisible()
    },
    changeComprehensiveConfigDetailVisible: function () {
      this.comprehensiveConfigDetailVisible = true
    },
    pushComprehensiveConfig: function () {
      this.contestConfig[this.configSelectContest] = {
        contestId: this.configSelectContest,
        weight: this.recordWeight[this.configSelectContest],
        timeoutScoreRatio: this.timeWeightDetail
      }
    },
    changeMenuState: function (name) {
      this.contestConfigShow = (name === '1');
      this.studentConfigShow = !this.contestConfigShow
      this.changeModalWidth()
    },

    unselectStudent: function (username) {
      this.selectedStudent.splice(this.selectedStudent.indexOf(username), 1)
    },
    handleStudentSelectedChange: function (checked, name) {
      if (checked) this.selectedStudent.push(name);
      else this.unselectStudent(name)
    },
    addStudentHandin: function () {
      const newHandin = Array.from(new Set((split(this.handInParticipants, /[\s,]+/)).concat(this.selectedStudent)))
      for (let i = 0; i < newHandin.length; i++) {
        if (indexof(this.allStudent, 'username', newHandin[i]) === -1) continue;
        if (!this.$refs[newHandin[i] + ' tag'][0].isChecked) this.$refs[newHandin[i] + ' tag'][0].check()
      }
      this.selectedStudent = newHandin
    },
    deleteSelectedTag: function (username) {
      if (indexof(this.allStudent, 'username', username) === -1) {
        this.unselectStudent(username)
        return;
      }
      this.$refs[username + ' tag'][0].check()
    },

    exportComprehensive: function () {
      const contestList = [];
      this.selectedContests.forEach(item => {
        contestList.push(this.contestConfig[item])
      })
      const data = {
        usernameList: this.selectedStudent,
        contestList: contestList
      };
      api.exportComprehensive(data).catch(err => {
        this.$Message.error(err.message);
      })
    },
    changeExtraVisible: function () {
      this.extraTextVisible = !this.extraTextVisible
    },

    addTimeWeight: function () {
      let i;
      for (i = 0; i < this.timeWeightDetail.length; i++) {
        if (this.timeWeightDetail[i][0] >= this.timeCost) break;
      }
      if (i < this.timeWeightDetail.length && this.timeWeightDetail[i][0] === this.timeCost) {
        this.timeWeightDetail[i][1] = parseFloat(this.outTimeWeight)
      } else {
        this.timeWeightDetail.splice(i, 0, [this.timeCost, parseFloat(this.outTimeWeight)])
      }
    },
    deleteTimeConfig: function (item) {
      this.timeWeightDetail.splice(this.timeWeightDetail.indexOf(item), 1)
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
    parseInt: val => parseInt(val)
  },
  computed: {
    CONTEST_OPENNESS: () => CONTEST_OPENNESS,
    CONTEST_MODE: () => CONTEST_MODE,
    CONTEST_PROBLEM_STATUS: () => CONTEST_PROBLEM_STATUS,
    moment: () => moment
  },
  watch: {
  }
}
</script>

<style scoped lang="less">

.prefix {
  padding: 5px;
  line-height: 1;
}

.timeline-prefix {
  margin: 30px 5px 20px;
  line-height: 1;
  color: cornflowerblue;
}

.tag-card {
  margin: 10px;
  padding: 10px;
}

.add-config-btn {
  margin: 10px;
  float: right;
}

</style>
