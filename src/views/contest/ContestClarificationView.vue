<template>
  <Layout style="min-height: 700px;">
    <Sider width="" style="width: 25%; background: #fff; border-right: #797d7f solid 3px;">
      <div class="request" @click="ChangeFormVisible(true, true)">
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

          <div :class="'dot smaller ' + item.isPublic"></div>
          <h5 style="font-size: 120%; display: inline-block;">{{ item.title }}</h5>
          <div class="contentOverView">
            {{ item.message }}
          </div>
        </ListItem>
      </List>
    </Sider>
    <Content style="background: #fff; width: 75%">
      <div style="padding: 20px 10px; margin-left: 10px" class="clarification detail" v-if="!submitFormVisible && getSelected">
        <h1 style="font-size: 300%">{{ ClarificationToShow[getSelected - 1].title }}</h1>
        <div class="clarification state" style="padding: 10px 10px; color: #f5a623">
          <div :class=" 'dot bigger ' + ClarificationToShow[getSelected - 1].isPublic" style="margin-top: 30px;"></div>
          <h5 style="font-size: 120%; display: inline-block;">UNPUBLICED</h5>
        </div>
        <ClarificationComment v-for="item in ClarificationReply"
                              :clarification-content="item.message"
                              :username="item.username"
                              :time="item.gmtModified | fromnow"
                              :key="item.contestClarificationId"
                              @change-form-visible="ChangeFormVisible"
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
        <MarkdownEditor style="margin: 50px 20px;" ref="md" />
        <Button type="primary" class="btn" @click="SubmitQuestionForm">Submit</Button>
        <Button type="success" class="btn" @click="ChangeFormVisible(false, false)">Cancel</Button>
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
      isCreate: false
    }
  },
  methods: {
    ChangeFormVisible(e, f) {
      this.submitFormVisible = e;
      this.isCreate = f;
    },
    handleEdit(e) {
      this.$refs.md.markdown = e;
    },
    SubmitQuestionForm() {
      this.QuestionContent = this.$refs.md.getMarkdown()
      this.QuestionTitle += ' ' + this.extraMsg
      const that = this
      api.createQuestion({
        contestId: this.$store.getters['contest/contestId'],
        title: this.QuestionTitle,
        message: this.QuestionContent
      }).then(ret => {
        that.submitFormVisible = false
        this.getClarification()
      }).catch(err => {
        this.$Message.error(err.message);
      })
      this.isCreate = false;
    },
    getClarification() {
      const that = this;
      api.getQuestion({ contestId: this.$store.getters['contest/contestId'] }).then(ret => {
        ret.forEach(item => {
          if (item.isPublic) item.isPublic = CLARIFICATION_TYPE.PUBLIC
          else item.isPublic = CLARIFICATION_TYPE.UNPUBLIC
        });
        that.ClarificationToShow = ret
      }).catch(err => {
        this.$Message.error(err.message);
      })
    },
    getClarificationDetail(data, index) {
      const that = this;
      this.ChangeFormVisible(false)
      this.getSelected = index + 1;
      api.getQuestionDetail({ clarificationId: data }).then(ret => {
        ret.forEach(item => {
          if (item.isPublic) item.isPublic = CLARIFICATION_TYPE.PUBLIC
          else item.isPublic = CLARIFICATION_TYPE.UNPUBLIC
        });
        that.ClarificationReply = ret
      }).catch(err => {
        this.$Message.error(err.message);
      })
    }
  },
  created() {
    this.nowOptions = this.$store.getters['contest/problems'];
    this.getClarification()
    this.getSelected = 0
  },
  computed: {
    ...mapGetters('user', ['isAdmin']),
    ...mapState('contest', ['contest', 'problems', 'likedScoresMap']),
    ...mapGetters('contest', [
      'contestId',
      'problems'
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

/deep/ .v-note-wrapper {
  z-index: 0;
}
</style>
