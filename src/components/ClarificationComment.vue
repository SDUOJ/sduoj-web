<template>
  <div class="ClarificationComment" style="margin: 10px">
    <div class="CommentHeader">
      <a class="username">{{username}}</a> <p style="display: inline-block; margin-left: 5px">commented {{time}} ago</p>
      <Dropdown placement="bottom-start" class="options" @on-click="selectMenu">
        <a>...</a>
        <DropdownMenu slot="list">
          <DropdownItem name="Copy">Copy Link</DropdownItem>
          <DropdownItem name="QA">Quick Answer</DropdownItem>
          <DropdownItem name="Edit">Edit</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
    <Markdown :value="ClarificationContent || ''" style="min-height: 100px" class="markdown" />
  </div>
</template>

<script>
import Markdown from './editor/Markdown';
export default {
  name: 'ClarificationComment',
  components: { Markdown },
  props: [
    'username',
    'time',
    'ClarificationContent'
  ],
  methods: {
    selectMenu(name) {
      if (name === 'QA') {
        this.$emit('change-form-visible', true)
      }
      if (name === 'Edit') {
        this.$emit('change-form-visible', true)
      }
      if (name === 'Copy') {

      }
    }
  }
}
</script>

<style lang="less" scoped>
.CommentHeader {
  background: #e1f0fe;
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
  background-color: #e1f0fe;
  display: block;
}

.ClarificationComment {
  border-radius: 10px;
  background: #e8eaec;
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

/deep/ .v-note-wrapper {
  z-index: 0;
}

</style>
