<template>
  <div>
    <Card dis-hover>
      <p slot="title">Groups</p>
      <Table
        :loading="tableLoading"
        :columns="groupColumns"
        :data="groups"
        no-data-text=""
        class="content-table"
        @on-sort-change="onSort">
        <template slot="time" slot-scope="{ row }">
          <Time :time="row.gmtCreate | parseInt" type="datetime" />
        </template>
        <template slot="owner" slot-scope="{ row }">
          <span>{{ `${row.owner.username}(${row.owner.nickname})` }}</span>
        </template>
        <template slot="openness" slot-scope="{ row }">
          <span>{{ GROUP_OPENNESS[row.openness].title }}</span>
        </template>
        <template slot="action" slot-scope="{ row }">
          <a href="#" @click.prevent="onEditGroup(row.groupId, 'edit')">Edit</a>
          <Divider type="vertical" />
          <a href="#" @click.prevent="onEditGroup(row.groupId, 'member')">Members</a>
          <Divider type="vertical" />
          <a href="#" @click.prevent="onDeleteGroup(row)">Delete</a>
        </template>
      </Table>
    </Card>
    <div class="footer-tools">
      <Button type="default" size="small" class="float-left footer-btn" @click="onCreateGroup">Create</Button>
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
      v-model="groupModal"
      width="80%"
      :loading="groupModalLoading"
      :mask-closable="false"
      :title="addGroup ? 'Add Group' : `Edit Group ${group.title} (Group ID: ${group.groupId})`"
      @on-ok="updateGroup">
      <Form :model="group" ref="group" label-position="top" :rules="groupValidate">
        <FormItem label="Title" prop="title">
          <Input v-model="group.title" />
        </FormItem>
        <FormItem label="Description">
          <Input v-model="group.description" />
        </FormItem>
        <FormItem label="Openness" required>
          <RadioGroup v-model="group.openness" vertical>
            <Radio v-for="key in GROUP_OPENNESS_TYPE" :key="key" :label="key">
              {{ `${GROUP_OPENNESS[key].title}: ${GROUP_OPENNESS[key].description}` }}
            </Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="Markdown">
          <MarkdownEditor ref="md" />
        </FormItem>
      </Form>
    </Modal>
    <Modal
      v-model="memberModal"
      width="80%"
      :title="`Members in ${group.title} (Group ID: ${group.groupId})`">
        <div v-if="applyMembers.length > 0">
          <Alert>
            <span style="margin-right: 16px">Apply List ({{ applyMembers.length }})</span>
            <Button @click="acceptMembers(applyMembers, 1)" size="small">Accept All</Button>
            <Divider type="vertical" />
            <Button @click="rejectMembers(applyMembers, 1)" type="warning" size="small">Reject All</Button>
          </Alert>
          <Table
            :columns="memberColumns"
            :data="applyMembers"
            :max-height="500"
            no-data-text=""
            class="content-table">
            <template slot="action" slot-scope="{ row }">
              <a href="#" @click.prevent="acceptMembers(row, 0)">Accept</a>
              <Divider type="vertical" />
              <a href="#" @click.prevent="rejectMembers(row, 0)">Reject</a>
            </template>
          </Table>
        </div>
        <Divider v-if="allMembers.length > 0 && applyMembers.length > 0" />
        <div v-if="allMembers.length > 0">
          <Alert type="success">
            <div>
              <span style="margin-right: 16px">Member List ({{ allMembers.length }})</span>
              <Button @click="addMembersInput = !addMembersInput" size="small">Add Members</Button>
              <Divider type="vertical" />
              <Button v-if="allMembersWithoutOwner.length > 0" @click="rejectMembers(allMembers, 1)" type="warning" size="small">Remove All</Button>
            </div>
            <div v-if="addMembersInput" style="margin-top: 8px">
              <span style="color: #808695">Separate username by a TAB '\t', SPACE ' ', NEW LINE '\n' or COMMA ','</span>
              <Input style="margin: 5px 0" v-model="membersAdd" type="textarea" :autosize="{minRows: 3}"/>
              <Button size="small" type="info" @click="addMembers2Group">Add</Button>
            </div>
          </Alert>
          <Table
            :columns="memberColumns"
            :data="allMembers"
            :max-height="500"
            no-data-text=""
            class="content-table">
            <template slot="action" slot-scope="{ row }">
              <div v-if="row.userId !== group.owner.userId">
                <a href="#" @click.prevent="rejectMembers(row, 0)">Remove</a>
                <Divider type="vertical" />
                <a href="#" @click.prevent="transferOwner(group, row)">Transfer</a>
              </div>
            </template>
          </Table>
        </div>
    </Modal>
  </div>
