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
                  <i-switch size="large">
                    <span slot="open">标签</span>
                    <span slot="close">标签</span>
                  </i-switch>
                </div>
              </div>
              <!-- 题库 header -->

              <!-- 题库 content -->
              <div class="problem-set-content">
                  <Table :columns="columns5" :data="data5" class="problem-set-content-table"></Table>
                  <Page :total="100" :current="1" show-elevator class="problem-set-content-page"/>
              </div>
              <!-- 题库 content -->
            </div>
          </Col>
          <!-- 页面左边部分 -->

          <!-- 页面右边部分 -->
          <Col span="5" class="main-rf">
            <div class="problem-set-search">

            </div>
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
          key: 'id',
          width: 70,
          ellipsis: true,
          sortable: true
        },
        {
          title: '题目',
          key: 'name'
        },
        {
          title: '标签',
          key: 'tags',
          align: 'right',
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
        {
          title: '递交数',
          key: 'submit',
          ellipsis: true,
          width: 100,
          sortable: true
        },
        {
          title: '%AC',
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
          id: '1',
          name: 'A + B Problem',
          tags: ['模拟', '暴力', '思维', '模拟', '暴力', '思维', '模拟', '暴力', '思维'],
          submit: 4586,
          acRate: 100.00
        },
        {
          id: '2',
          name: 'GZS 与古英文字典 数组中出现的数据哈哈十三水',
          tags: ['暴力'],
          submit: 339,
          acRate: 99.99
        },
        {
          id: '3',
          name: 'GZS 的三角形',
          tags: ['找规律'],
          submit: 179,
          acRate: 16.20
        },
        {
          id: '4',
          name: 'GZS 与素数大法',
          tags: ['数学'],
          submit: 35222223,
          acRate: 7.4
        },
        {
          id: '9999',
          name: '吉老师的线段树',
          tags: ['数据结构'],
          submit: 3532,
          acRate: 2.4
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.problem-set {
  height: 1000px;
  // background-color: pink;
  border-radius: 4px;
  
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

  .problem-set-content {
    margin-right: 20px;
    border-left: 1px solid #d4d4d5;
  }
}

.problem-set-search {
  height: 100px;
  background-color: pink;
}
</style>

<style lang="less">
.problem-set .problem-set-content {
  .problem-set-content-table {
    border-right: 1px solid #d4d4d5;
    .ivu-table-header {
      padding-right: 0;
      th {
        background-color: #fff;
      }
    }
    .ivu-table-body {
      padding-right: 0;
    }
    .ivu-table-row-hover td {
        background-color: #fbfcfc;
    }
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
          margin: 4px 6px;
        }
      }
    }
  }

  .problem-set-content-page {
    margin-top: 15px;
    float: right;
  }
}
</style>