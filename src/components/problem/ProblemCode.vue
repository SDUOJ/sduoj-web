<!--
   Copyright 2020-2022 the original author or authors.

   Licensed under the Affero General Public License, Version 3.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

        https://www.gnu.org/licenses/agpl-3.0.en.html
 -->

<template>
  <span>
    <strong>{{ oj }}</strong>-{{ code }}
  </span>
</template>

<script>
export default {
  name: 'ProblemCode',
  props: {
    problemCode: {
      type: String,
      default: '-'
    }
  },
  computed: {
    oj: function () {
      return this.problemCode.split('-')[0];
    },
    code: function () {
      return this.problemCode.split('-')[1];
    }
  }
}
</script>

<style scoped>

</style>
