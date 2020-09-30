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
                  <Table :columns="columns5" :data="data5" class="problem-set-content-table" @on-cell-click="handleProblemClick"></Table>
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

                <!-- <Row class="problem-tags-content-line" v-for="ptag in tags" :key="ptag.name">
                  <Col span="12" class="problem-tags-content-col">
                    <Poptip trigger="hover" placement="left" :disabled="ptag.children.length === 0" word-wrap width="300">
                        <span>{{ ptag.name }}</span>
                        <div slot="content" class="problem-tags-content-poptip">
                          <span v-for="tag in ptag.children" :key="tag"> {{ tag }}</span>
                        </div>
                      </Poptip> 
                  </Col>
                </Row> -->
<!-- 
                <Row class="problem-tags-content-line">
                    <Col span="12" class="problem-tags-content-col">
                      <Poptip trigger="hover" placement="left" :disabled="false" word-wrap width="300">
                        <span>动态规划</span>
                        <div slot="content" class="problem-tags-content-poptip">
                          <span>区间DP</span>
                          <span>树形DP</span>
                          <span>线性DP</span>
                          <span>背包</span>
                          <span>线段树</span>
                          <span>状压DP</span>
                          <span>概率DP</span>
                          <span>数位DP</span>
                          <span>斜率优化DP</span>
                        </div>
                      </Poptip>
                    </Col>

                    <Col span="12" class="problem-tags-content-col">
                      <Poptip trigger="hover" placement="right" :disabled="false" word-wrap width="200">
                        <span>搜索</span>
                        <div slot="content" class="problem-tags-content-poptip">
                          <span>区间DP</span>
                          <span>树形DP</span>
                        </div>
                      </Poptip>
                    </Col>
                </Row>

                <Row class="problem-tags-content-line">
                  <Col span="12" class="problem-tags-content-col">
                    <Poptip trigger="click" placement="left" :disabled="true">
                      <span>数据结构</span>
                    </Poptip>
                  </Col>
                  <Col span="12" class="problem-tags-content-col">
                    <Poptip trigger="click" placement="left" :disabled="true">
                      <span>数论</span>
                    </Poptip>
                  </Col>
                </Row>

                <Row class="problem-tags-content-line">
                  <Col span="12" class="problem-tags-content-col">
                    <Poptip trigger="click" placement="left" :disabled="true">
                      <span>树结构</span>
                    </Poptip>
                  </Col>
                  <Col span="12" class="problem-tags-content-col">
                    <Poptip trigger="click" placement="left" :disabled="true">
                      <span>图结构</span>
                    </Poptip>
                  </Col>
                </Row>

                <Row class="problem-tags-content-line">
                  <Col span="12" class="problem-tags-content-col">
                    <Poptip trigger="click" placement="left" :disabled="true">
                      <span>组合数学</span>
                    </Poptip>
                  </Col>
                  <Col span="12" class="problem-tags-content-col">
                    <Poptip trigger="click" placement="left" :disabled="true">
                      <span>贪心</span>
                    </Poptip>
                  </Col>
                </Row>

                <Row class="problem-tags-content-line">
                  <Col span="12" class="problem-tags-content-col">
                    <Poptip trigger="click" placement="left" :disabled="true">
                      <span>字符串</span>
                    </Poptip>
                  </Col>
                  <Col span="12" class="problem-tags-content-col">
                    <Poptip trigger="click" placement="left" :disabled="true">
                      <span>模拟</span>
                    </Poptip>
                  </Col>
                </Row>

                <Row class="problem-tags-content-line">
                  <Col span="12" class="problem-tags-content-col">
                    <Poptip trigger="click" placement="left" :disabled="true">
                      <span>高精度</span>
                    </Poptip>
                  </Col>
                  <Col span="12" class="problem-tags-content-col">
                    <Poptip trigger="click" placement="left" :disabled="true">
                      <span>概率论</span>
                    </Poptip>
                  </Col>
                </Row>

                <Row class="problem-tags-content-line">
                  <Col span="12" class="problem-tags-content-col">
                    <Poptip trigger="click" placement="left" :disabled="true">
                      <span>线性代数</span>
                    </Poptip>
                  </Col>
                  <Col span="12" class="problem-tags-content-col">
                    <Poptip trigger="click" placement="left" :disabled="true">
                      <span>交互题</span>
                    </Poptip>
                  </Col>
                </Row>

                <Row class="problem-tags-content-line">
                  <Col span="12" class="problem-tags-content-col">
                    <Poptip trigger="click" placement="left" :disabled="true">
                      <span>计算几何</span>
                    </Poptip>
                  </Col>
                  <Col span="12" class="problem-tags-content-col">
                    <Poptip trigger="click" placement="left" :disabled="true">
                      <span>其他</span>
                    </Poptip>
                  </Col>
                </Row> -->
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
      columns5: [
        {
          title: '#',
          key: 'problemId',
          width: 70,
          ellipsis: true,
          sortable: true
        },
        {
          title: '题目',
          key: 'name',
          minWidth: 150,
          render: (h, params) => h('span', { class: 'hover' }, params.row.name)
        },
        {
          title: '递交数',
          key: 'submit',
          ellipsis: true,
          width: 100,
          sortable: true
        },
        {
          title: 'AC%',
          key: 'acRate',
          width: 90,
          ellipsis: true,
          sortable: true,
          render: (h, params) => {
            return h('span', params.row.acRate.toFixed(2));
          }
        }
      ],
      data5: [
        {
          problemId: '1',
          name: 'A + B Problem',
          tags: ['模拟', '暴力', '思维'],
          submit: 4586,
          acRate: 57.63
        },
        {
          problemId: '2',
          name: 'GZS 与古英文字典',
          tags: ['暴力', '字典树', '字符串'],
          submit: 339,
          acRate: 80.02
        },
        {
          problemId: '3',
          name: 'GZS 的三角形',
          tags: ['找规律'],
          submit: 179,
          acRate: 16.20
        },
        {
          problemId: '4',
          name: 'GZS 与素数大法',
          tags: ['数学', '线性筛', '莫比乌斯反演'],
          submit: 352,
          acRate: 7.4
        },
        {
          problemId: '5',
          name: '吉老师的线段树',
          tags: ['数据结构', '线段树'],
          submit: 3532,
          acRate: 2.4
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
        this.columns5 = [
          ...this.columns5.slice(0, 2), 
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
          ...this.columns5.slice(2)
        ]
      } else {
        this.columns5 = this.columns5.filter(item => item.key !== 'tags');
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
    padding: 20px 25px 17px 25px;
    font-size: 1.5em;
    color: #797f7f;
  }
  .problem-tags-content {
    margin-bottom: 14px;
    .problem-tags-content-col {
      padding-left: 16px;
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