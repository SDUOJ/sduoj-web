<template>
  <Table
    :columns="problemColumn"
    :data="problems"
    @on-cell-click="handleCellClick"
    :show-header="showHeader" />
</template>

<script>
import JudgeResult from '_c/JudgeResult';
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
          key: 'judgeResult',
          render: (h, params) => {
            if (params.row.judgeResult === 1) {
              return h(JudgeResult, { props: { result: 1 } });
            } else {
              return '';
            }
          }
        },
        {
          // TODO: 展示 通过数/总提交数
          title: 'AC/Total',
          key: 'acRate'
        },
        {
          title: '#',
          key: 'problemCode',
          render: (h, params) => h('strong', { class: 'hover' }, utils.contestProblemId(params.row.problemCode))
        },
        {
          title: 'Problem Title',
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
