<template>
  <Table
    :columns="problemColumn"
    :data="problems"
    @on-cell-click="handleCellClick"
    :show-header="showHeader" />
</template>

<script>
import JudgeResult from './JudgeResult';
import utils from '_u';

export default {
  name: 'ContestProblem',
  props: {
    problems: {
      type: Array,
      default: () => []
    },
    showHeader: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      problemColumn: [
        {
          key: 'status',
          minWidth: 30,
          render: (h, params) => h(JudgeResult, { props: { result: params.row.judgeResult } })
        },
        {
          // TODO: 展示 通过数/总提交数
          key: 'acRate'
        },
        {
          key: 'problemCode',
          render: (h, params) => h('strong', { class: 'hover' }, utils.contestProblemId(params.row.problemCode))
        },
        {
          key: 'problemTitle',
          render: (h, params) => h('span', { class: 'hover' }, params.row.problemTitle)
        }
      ]
    }
  },
  methods: {
    handleCellClick: function(row, column, data, event) {
      this.$emit('on-cell-click', row, column, data, event);
    }
  }
}
</script>

<style scoped>

</style>
