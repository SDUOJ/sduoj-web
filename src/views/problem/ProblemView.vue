<template>
    <div>
      <!-- 页面容器 -->
      <div class="container">
        <Row>
          <!-- 页面左边部分 -->
          <Col span="19" class="main-lf">
            <div class="problem-set">
              <!-- 题库 header -->
              <div class="problem-set-header">
                <span class="problem-set-header-name">题库</span>
                <div class="problem-set-header-switch">
                  <i-switch size="large" @on-change="switchTag">
                    <span slot="open">标签</span>
                    <span slot="close">标签</span>
                  </i-switch>
                </div>
              </div>
              <!-- 题库 header -->

              <!-- 题库 content -->
              <div class="problem-set-content">
                  <Table :columns="problemTableColumns" :data="problemTableData" class="problem-set-content-table" @on-cell-click="handleProblemClick"></Table>
                  <Page 
                    class="problem-set-content-page"
                    size="small" show-elevator show-sizer
                    :total="totalPage" 
                    :current.sync="curPage"
                    @on-change="onPageChange"
                    @on-page-size-change="onPageSizeChange"/>
                  <!-- <Page :total="100" :current="1" show-elevator class="problem-set-content-page"/> -->
              </div>
              <!-- 题库 content -->
            </div>
          </Col>
          <!-- 页面左边部分 -->

          <!-- 页面右边部分 -->
          <Col span="5" class="main-rf">
            <!-- 搜索框 -->
            <div class="problem-search">
              <Input suffix="ios-search" placeholder="题目查询"/>
            </div>
            <!-- 搜索框 -->

            <!-- 标签分类 -->
            <div class="problem-tags">
              <!-- header -->
              <div class="problem-tags-header">
                分类
              </div>
              <!-- header -->
              <!-- 标签内容 -->
              <div class="problem-tags-content">
                <Row> 
                  <Col span="12" class="problem-tags-content-col"> 
                    <template v-for="(ptag, index) in tags">
                      <div class="problem-tags-content-line" v-if="index % 2 === 0" :key="ptag.name">
                        <Poptip trigger="hover" placement="left" :disabled="(ptag.children || []).length === 0" word-wrap width="300">
                          <span>{{ ptag.name }}</span>
                          <div slot="content" class="problem-tags-content-poptip">
                            <span v-for="tag in (ptag.children || [])" :key="tag"> {{ tag }}</span>
                          </div>
                        </Poptip>  
                      </div>
                    </template>
                  </Col>
                  <Col span="12" class="problem-tags-content-col"> 
                    <template v-for="(ptag, index) in tags">
                      <div class="problem-tags-content-line" v-if="index % 2 === 1" :key="ptag.name">
                        <Poptip trigger="hover" placement="right" :disabled="(ptag.children || []).length === 0" word-wrap width="300">
                          <span>{{ ptag.name }}</span>
                          <div slot="content" class="problem-tags-content-poptip">
                            <span v-for="tag in (ptag.children || [])" :key="tag"> {{ tag }}</span>
                          </div>
                        </Poptip>  
                      </div>
                    </template>
                  </Col>
                </Row>
              </div>
              <!-- 标签内容 -->
            </div>
            <!-- 标签分类 -->
          </Col>
          <!-- 页面右边部分 -->
        </Row>
      </div>
      <!-- 页面容器 -->
    </div>
</template>

