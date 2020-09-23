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
        <DisplayCard>
          <template slot="header">
            <Icon type="ios-alert-outline" />&nbsp; 公告
          </template>
          <template slot="content">
            <Row class="announce-subtitle">
              <Col span="18">标题</Col>
              <Col span="6">时间</Col>
            </Row>
            <Row class="announce-item" v-for="item in announcements" :key="item.url">
              <Col span="18">{{ item.title }}</Col>
              <Col span="6">{{ item.time }}</Col>
            </Row>
          </template>
        </DisplayCard>
      </Col>
      <Col span="8" class="main-ri">
      <DisplayCard>
        <template slot="header">
          <Icon type="ios-search" />&nbsp; 搜索
        </template>
        <template slot="content">
          <div class="global-search">
            <Input style="width: 100%; display: block;" type="text" autocomplete="off" placeholder="ID" />
          </div>
        </template>
      </DisplayCard>
      </Col> 
    </Row>
  </div>
</template>

<script>
import DisplayCard from '../components/DisplayCard';

export default {
  components: { DisplayCard },
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
  img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
  }
}

.main {
  .main-lf {
    padding: 24px 12px 0 0;
  }
  .main-ri {
    padding: 24px 0 0 12px;
  }
}

.announce-subtitle {
  height: 40px;
  border-top: 1px solid #d4d4d5;
  font-weight: bold;
  display: -webkit-box;
  -webkit-box-align: center;
}
.announce-item {
  height: 40px;
  color: #2D7ABA;
  border-top: 1px solid #d4d4d5;
  display: -webkit-box;
  -webkit-box-align: center;
  :hover {
    cursor: pointer;
  } 
}

.global-search {
  margin-top: 10px;
  height: 40px;
  /deep/ .ivu-input {
    border-radius: 20px;
  }
}

</style>