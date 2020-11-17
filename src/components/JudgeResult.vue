<!--
   Copyright 2020-2020 the original author or authors.

   Licensed under the General Public License, Version 3.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

        https://www.gnu.org/licenses/gpl-3.0.en.html
 -->

<template>
  <div class="judge-result" v-if="result !== JUDGE_RESULT_TYPE.END">
    <Icon :type="judgeResult.icon" :color="judgeResult.color" />
    <span :class="`${judgeResult.css} hover`">{{ abbr ? judgeResult.abbr : judgeResult.name }}</span>
    <template v-if="result === JUDGE_RESULT_TYPE.JG && total > 0">
      <span :class="`${judgeResult.css} hover`">{{ ` (${current}/${total})` }}</span>
    </template>
  </div>
</template>

<script>
import { JUDGE_RESULT, JUDGE_RESULT_TYPE } from '_u/constants';

export default {
  props: {
    result: {
      type: Number,
      default: JUDGE_RESULT_TYPE.END
    },
    abbr: {
      type: Boolean,
      default: false
    },
    total: {
      type: Number,
      default: 0
    },
    current: {
      type: Number,
      default: 0
    }
  },
  computed: {
    judgeResult: function() {
      return JUDGE_RESULT[this.result]
    },
    JUDGE_RESULT_TYPE: () => JUDGE_RESULT_TYPE
  }
}
</script>

<style lang="less" scoped>
  .judge-result {
    display: inline;
  }

  .verdict-accepted {
    color: #5cb85c;
    font-weight: bold;
  }

  // judge failed
  .verdict-failed {
    color: #d9534f;
    font-weight: bold;
  }

  // judge pending
  .verdict-pending {
    color: grey;
    font-weight: bold;
  }

  // compile error
  .verdict-compile-error {
    color: #ffa500;
    font-weight: bold;
  }

  .verdict-system-error {
    color: rebeccapurple;
    font-weight: bold;
  }

</style>