<script>
export default {
  data () {
    return {
      problemTableColumns: [
        {
          title: '题目编码',
          key: 'ojProblemId',
          width: 210,
          render: (h, params) => {
            let texts = '';
            if (params.row.ojProblemId !== null) {
              if (params.row.ojProblemId.length > 20) {
                texts = params.row.ojProblemId.substring(0, 20) + '...';
                const strs = texts.split('-');
                strs[1] = ' ' + strs[1]
                return h('Tooltip', {
                  props: {
                    placement: 'top',
                    maxWidth: '180'
                  }
                }, [
                  h('strong', strs[0]),
                  strs[1],
                  h('span', {
                    slot: 'content',
                    style: {
                      whiteSpace: 'normal',
                      wordBreak: 'break-all'
                    }
                  }, params.row.ojProblemId)
                ]);
              } else {
                texts = params.row.ojProblemId;
                const strs = texts.split('-');
                strs[1] = ' ' + strs[1]
                return h('span', [
                  h('strong', strs[0]),
                  strs[1]
                ]);
              }
            }
          }
        },
        {
          title: '标题',
          key: 'problemInfo',
          minWidth: 150,
          render: (h, params) => {
            if (params.row.problemInfo.ifPass === 0) {
              return h('span', { class: 'hover' },
                params.row.problemInfo.name);
            } else {
              return h('span', { class: 'hover' }, [
                params.row.problemInfo.name,
                ' ',
                h('Icon', {
                  props: {
                    type: 'md-checkmark'
                  },
                  style: {
                    color: '#229954',
                    fontSize: '16px',
                    verticalAlign: 'middle'
                  }
                })]);
            } 
          }
        },
        {
          title: '通过数',
          key: 'acNumber',
          width: 100,
          sortable: true
        }
      ],
      problemTableData: [
        {
          ojProblemId: 'POJ-1001',
          problemInfo: {
            name: 'A + B Problem',
            ifPass: 0
          },
          tags: ['模拟', '暴力', '思维'],
          acNumber: 4586
        },
        {
          ojProblemId: 'HDU-1200',
          problemInfo: {
            name: 'GZS 与古英文字典',
            ifPass: 1
          },
          tags: ['暴力', '字典树', '字符串'],
          acNumber: 339
        },
        {
          ojProblemId: 'CodeForces-1221A',
          problemInfo: {
            name: 'GZS 的三角形',
            ifPass: 1
          },
          tags: ['找规律'],
          acNumber: 179
        },
        {
          ojProblemId: 'SDUOJ-1200',
          problemInfo: {
            name: 'GZS 与素数大法',
            ifPass: 0
          },
          tags: ['数学', '线性筛', '莫比乌斯反演', '模拟', '线性筛', '莫比乌斯反演'],
          acNumber: 352
        },
        {
          ojProblemId: 'AtCoder-soundhound2018_summer_qual_e',
          problemInfo: {
            name: '吉老师的线段树和瑞瑞一起',
            ifPass: 1
          },
          tags: ['数据结构', '线段树'],
          acNumber: 3532
        }
      ],
      tags: [
        {
          name: '动态规划',
          children: [
            '区间DP',
            '线性DP',
            '树形DP',
            '背包',
            '线段树',
            '状压DP',
            '概率DP',
            '数位DP',
            '斜率优化'
          ]
        },
        {
          name: '搜索',
          children: [
            '状压DP',
            '数位DP',
            '背包'
          ]
        },
        {
          name: '数据结构',
          children: []
        },
        {
          name: '数论'
        },
        {
          name: '树结构'
        },
        {
          name: '图结构'
        },
        {
          name: '组合数学'
        },
        {
          name: '贪心'
        },
        {
          name: '字符串'
        },
        {
          name: '模拟'
        },
        {
          name: '高精度'
        },
        {
          name: '概率论'
        },
        {
          name: '线性代数'
        },
        {
          name: '交互题'
        },
        {
          name: '计算几何'
        },
        {
          name: '其他'
        }
      ],
      totalPage: 100,
      curPage: 1,
      pageSize: 10
    }
  },
  methods: {
    switchTag: function(open) {
      if (open) {
        this.problemTableColumns = [
          ...this.problemTableColumns.slice(0, 2), 
          {
            title: '标签',
            key: 'tags',
            align: 'right',
            minWidth: 270,
            ellipsis: true,
            render: (h, params) => {
              return h('div', { class: 'problem-set-tags' },
                params.row.tags.map(item => {
                  return h('div', { class: 'problem-set-tagbox' }, [
                    h('div', { class: 'problem-set-tag' }, item)
                  ])
                }));
            }
          },
          ...this.problemTableColumns.slice(2)
        ]
      } else {
        this.problemTableColumns = this.problemTableColumns.filter(item => item.key !== 'tags');
      }
    },
    onPageChange: function(curPage) {
      this.curPage = curPage;
      console.log(this.curPage);
    },
    onPageSizeChange: function(pageSize) {
      this.pageSize = pageSize;
      console.log(this.pageSize);
    },
    handleProblemClick: function(row, col) {
      if (col.key === 'name') {
        this.$router.push('/problem/' + row.problemId);
      }
    }
  }
}
</script>

<style lang="less" scoped>
.problem-set {
  border-radius: 4px;
  // 题库表头
  .problem-set-header {
    height: 45px;
    margin-right: 20px;
    background-color: #f7f7f8;
    border: 1px solid #d4d4d5;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;

    .problem-set-header-name {
      padding-left: 15px;
      line-height: 45px;
      font-size: 1.2em;
      font-weight: bold;
    }
    
    .problem-set-header-switch {
      float: right;
      padding-right: 30px;
      padding-top: 10px;
    }
  }
}
</style>

<style lang="less">
li {
  list-style: none;
}

.problem-set {
  // 题库内容
  .problem-set-content {
    margin-right: 20px;
    border-left: 1px solid #d4d4d5;

    .problem-set-content-table {
      border-right: 1px solid #d4d4d5;
      // ivu 表格头部
      .ivu-table-header {
        padding-right: 0;
        th {
          background-color: #fff;
        }
      }
      // ivu 表格内部
      .ivu-table-body {
        padding-right: 0;
      }
      .ivu-table-row-hover td {
          background-color: #fbfcfc;
      }
      // ivu 数据内容
      .problem-set-name {
        float: left;
      }
      .problem-set-tags {
        float: right;
        .problem-set-tagbox {
          margin: 2px;
          background-color: #F8F9F9;
          float: right;
          border-radius: 4px;
          .problem-set-tag {
            user-select: none;
            margin: 4px 6px;
          }
        }
      }
    }

    // 题库分页栏
    .problem-set-content-page {
      margin-top: 15px;
      float: right;
    }
  }
}

// 题库搜索框
.problem-search {
  .ivu-input:hover {
    border-color: #CACFD2;
  }
  .ivu-input-default:focus {
    border-color: #BDC3C7;
    box-shadow: 0 0 0 0.5px rgba(154, 154, 154, 0.1);
  }
}

// 题库标签搜索
.problem-tags {
  margin-top: 12px;
  border: 1px solid #d4d4d5;
  border-radius: 4px;
  .problem-tags-header {
    padding: 20px 25px 17px 35px;
    font-size: 1.4em;
    color: #797f7f;
  }
  .problem-tags-content {
    margin-bottom: 14px;
    .problem-tags-content-col {
      padding-left: 25px;
      .problem-tags-content-line  {
        margin-bottom: 16px;
      }
    }
    span {
      white-space: nowrap;
      padding: 10px 10px;
      border-radius: 2px;
      font-size: 1.1em;
      color: #797d7f;
      transition: all .2s linear;
    }
    span:hover {
      // background-color: #C0392B;
      // color: #fff;
      background-color: #F7F9F9;
      color: #A93226;
      transition: all .2s linear;
    }
    .problem-tags-content-poptip {
      span {
        display: inline-block;
        margin-right: 5px;
        line-height: 20px;
      }
    }
  }
}
</style>