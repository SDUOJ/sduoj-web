<template>
  <div class="ClarificationComment" style="margin: 10px">
    <div class="CommentHeader">
      <a class="username">{{username}}</a> <p style="display: inline-block; margin-left: 5px">commented {{time}}</p>
      <Dropdown placement="bottom-start" class="options" @on-click="selectMenu">
        <a>...</a>
        <DropdownMenu slot="list">
          <DropdownItem name="Copy">Copy Link</DropdownItem>
          <DropdownItem name="QA">Quick Answer</DropdownItem>
          <DropdownItem name="Edit" v-if="isAdmin">Edit</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
    <div class="markdown">
      <Markdown class="replyRoot" :value="replyRoot" v-if="replyRoot" />
      <Markdown :value="ClarificationContent"  style="min-height: 100px; margin-top: 10px" />
    </div>
  </div>
</template>

<script>
import Markdown from './editor/Markdown';
import { mapGetters } from 'vuex';
export default {
  name: 'ClarificationComment',
  components: { Markdown },
  props: [
    'username',
    'time',
    'ClarificationContent',
    'contestClarificationId',
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
      if (name === 'Copy') {
        window.clipboardData.setData('Text', this.location.href);
        this.$Message.success('复制到剪贴板')
      }
    }
  },
  computed: {
    ...mapGetters('user', ['isAdmin'])
  }
}
</script>

<style scoped>
.CommentHeader {
  background: #FFFFCC;
  padding-left: 2%;
  height: 40px;
  line-height: 40px;
  position: relative;
}

.CommentHeader::before {
  position: absolute;
  top: 11px;
  right: 100%;
  left: -8px;
  display: block;
  width: 8px;
  height: 16px;
  pointer-events: none;
  content: " ";
  -webkit-clip-path: polygon(0 50%,100% 0,100% 100%);
  clip-path: polygon(0 50%,100% 0,100% 100%);
  background-color: #FFFFCC;
  display: block;
}

.ClarificationComment {
  border-radius: 10px;
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

.replyRoot {
  padding-left: 2px;
  padding: 1% 1%;
  color: #BDC3C7;
}

/deep/ .v-note-wrapper {
  z-index: 0 !important;
}

</style>
