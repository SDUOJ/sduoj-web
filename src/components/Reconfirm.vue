<template>
  <Modal
    v-model="modalFlag"
    :title="title"
    witdh="446px"
    transfer>
    <div class="warnDiv" style="">
        <div v-html="message"></div>
    </div>
    <div class="confirmText" style="margin-top: 36px;">
      <div>
        <span>Please type </span><strong>{{ confirmText }}</strong><span> to confirm.</span>
      </div>
      <Input v-model="typein" style="width: 100%" @on-change="checkTypein" />
    </div>
    <div slot="footer">
      <Button class="confirmButton" @click="callback" long type="error" :disabled="!checked">{{ buttonText }}</Button>
    </div>
  </Modal>
</template>

<script>
const doNothing = function() {}

export default {
  name: 'Reconfirm',
  props: {
    title: {
      type: String,
      default: 'Reconfirm'
    },
    message: {
      type: String,
      default: ''
    },
    confirmText: {
      type: String,
      default: ''
    },
    buttonText: {
      type: String,
      default: 'Confirm'
    }
  },
  data: function() {
    return {
      modalFlag: false,
      typein: '',
      checked: false,
      callback: doNothing
    }
  },
  methods: {
    reconfirm: function(callback) {
      this.callback = callback;
      this.typein = '';
      this.modalFlag = true;
    },
    checkTypein: function() {
      this.checked = this.typein === this.confirmText;
    }
  }
}
</script>

<style lang="less" scoped>
@sdu-red: #d84a2b;

.warnDiv {
  background-color: #fffbdd;
  border-color: rgba(176,136,0,0.2);
  color: #24292e;
  margin: -16px;
  padding: 20px 16px;

  div {
    font-size: 14px;
    font-weight: 500;
    line-height: 1.5;
  }
}

.confirmText {
  margin-top: 36px;
  div {
    margin-bottom: 4px;
  }
}

.confirmButton {
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  white-space: nowrap;
  vertical-align: middle;

  color: #d73a49;
  background-color: #fafbfc;
  border-color: rgba(27,31,35,0.15);

  &:disabled {
    cursor: default;
    color: rgba(215,58,73,0.5);
    box-shadow: none;
  }

  &:not(:disabled):hover {
    color: #fff;
    background-color: #cb2431;
    border-color: rgba(27,31,35,0.15);
    box-shadow: 0 1px 0 rgba(27,31,35,0.1), inset 0 1px 0 hsla(0,0%,100%,0.03);
  }
}
</style>
