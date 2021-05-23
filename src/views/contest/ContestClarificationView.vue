<template>
  <Layout style="min-height: 700px;">
    <Sider width="" style="width: 25%; background: #fff; border-right: #797d7f solid 3px;">
      <div class="request" @click="ChangeFormVisible(true)">
        <h5>
        REQUEST
        </h5>
      </div>
      <List item-layout="vertical" style="margin-left: 20px">
        <ListItem style="padding: 10px; margin-top: 10px; margin-right: 10px" class="listItem">
          <div :class="'dot smaller ' + CLARIFICATION_TYPE.PUBLIC"></div>
          <h5 style="font-size: 120%; display: inline-block;">Title</h5>
          <div class="contentOverView">
            Content
          </div>
        </ListItem>
      </List>
    </Sider>
    <Content style="background: #fff">
      <div style="padding: 20px 10px; margin-left: 10px" class="clarification detail" v-show="!submitFormVisible">
        <h1 style="font-size: 300%">Title</h1>
        <div class="clarification state" style="padding: 10px 10px; color: #f5a623">
          <div :class=" 'dot bigger ' + CLARIFICATION_TYPE.UNPUBLIC" style="margin-top: 30px;"></div>
          <h5 style="font-size: 120%; display: inline-block;">UNPUBLICED</h5>
        </div>
        <ClarificationComment v-for="index in testArray" :props="index" :key="index" @change-form-visible="ChangeFormVisible" />
      </div>
      <div  v-show="submitFormVisible">
        <MarkdownEditor style="margin: 20px 20px;" />
        <Button type="primary" class="btn">Submit</Button>
        <Button type="success" class="btn" @click="ChangeFormVisible(false)">Cancel</Button>
      </div>
    </Content>
  </Layout>
</template>

<script>
import { CLARIFICATION_TYPE } from '_u/constants';
import ClarificationComment from '_c/ClarificationComment';
import MarkdownEditor from '_c/editor/MarkdownEditor';

export default {
  name: 'ContestClarification',
  components: { MarkdownEditor, ClarificationComment },
  data: function () {
    return {
      submitFormVisible: false,
      submitReply: '',
      submitReplyVisible: false,
      Clarification: {
        QuestionTitle: '',
        QuestionContent: ''
      },
      testArray: [1, 2, 3, 4, 5, 6, 7]
    }
  },
  methods: {
    ChangeFormVisible(e) {
      this.submitFormVisible = e;
    }
  },
  computed: {
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

</style>
