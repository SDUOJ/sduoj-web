<template>
  <div class="container">
    <!-- 轮播图 -->
    <Carousel
        v-model="carouselSettings.value"
        :autoplay="carouselSettings.autoplay"
        :autoplay-speed="carouselSettings.autoplaySpeed"
        :dots="carouselSettings.dots"
        :radius-dot="carouselSettings.radiusDot"
        :trigger="carouselSettings.trigger"
        :arrow="carouselSettings.arrow">
        <CarouselItem v-for="img in carouselImgs" :key="img">
          <div class="demo-carousel"><img :src="img" alt=""></div>
        </CarouselItem>
    </Carousel>
    <Row class="main">
      <Col span="16" class="main-lf">
        <div class="card">
          <div class="card-title bold-font big-font">
            <Icon type="ios-alert-outline" />&nbsp; 公告
          </div>
          <div class="card-content">
            <Row class="card-content-item bold-font">
              <Col span="18">标题</Col>
              <Col span="6">时间</Col>
            </Row>
            <Row class="card-content-item link" v-for="item in announcements" :key="item.url">
              <Col span="18">{{ item.title }}</Col>
              <Col span="6">{{ item.time }}</Col>
            </Row>
          </div>
        </div>
      </Col>
      <Col span="8" class="main-ri">
      <div class="card">
       <div class="card-title bold-font big-font">
            <Icon type="ios-search" />&nbsp; 搜索
       </div> 
       <div class="card-content">
         <div class="card-content-item card-search">
         <Input style="width: 100%; display: block;" type="text" autocomplete="off" placeholder="ID"><Icon type="ios-search" slot="prefix" /></Input>
         </div>
       </div>
      </div>
      </Col> 
    </Row>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      carouselSettings: {
        value: 0,
        autoplay: true,
        autoplaySpeed: 2000,
        dots: 'inside',
        radiusDot: false,
        trigger: 'click',
        arrow: 'hover'
      },
      carouselImgs: [
        // test imgs
        'https://www.sdu.edu.cn/images/2020091103.jpg',
        'https://www.sdu.edu.cn/images/2020091405.jpg'
      ],
      announcements: [
        { title: '薛定谔的腾腾喵', time: '2020-09-22', url: '1' },
        { title: '臭东东再不学前端就把你干掉', time: '2020-09-21', url: '2' },
        { title: '憨憨瑞瑞喵', time: '2020-09-20', url: '3' }
      ]
    }
  }
};
</script>

<style lang="less" scoped>
.demo-carousel {
  width: 100%;
  min-height: 300px;
  img{
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
  }
  // background-color: #bfa;
}

.main {
  .main-lf {
    padding: 24px 12px 0 0;
  }
  .main-ri {
    padding: 24px 0 0 12px;
  }
}

.card {
  border: 1px solid #d4d4d5;
  border-radius: 4px;
  .card-title {
    border-bottom: 1px solid #d4d4d5;
    margin-bottom: -1px;
    padding: 0.6em 0.5em 0.4em 0.5em;
    position: relative;
    background-color: #f3f4f5;
  }
  .card-content {
    padding: 0 15px;
    .card-content-item {
      border-top: 1px solid #d4d4d5;
      height: 40px;
      display: -webkit-box;
      -webkit-box-align: center;
    }
  }
  .card-search {
    width: 100%;
    /deep/ .ivu-input {
      border-radius: 20px;
    }
  }
}

.bold-font {
  font-weight: bold;
}

.big-font {
  font-size: 1.2em;
}

.link {
  color: #2D7ABA;
  :hover {
    cursor: pointer;
  }
}

</style>