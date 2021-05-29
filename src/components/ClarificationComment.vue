<template>
  <div class="ClarificationComment">
    <div class="CommentHeader">
      <a class="username">{{username}}</a> <p style="display: inline-block; margin-left: 5px">{{time}}</p>
      <Dropdown placement="bottom-end" class="options" @on-click="selectMenu">
        <a>...</a>
        <DropdownMenu slot="list">
          <DropdownItem name="QA" v-if="isAdmin || isPublic === CLARIFICATION_TYPE.UNPUBLIC">Quick Answer</DropdownItem>
          <DropdownItem name="Edit" v-if="isAdmin">Edit</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
    <div class="markdown">
      <div class="replyTarget" v-if="replyRoot && replyRoot.message">
        <p style="margin-left: 5px; margin-bottom: 5px">Reply to:</p>
        <div class="reply">
          <div class="CommentHeader">
            <a class="username">{{replyRoot.username}}</a> <p style="display: inline-block; margin-left: 5px">{{replyRoot.gmtCreate | fromnow}}</p>
          </div>
          <Markdown :value="replyRoot.message"  style="min-height: 50px;" />
        </div>
      </div>
      <Markdown :value="ClarificationContent"  style="min-height: 100px; border-top: none" />
    </div>
  </div>
</template>

<script>
import Markdown from './editor/Markdown';
import { mapGetters } from 'vuex';
import moment from 'moment';
import { CLARIFICATION_TYPE } from '_u/constants';
export default {
  name: 'ClarificationComment',
  components: { Markdown },
  filters: {
    fromnow: function(timestamp) {
      if (typeof (timestamp) === 'string') {
        timestamp = parseInt(timestamp);
      }
      return moment(new Date(timestamp)).format('YYYY-MM-DD hh:mm:ss');
    }
  },
  props: [
    'username',
    'time',
    'ClarificationContent',
    'contestClarificationId',
    'isPublic',
    'replyRoot'
  ],
  methods: {
    selectMenu(name) {
      if (name === 'QA') {
        this.$emit('on-reply')
      }
      if (name === 'Edit') {
        this.$emit('on-edit', {
          clarification: this.ClarificationContent,
          id: this.contestClarificationId
        })
      }
    }
  },
  computed: {
    ...mapGetters('user', ['isAdmin']),
    CLARIFICATION_TYPE: () => CLARIFICATION_TYPE
  }
}
</script>

<style scoped>
.ClarificationComment {
  margin: 10px;
  border: #e1e4e8 1px solid;
}

.CommentHeader {
  background: #f6f8fa;
  padding-left: 2%;
  height: 40px;
  line-height: 40px;
  position: relative;
  border-bottom: #e1e4e8 1px solid;
  box-sizing: border-box;
}

.ClarificationComment {
  background: #fff
}

.CommentHeader .options{
  display: inline-block;
  position: absolute;
  right: 3%;
  font-size: 150%;
}

.username {
  border-bottom: 1px solid;
}

.replyTarget {
  padding: 20px 20px;
  border-bottom: none;
}

.reply {
  border: #e1e4e8 1px solid;
}

/deep/ .v-note-wrapper {
  z-index: 0 !important;
}

/deep/ .v-show-content {
  background-color: #fff !important;
}

</style>
