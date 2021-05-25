<template>
  <Layout style="min-height: 700px;">
    <Sider width="" style="width: 25%; background: #fff; border-right: #797d7f solid 3px;">
      <div class="request" @click="ChangeSubmitFormShow(true)">
        <h5>
        REQUEST
        </h5>
      </div>
      <List item-layout="vertical" style="margin-left: 20px">
        <ListItem
          v-for="(item, index) in ClarificationToShow"
          :key="item.contestClarificationId"
          style="padding: 10px; margin-top: 10px; margin-right: 10px" class="listItem"
          @click.native="getClarificationDetail(item.contestClarificationId, index)">
          <div style=" position: relative">
            <div :class="'dot smaller ' + item.isPublic"></div>
            <h5 style="font-size: 120%; display: inline-block;">{{ item.title }} <Icon type="ios-close" class="closeBtn" @click="DeleteQuestion(item, index)"/></h5>
            <div class="contentOverView">
              {{ item.message }}
            </div>
          </div>
        </ListItem>
      </List>
    </Sider>
    <Content style="background: #fff; width: 75%">
      <div style="padding: 20px 10px; margin-left: 10px" class="clarification detail" v-if="!submitFormVisible && getSelected">
        <h1 style="font-size: 300%">{{ ClarificationToShow[getSelected - 1].title }}</h1>
        <div class="clarification state" style="padding: 10px 10px; color: #f5a623">
          <div :class=" 'dot bigger ' + ClarificationToShow[getSelected - 1].isPublic" style="margin-top: 30px;"></div>
          <h5 style="font-size: 120%; display: inline-block;">{{ ClarificationToShow[getSelected - 1].isPublic }}</h5>
          <checkbox v-model="isPublic" v-if="isAdmin" @on-change ="SetPublic(isPublic, ClarificationToShow[getSelected - 1].contestClarificationId)"
            style="display: inline-block; color: black; margin-left: 20px">public</checkbox>
        </div>
        <ClarificationComment v-for="item in ClarificationReply"
                              :clarification-content="item.message"
                              :contest-clarification-id="item.contestClarificationId"
                              :username="item.username"
                              :time="item.gmtModified | fromnow"
                              :key="item.contestClarificationId"
                              @on-reply="handleReply(item)"
                              @on-edit="handleEdit" />
      </div>
      <div  v-show="submitFormVisible">
        <div class="createClaHeader" v-if="isCreate">
          <div style="margin:20px 20px">
            <h1>Title</h1>
          </div>
          <div style="padding-top: 20px">
            <Select v-model="QuestionTitle" filterable style="margin: 0 3px 0 20px;width: 200px">
              <Option v-for="item in nowOptions" :value="item.problemTitle" :key="item.problemTitle">{{ item.problemTitle }}</Option>
            </Select>
            <input class="extraMsg" v-model="extraMsg">
          </div>
          <div style="margin: 20px 20px">
            <h1>Question</h1>
          </div>
        </div>
        <MarkdownEditor style="margin: 50px 20px;" ref="md" v-model="QuestionContent" />
        <Button type="primary" class="btn" @click="SubmitForm">Submit</Button>
        <Button type="success" class="btn" @click="ChangeSubmitFormShow(false); ">Cancel</Button>
      </div>
    </Content>
  </Layout>
</template>

<script>
import { CLARIFICATION_TYPE } from '_u/constants';
import ClarificationComment from '_c/ClarificationComment';
import MarkdownEditor from '_c/editor/MarkdownEditor';
import api from '_u/api';
import { mapGetters, mapState } from 'vuex';
import moment from 'moment';

