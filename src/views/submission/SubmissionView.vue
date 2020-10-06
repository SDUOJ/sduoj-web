<template>
  <div class="container">
    <Card class="filter" dis-hover :padding="0">
        <h3 slot="title" style="display: inline">过滤</h3>
        <div slot="extra" class="btns card-extra">
          <Button type="text" @click="onFiltering">过滤</Button>
          <Button type="text" @click="onReset">重置</Button>
        </div>
      <div class="clearfix filter-sets">
        <div>
          <div class="filter-title">由用户</div>
          <Input v-model="filterOption.username"
            placeholder="Username"
            style="width: 200px;"
            @on-enter="onFiltering">
          </Input>
        </div>
        <div>
          <div class="filter-title">由题目</div>
          <Input v-model="filterOption.problemCode"
            placeholder="Problem Code"
            style="width: 200px;"
            @on-enter="onFiltering">
          </Input>
        </div>
        <div>
          <div class="filter-title">由评测结果</div>
          <Input v-model="filterOption.judgeResult"
            placeholder="Status"
            style="width: 200px;"
            @on-enter="onFiltering">
          </Input>
        </div>
        <div>
          <div class="filter-title">由语言</div>
          <Input v-model="filterOption.lang"
            placeholder="Language"
            style="width: 200px;"
            @on-enter="onFiltering">
          </Input>
        </div>
      </div>
    </Card>
    <Card class="clearfix" dis-hover :padding="0">
      <Table
        class="data-table"
        :columns="columns"
        :data="submissions"
        :loading="loading"
        @on-sort-change="handleSortBy"
        @on-cell-click="onTableClick"></Table>
      <div class="pages">
        <Page
          size="small" show-elevator show-sizer
          :total="total"
          :current.sync="pageNow"
          @on-change="onPageChange"
          @on-page-size-change="onPageSizeChange"/>
      </div>
    </Card>
  </div>
</template>

<script>
import ProblemCode from '_c/ProblemCode';
import JudgeResult from '_c/JudgeResult';
import api from '_u/api';

export default {
  data: function() {
    return {
      columns: [
        { title: '#', key: 'submissionId', minWidth: 70 },
        { title: '用户', key: 'username' },
        {
          title: '题目',
          key: 'problemCode',
          minWidth: 15,
          render: (h, params) => {
            if (params.row.problemCode !== undefined) {
              if (params.row.problemCode.length > 20) {
                const texts = params.row.problemCode.substring(0, 20) + '...';
                return h('Tooltip', {
                  props: {
                    placement: 'top',
                    maxWidth: '180'
                  }
                }, [
                  h(ProblemCode, {
                    class: 'hover',
                    props: {
                      problemCode: texts
                    }
                  }),
                  h('span', {
                    slot: 'content',
                    style: {
                      whiteSpace: 'normal',
                      wordBreak: 'break-all'
                    }
                  }, params.row.problemCode)
                ]);
              } else {
                return h(ProblemCode, {
                  class: 'hover',
                  props: {
                    problemCode: params.row.problemCode
                  }
                });
              }
            }
          }
        },
        {
          title: '评测结果',
          key: 'judgeResult',
          minWidth: 100,
          render: (h, params) => h(JudgeResult, { props: { result: params.row.judgeResult } })
        },
        { title: '用时', key: 'usedTime', sortable: true, maxWidth: 90 },
        { title: '内存', key: 'usedMemory', sortable: true, maxWidth: 90 },
        { title: '语言', key: 'language' },
        {
          title: '提交时间',
          key: 'gmtCreate',
          minWidth: 55,
          render: (h, params) => {
            return h('Time', { props: { time: parseInt(params.row.gmtCreate), type: 'datetime' } })
          }
        }
      ],
      submissions: [],
      filterOption: {
        username: '',
        problemCode: '',
        judgeResult: '',
        language: ''
      },
      total: 0,
      pageNow: 1,
      pageSize: 10,
      sortBy: '',
      ascending: false,
      loading: false
    }
  },
  methods: {
    onFiltering: function() {
      this.loading = true;
      api.getSubmissionList({
        ...(this.filterOption),
        sortBy: this.sortBy,
        ascending: this.ascending,
        pageNow: this.pageNow,
        pageSize: this.pageSize
      }).then(ret => {
        this.submissions = ret.rows;
        this.total = parseInt(ret.total) * parseInt(ret.totalPage);
      }).finally(() => { this.loading = false });
    },
    clearFilterOptions: function() {
      for (const key in this.filterOption) {
        this.filterOption[key] = '';
      }
    },
    onReset: function() {
      this.clearFilterOptions();
    },
    onPageChange: function(pageNow) {
      this.pageNow = pageNow;
    },
    onPageSizeChange: function(pageSize) {
      this.pageSize = pageSize;
    },
    handleSortBy: function({ column, key, order }) {
      if (order === 'normal') {
        this.sortBy = '';
        this.ascending = false
      } else {
        this.sortBy = key;
        this.ascending = order === 'asc';
      }
      this.onFiltering();
    },
    onTableClick: function(row, col) {
      if (col.key === 'judgeResult') {
        this.$router.push({
          name: 'submission-detail',
          params: {
            submissionId: row.submissionId
          }
        });
      }
      if (col.key === 'problemCode') {
        this.$router.push({
          name: 'problem-detail',
          params: {
            problemCode: row.problemCode
          }
        })
      }
    }
  },
  watch: {
    pageNow: function() {
      this.onFiltering();
    },
    pageSize: function() {
      this.onFiltering();
    }
  },
  mounted: function() {
    this.filterOption = Object.assign(this.$route.params);
    this.onFiltering();
  }
}
</script>

<style lang="less" scoped>
.filter {
  margin-bottom: 20px;
}

.filter-sets {
  margin: 10px 20px;
  display: flex;
  justify-content: space-between;
}

.filter-title {
  font-weight: 500;
  margin-bottom: 3px;
}

.btns {
  // position: relative;
  // top: -7px;
  .ivu-btn:hover {
    background: rgba(0, 0, 0, .05);
  }
}

.data-table {
  user-select: none;
}

.pages {
  float: right;
  margin: 20px auto;
  padding-right: 15px;
}

</style>