</template>

<script>
import api from '_u/api';
import { GROUP_OPENNESS, GROUP_OPENNESS_TYPE, GROUP_STATUS_TYPE } from '_u/constants';
import { Page } from '_c/mixins';
import MarkdownEditor from '_c/editor/MarkdownEditor';

export default {
  name: 'GroupListView',
  mixins: [Page],
  components: { MarkdownEditor },
  filters: {
    parseInt: val => parseInt(val)
  },
  data: function () {
    return {
      groups: [],
      groupColumns: [
        { key: 'groupId', maxWidth: 80 },
        { title: 'Create Time', slot: 'time' },
        { title: 'Title', key: 'title' },
        { title: 'Description', key: 'description' },
        { title: 'Owner', slot: 'owner' },
        { title: 'Openness', slot: 'openness' },
        { title: 'Members', key: 'memberNum' },
        { title: 'Actions', slot: 'action', width: 200 }
      ],
      memberColumns: [
        { key: 'userId', maxWidth: 80 },
        { title: 'Username', key: 'username' },
        { title: 'Nickname', key: 'nickname' },
        { title: 'Email', key: 'email' },
        { title: 'Actions', slot: 'action', width: 200 }
      ],
      groupValidate: {
        title: [{ required: true, message: 'The title cannot be empty', trigger: 'blur' }]
      },
      group: {
        groupId: '',
        title: '',
        description: '',
        openness: 0,
        markdown: '',
        members: []
      },
      groupModalLoading: true,
      groupModal: false,
      addGroup: true,
      memberModal: false,
      tableLoading: false,
      addMembersInput: false,
      membersAdd: ''
    }
  },
  methods: {
    getGroupManageList: function () {
      this.tableLoading = true;
      api.getGroupManageList({
        pageNow: this.pageNow,
        pageSize: this.pageSize
      }).then(ret => {
        this.groups = ret.rows;
        this.total = parseInt(ret.totalPage) * this.pageSize;
      }).catch(err => {
        this.$Message.error(err.message);
      }).finally(() => {
        this.tableLoading = false;
      });
    },
    updateGroup: function () {
      this.group.markdown = this.$refs.md.getMarkdown();
      this.$refs.group.validate(valid => {
        if (valid) {
          const apiName = this.addGroup ? 'createGroup' : 'updateGroup';
          api[apiName](this.group).then(_ => {
            this.$Message.success('Success');
            this.getGroupManageList();
            this.groupModal = false;
          }).catch(err => {
            this.$Message.error(err.message);
            this.groupModalLoading = false;
            this.$nextTick(() => {
              this.groupModalLoading = true;
            });
          });
        }
      });
    },
    onCreateGroup: function () {
      this.clear();
      this.addGroup = true;
      this.groupModal = true;
    },
    onEditGroup: function (groupId, type) {
      const removeLoading = this.$Message.loading({
        content: 'Loading',
        duration: 0
      });
      api.getGroupManageDetail({ groupId })
        .then(ret => {
          this.group = ret;
          if (type === 'edit') {
            this.$refs.md.setMarkdown(this.group.markdown);
            this.addGroup = false;
            this.groupModal = true;
          } else if (type === 'member') {
            this.addMembersInput = false;
            this.membersAdd = '';
            this.memberModal = true;
          }
        })
        .catch(err => {
          this.$Message.error(err.message);
        })
        .finally(() => {
          removeLoading();
        });
    },
    onDeleteGroup: function (row) {
      this.$Modal.confirm({
        title: 'Confirm to delete',
        content: `Do you want to delete group ${row.title} (Group ID ${row.groupId})?`,
        loading: true,
        onOk: () => {
          if (row.memberNum > 1) {
            this.$Message.error('You must remove ALL members before deleting the group!');
            this.$Modal.remove();
          } else {
            api.deleteGroup({
              groupId: row.groupId
            }).then(_ => {
              this.$Message.success('Success');
              this.getGroupManageList();
            }).catch(err => {
              this.$Message.error(err.message);
            }).finally(() => {
              this.$Modal.remove();
            })
          }
        }
      });
    },
    clear: function() {
      this.group.title = '';
      this.group.description = '';
      this.group.markdown = '';
      this.group.openness = GROUP_OPENNESS_TYPE.PUBLIC;
      this.$refs.md.$clear();
      this.$refs.md.setMarkdown('');
    },
    acceptMembers: function (members, batch) {
      if (batch) {
        var userIds = members.map(o => o.userId);
        var content = `Accept all ${userIds.length} members?`;
      } else {
        // eslint-disable-next-line no-redeclare
        var userIds = [members.userId];
        // eslint-disable-next-line no-redeclare
        var content = `Accept ${members.username} ?`;
      }
      this.$Modal.confirm({
        title: 'Confirm',
        content,
        loading: true,
        onOk: () => {
          this.updateUserStatus(this.group.groupId, userIds, GROUP_STATUS_TYPE.JOINED).finally(() => {
            this.$Modal.remove();
          });
        }
      });
    },
    rejectMembers: function (members, batch) {
      if (batch) {
        var userIds = members.map(o => o.userId);
        var content = `Reject all ${userIds.length} members?`;
      } else {
        // eslint-disable-next-line no-redeclare
        var userIds = [members.userId];
        // eslint-disable-next-line no-redeclare
        var content = `Reject ${members.username} ?`;
      }
      this.$Modal.confirm({
        title: 'Confirm',
        content,
        loading: true,
        onOk: () => {
          this.updateUserStatus(this.group.groupId, userIds, GROUP_STATUS_TYPE.REJECTED).finally(() => {
            this.$Modal.remove();
          });
        }
      });
    },
    updateUserStatus: function (groupId, userIds, status) {
      return new Promise((resolve, reject) => {
        api.updateUserStatus({
          groupId,
          userIds,
          status
        }).then(_ => {
          this.$Message.success('Success');
          this.onEditGroup(groupId);
          resolve(_);
        }).catch(err => {
          this.$Message.error(err.message);
          reject(err);
        });
      });
    },
    transferOwner: function (group, user) {
      this.$Modal.confirm({
        title: 'Confirm',
        content: `Transfer the owner of group ${group.title} to ${user.username} ?`,
        loading: true,
        onOk: () => {
          api.updateGroup({
            groupId: group.groupId,
            userId: user.userId
          }).then(_ => {
            this.$Message.success('Success');
            this.onEditGroup(group.groupId);
          }).catch(err => {
            this.$Message.error(err.message);
          });
        }
      });
    },
    addMembers2Group: function () {
      const removeLoading = this.$Message.loading({
        content: 'Updating',
        duration: 0
      });
      api.addUsersToGroup({
        groupId: this.group.groupId,
        usernames: this.membersAdd.split(/[\s,]+/),
        status: GROUP_STATUS_TYPE.JOINED
      }).then(_ => {
        this.$Message.success('Success');
        this.membersAdd = '';
        this.onEditGroup(this.group.groupId);
      }).catch(err => {
        this.$Message.error(err.message);
      }).finally(() => {
        removeLoading();
      });
    }
  },
  computed: {
    applyMembers: function () {
      return this.group.members.filter(o => o.status === GROUP_STATUS_TYPE.APPLIED);
    },
    allMembers: function () {
      return this.group.members.filter(o => o.status === GROUP_STATUS_TYPE.JOINED);
    },
    allMembersWithoutOwner: function () {
      return this.allMembers.filter(o => o.userId !== this.group.owner.userId);
    },
    GROUP_OPENNESS: () => GROUP_OPENNESS,
    GROUP_OPENNESS_TYPE: () => GROUP_OPENNESS_TYPE
  },
  mounted: function () {
    this.getGroupManageList();
  },
  watch: {
    $route: function () {
      this.getGroupManageList();
    }
  }
}
</script>

<style scoped>

</style>
