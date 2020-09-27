<template>
  <div class="container">
    <Card class="filter">
      <div slot="header">
        <span>过滤</span>
        <div class="btns">
          <Button type="text" @click="onFiltering">过滤</Button>
          <Button type="text" @click="onReset">重置</Button>
        </div>
      </div>
      <div class="clearfix filter-sets">
        <div>
          <div class="filter-title">由用户</div>
          <Input v-model="filterOpetions.username" 
            placeholder="Username" 
            style="width: 200px;"
            @on-enter="onFiltering">
          </Input>
        </div>
        <div>
          <div class="filter-title">由题目</div>
          <Input v-model="filterOpetions.problemId" 
            placeholder="Problem ID" 
            style="width: 200px;"
            @on-enter="onFiltering">
          </Input>
        </div>
        <div>
          <div class="filter-title">由评测结果</div>
          <Input v-model="filterOpetions.judgeResult" 
            placeholder="Status" 
            style="width: 200px;"
            @on-enter="onFiltering">
          </Input>
        </div>
        <div>
          <div class="filter-title">由语言</div>
          <Input v-model="filterOpetions.lang" 
            placeholder="Language" 
            style="width: 200px;"
            @on-enter="onFiltering">
          </Input>
        </div>
      </div>
    </Card>
    <div class="clearfix">
      <Table stripe :columns="columns" :data="submissionFilted" class="data-table"></Table>
      <div class="pages">
        <Page 
          size="small" show-elevator show-sizer
          :total="totalPage" 
          :current.sync="curPage"
          @on-change="onPageChange"
          @on-page-size-change="onPageSizeChange"/>
      </div>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card';
import utils from '@/utils';

export default {
  components: { Card },
  data: function() {
    return {
      columns: [
        { title: '#', key: 'submissionId', sortable: true },
        { title: '用户', key: 'username' },
        { title: '题目', key: 'problemId' },
        { 
          title: '评测结果', 
          key: 'judgeResult',
          minWidth: 50,
          render: (h, params) => h('span', {  class: utils.status2Class(params.row.judgeResult) }, utils.judgeResultMap[params.row.judgeResult])
        },
        { title: '用时', key: 'time', sortable: true },
        { title: '内存', key: 'memory', sortable: true },
        { title: '语言', key: 'lang' },
        { 
          title: '提交时间',
          key: 'when',
          minWidth: 50,
          render: (h, params) => h('span', utils.dateFormat(params.row.when, 'yyyy-MM-dd hh:mm:ss'))
        }
      ],
      submissions: [],
      submissionFilted: [],
      filterOpetions: {
        username: '',
        problemId: '',
        judgeResult: '',
        lang: ''
      },
      totalPage: 1,
      curPage: 1,
      pageSize: 10
    }
  },
  methods: {
    onFiltering: function() {
      let matched = this.submissions;
      matched = matched.filter(item => item.username.toLowerCase().indexOf(this.filterOpetions.username) !== -1);
      matched = matched.filter(item => item.problemId.toString().startsWith(this.filterOpetions.problemId));
      if (this.filterOpetions.judgeResult) {
        matched = matched.filter(item => item.judgeResult === utils.result2Status(this.filterOpetions.judgeResult));
      }
      matched = matched.filter(item => item.lang.toLowerCase().indexOf(this.filterOpetions.lang) !== -1);
      this.submissionFilted = matched;
    },
    clearFilterOptions: function() {
      for (const key in this.filterOpetions) {
        this.filterOpetions[key] = '';
      }
    },
    onReset: function() {
      this.clearFilterOptions();
      this.submissionFilted = this.submissions;
    },
    onPageChange: function(curPage) {
      this.curPage = curPage;
      console.log(this.curPage);
    },
    onPageSizeChange: function(pageSize) {
      this.pageSize = pageSize;
      console.log(this.pageSize);
    }
  },
  mounted: function() {
    this.curPage = 1;
    this.totalPage = 1;
    this.submissions = [
      { submissionId: 1, username: 'Gene_Liu', problemId: '1001', judgeResult: 0, time: 0, memory: 0, lang: 'C++', when: 1601176071000 },
      { submissionId: 2, username: 'Gene_Liu', problemId: '1001', judgeResult: 1, time: 5, memory: 100, lang: 'C++', when: 1601176071000 },
      { submissionId: 3, username: 'TTTT', problemId: '1001', judgeResult: 2, time: 5, memory: 100, lang: 'C++', when: 1601176051000 },
      { submissionId: 4, username: 'jeshrz', problemId: '1001', judgeResult: 8, time: 0, memory: 0, lang: 'C++', when: 1601176001000 }
    ];
    this.onFiltering();
  }
}
</script>

<style lang="less" scoped>
.filter {
  margin-bottom: 20px;
}

.filter-sets {
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
}

.filter-title {
  font-weight: 500;
  margin-bottom: 3px;
}

.btns {
  float: right;
  position: relative;
  top: -5px;
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
}

</style>