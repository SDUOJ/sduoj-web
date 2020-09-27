<template>
    <div>
      <div class="container">
        <Row>
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
              </div>
              <!-- 题库 content -->
            </div>
          </Col>

          <Col span="5" class="main-rf">
            <div class="problem-set-search">

            </div>
          </Col>
        </Row>
      </div>
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
          sortable: true
        },
        {
          title: '题目',
          key: 'name'
        },
        {
          title: '算法标签',
          key: 'tags'
        },
        {
          title: '递交数',
          key: 'commits',
          sortable: true
        },
        {
          title: '%AC',
          key: 'acrate',
          sortable: true
        }
      ],
      data5: [
        {
          id: '1',
          name: 'A + B Problem',
          tags: '模拟',
          commits: 4586,
          acrate: 51.22
        },
        {
          id: '2',
          name: 'GZS 与古英文字典',
          tags: '暴力',
          commits: 339,
          acrate: 9.73
        },
        {
          id: '3',
          name: 'GZS 的三角形',
          tags: '找规律',
          commits: 179,
          acrate: 16.20
        },
        {
          id: '4',
          name: 'GZS 与素数大法',
          tags: '数学',
          commits: 353,
          acrate: 7.37
        },
        {
          id: '5',
          name: '吉老师的线段树',
          tags: '数据结构',
          commits: 3532,
          acrate: 2.37
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
.problem-set {
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
  }
}
</style>