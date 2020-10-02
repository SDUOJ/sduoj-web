<template>
  <div class="judge-result">
    <Icon type="md-information" color="grey" v-if="result === 0"/>
    <Icon type="md-checkmark" color="#5cb85c" v-else-if="result === 1"/>
    <Icon type="md-close" color="orange" v-else-if="result === 8"/>
    <Icon type="md-close" color="#d9534f" v-else/>
    &nbsp;
    <span :class="judgeResult2Class(result)">{{ judgeResult2Text(result) }}</span>
  </div>
</template>

<script>
import utils from '@/utils';

export default {
  props: {
    result: {
      type: Number,
      default: 0
    }
  },
  methods: {
    judgeResult2Text: judgeResult => utils.judgeResultMap[judgeResult],
    judgeResult2Class: judgeResult => {
      if (judgeResult === 0) {
        return 'verdict-pending';
      } else if (judgeResult === 1) {
        return 'verdict-accepted';
      } else if (judgeResult === 8) {
        return 'verdict-compile-error';
      } else {
        return 'verdict-failed';
      }
    }
  }

}
</script>

<style lang="less" scoped>
.judge-result {
  display: inline;
}
.verdict-accepted {
  color: #5cb85c;
  font-weight: 500;
}
.verdict-accepted:hover {
  cursor: pointer;
}

// judge failed
.verdict-failed {
  color: #d9534f;
  font-weight: 500;
}
.verdict-failed:hover {
  cursor: pointer;
}

// judge pending
.verdict-pending {
  color: grey;
  font-weight: 500;
}
.verdict-pending:hover {
  cursor: pointer;
}

// judge 
.verdict-compile-error {
  color: orange;
  font-weight: 500;
}
.verdict-compile-error:hover {
  cursor: pointer;
}
</style>