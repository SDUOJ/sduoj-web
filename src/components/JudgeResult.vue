<!--
   Copyright 2020-2020 the original author or authors.

   Licensed under the General Public License, Version 3.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

        https://www.gnu.org/licenses/gpl-3.0.en.html
 -->

<template>
  <div class="judge-result">
    <template v-if="result !== -1">
      <Icon :type="JUDGE_RESULT[result].icon" :color="JUDGE_RESULT[result].color" />
      <span :class="`${judgeResult2Class(result)} hover`">{{ judgeResult2Text(result) }}</span>
    </template>
  </div>
</template>

<script>
import { JUDGE_RESULT } from '_u/constants';

export default {
  props: {
    result: {
      type: Number,
      default: -1
    },
    abbr: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    JUDGE_RESULT: () => JUDGE_RESULT
  },
  methods: {
    judgeResult2Text: function (judgeResult) {
      if (judgeResult === -1) {
        return '';
      }
      return JUDGE_RESULT[judgeResult][this.abbr ? 'abbr' : 'name'];
    },
    judgeResult2Class: judgeResult => {
      if (judgeResult === -1) {
        return '';
      }
      return JUDGE_RESULT[judgeResult].css;
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
    font-weight: bold;
  }

  /*.verdict-accepted:hover {*/
  /*  cursor: pointer;*/
  /*}*/

  // judge failed
  .verdict-failed {
    color: #d9534f;
    font-weight: bold;
  }

  /*.verdict-failed:hover {*/
  /*  cursor: pointer;*/
  /*}*/

  // judge pending
  .verdict-pending {
    color: grey;
    font-weight: bold;
  }

  /*.verdict-pending:hover {*/
  /*  cursor: pointer;*/
  /*}*/

  // compile error
  .verdict-compile-error {
    color: #ffa500;
    font-weight: bold;
  }

  /*.verdict-compile-error:hover {*/
  /*  cursor: pointer;*/
  /*}*/

  .verdict-system-error {
    color: rebeccapurple;
    font-weight: bold;
  }

</style>