export default {
  name: 'ContestClarification',
  components: { MarkdownEditor, ClarificationComment },
  filters: {
    fromnow: function(timestamp) {
      if (typeof (timestamp) === 'string') {
        timestamp = parseInt(timestamp);
      }
      return moment(new Date(timestamp)).fromNow();
    }
  },
  data: function () {
    return {
      submitFormVisible: false,
      submitReply: '',
      submitReplyVisible: false,
      QuestionTitle: '',
      QuestionContent: '',
      extraMsg: '',
      nowOptions: [],
      ClarificationToShow: [],
      ClarificationReply: [],
      getSelected: Number,
      isCreate: false,
      eventType: {
        Question: 0,
        Reply: 1,
        Edit: 2
      },
      event: Number,
      targetItem: {},
      isPublic: true
    }
  },
  methods: {
    ChangeSubmitFormShow(e) {
      this.submitFormVisible = e;
      this.isCreate = e;
      this.event = this.eventType.Question
      this.$refs.md.setMarkdown(this.$store.getters['contest/template'])
    },
    handleEdit(e) {
      this.submitFormVisible = true;
      this.isCreate = false;
      this.$refs.md.markdown = e.clarification;
      this.targetItem = e.id
      this.event = this.eventType.Edit
    },
    handleReply(data) {
      this.submitFormVisible = true;
      this.isCreate = false;
      this.event = this.eventType.Reply;
      this.targetItem = data
      this.$refs.md.markdown = '';
    },
    SubmitForm() {
      if (this.event === this.eventType.Question) this.SubmitQuestion()
      else if (this.event === this.eventType.Reply) this.SubmitReply()
      else this.EditReply()
    },
    SubmitQuestion() {
      this.QuestionContent = this.$refs.md.getMarkdown()
      this.QuestionTitle += ' ' + this.extraMsg
      const that = this
      api.createQuestion({
        contestId: this.$store.getters['contest/contestId'],
        title: this.QuestionTitle,
        message: this.QuestionContent
      }).then(ret => {
        that.submitFormVisible = false
        that.isCreate = false;
        that.getClarification()
      }).catch(err => {
        that.$Message.error(err.message);
      })
    },
    checkPublic() {
      this.isPublic = (this.ClarificationToShow[this.getSelected - 1].isPublic === CLARIFICATION_TYPE.PUBLIC)
    },
    SubmitReply() {
      this.QuestionContent = this.$refs.md.getMarkdown()
      const Root = this.targetItem.rootId === '0' ? this.targetItem.contestClarificationId : this.targetItem.rootId
      api.createReply({
        contestId: this.$store.getters['contest/contestId'],
        message: this.QuestionContent,
        rootId: Root,
        parentId: this.targetItem.contestClarificationId
      }).then(ret => {
        this.ChangeSubmitFormShow(false)
        this.getClarificationDetail(this.ClarificationToShow[this.getSelected - 1].contestClarificationId)
      }).catch(err => {
        this.$Message.error(err.message);
      })
    },
    getClarification() {
      api.getQuestion({ contestId: this.$store.getters['contest/contestId'] }).then(ret => {
        ret.forEach(item => {
          if (item.isPublic) item.isPublic = CLARIFICATION_TYPE.PUBLIC
          else item.isPublic = CLARIFICATION_TYPE.UNPUBLIC
        });
        this.ClarificationToShow = ret
      }).catch(err => {
        this.$Message.error(err.message);
      })
    },
    getClarificationDetail(data, index) {
      if (index) this.getSelected = index + 1;
      this.ChangeSubmitFormShow(false)
      this.checkPublic()
      api.getQuestionDetail({ clarificationId: data }).then(ret => {
        ret.forEach(item => {
          if (item.isPublic) item.isPublic = CLARIFICATION_TYPE.PUBLIC
          else item.isPublic = CLARIFICATION_TYPE.UNPUBLIC
        });
        this.ClarificationReply = ret
      }).catch(err => {
        this.$Message.error(err.message);
      })
    },
    DeleteQuestion(e, index) {
      if (e.isPublic === 'Public') {
        this.$Message.error('公开问题不予删除');
      } else {
        api.deleteQuestion({ clarificationId: e.contestClarificationId }).then(ret => {
          this.$Message.success('删除成功')
          this.ClarificationToShow.splice(index, 1)
        }).catch(err => {
          this.$Message.error(err.message)
        })
      }
    },
    EditReply(data) {
      api.editReply({
        clarificationId: this.targetItem,
        content: this.$refs.md.getMarkdown()
      }).then(ret => {
        this.ChangeSubmitFormShow(false);
        this.getClarificationDetail(this.ClarificationToShow[this.getSelected - 1].contestClarificationId)
      }).catch(err => {
        this.$Message.error(err.message)
      })
    },
    SetPublic(data, id) {
      data = (data ? 1 : 0);
      api.setPublic({
        clarificationId: id,
        opt: data
      }).then(ret => {
        this.getClarification()
      }).catch(err => {
        this.$Message.error(err.message)
      })
    }
  },
  created() {
    this.nowOptions = this.$store.getters['contest/problems'];
    this.getClarification()
    this.getSelected = 0
  },
  mounted: function () {
    this.$nextTick(() => {
      this.$refs.md.setMarkdown(this.$store.getters['contest/template'])
    })
  },
  computed: {
    ...mapGetters('user', ['isAdmin']),
    ...mapState('contest', ['contest', 'problems']),
    ...mapGetters('contest', [
      'contestId',
      'problems',
      'template'
    ]),
    ...mapGetters('user', ['profile']),
    CLARIFICATION_TYPE: () => CLARIFICATION_TYPE
  }
}
</script>

<style scoped>
.request {
  width: 37%;
  padding: 10px;
  margin: 20px auto 0;
  border-radius: 15px;
  border: #f5a623 solid 4px;
  text-align: center;
  font-size: 100%;
}

.request:hover {
  background: #f5a623;
}

.dot {
  border-radius: 50%;
  margin-right: 5px;
  display: inline-block;
}

.smaller {
  width: 3%;
  height: 0;
  padding-bottom: 3%;
}

.bigger {
  width: 2%;
  height: 0;
  padding-bottom: 2%;
}

.UNPUBLIC {
  background: #f5a623;
}

.PUBLIC {
  background: #60e760;
}

.contentOverView {
  padding-left: 5%;
  color: #9a9a9a;
  font-size: 120%;
}

.contentDetailView {
  padding-left: 7px;
  font-size: 130%;
  margin-top: 15px;
}

.listItem:hover {
  background: #c4d8ff;
}

.clarification .answer {
  margin-top: 10px;
  padding-left: 15px;
  padding-bottom: 70px;
  padding-top: 10px;
  font-size: 170%;
  border-left: #BDC3C7 11px solid;
  background: #f3f3f3;
}

.answer .btn {
  position: absolute;
  bottom: 10%;
}

.btn {
  float: right;
  margin-right: 20px;
}

.extraMsg {
  background: #fff;
  border: 1px solid;
  display: inline-block;
  font-size: 14px;
  height: 32px;
  line-height: 32px;
  width: 700px;
  padding-left: 3px;
  padding-right: 20px;
  border-radius: 5px;
}

.closeBtn {
  display: inline-block;
  position: absolute;
  right: 1px;
}

.closeBtn:hover {
  background: #ed4014;
}

/deep/ .v-note-wrapper {
  z-index: 0;
}
</style>
