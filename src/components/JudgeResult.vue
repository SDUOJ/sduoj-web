<!--
   Copyright 2020-2020 the original author or authors.

   Licensed under the General Public License, Version 3.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

        https://www.gnu.org/licenses/gpl-3.0.en.html
 -->

<template>
  <div class="judge-result">
    <Icon type="md-information" color="grey" v-if="result === 0"/>
    <Icon type="md-checkmark" color="#5cb85c" v-else-if="result === 1"/>
    <Icon type="md-close" color="orange" v-else-if="result === 8"/>
    <Icon type="md-close" color="#d9534f" v-else-if="result !== -1"/>
    &nbsp;
    <span :class="judgeResult2Class(result)">{{ judgeResult2Text(result) }}</span>
  </div>
</template>

<script>
import utils from '_u';

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
  methods: {
    judgeResult2Text: function(judgeResult) {
      if (judgeResult === -1) {
        return '';
      }
      return this.abbr ? utils.judgeResultMapAbbr[judgeResult] : utils.judgeResultMap[judgeResult];
    },
    judgeResult2Class: judgeResult => {
      if (judgeResult === -1) {
        return '';
      }
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
  font-weight: bold;
}
.verdict-accepted:hover {
  cursor: pointer;
}

// judge failed
.verdict-failed {
  color: #d9534f;
  font-weight: bold;
}
.verdict-failed:hover {
  cursor: pointer;
}

// judge pending
.verdict-pending {
  color: grey;
  font-weight: bold;
}
.verdict-pending:hover {
  cursor: pointer;
}

// judge
.verdict-compile-error {
  color: #ffa500;
  font-weight: bold;
}
.verdict-compile-error:hover {
  cursor: pointer;
}
</style>
