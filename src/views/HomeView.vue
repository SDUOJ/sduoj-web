<!--
   Copyright 2020-2020 the original author or authors.

   Licensed under the General Public License, Version 3.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

        https://www.gnu.org/licenses/gpl-3.0.en.html
 -->

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
        <Card title="Announcements" icon="ios-alert-outline" dis-hover :padding="10">
          <div style="margin: 0 10px">
            <Row class="announce-subtitle">
              <Col span="18">标题</Col>
              <Col span="6">时间</Col>
            </Row>
            <Row class="announce-item" v-for="item in announcements" :key="item.url">
              <Col span="18">{{ item.title }}</Col>
              <Col span="6">{{ item.time }}</Col>
            </Row>
          </div>
        </Card>
      </Col>
      <Col span="8" class="main-ri">
      <Card dis-hover title="Search" icon="ios-search">
        <template>
          <div class="global-search">
            <Input style="width: 100%; display: block;" type="text" autocomplete="off" placeholder="ID" />
          </div>
        </template>
      </Card>
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
        'https://www.cs.sdu.edu.cn/images/ban1news.jpg'
      ],
      announcements: [
        { title: 'SDUOJ 于 2020年10月26日成功入塔', time: '2020-10-26', url: '1' },
        { title: 'SDUOJ 国庆期间项目进度推进', time: '2020-10-01', url: '2' }
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
  height: 30px;
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
  // margin-top: 10px;
  height: 30px;
  /deep/ .ivu-input {
    border-radius: 10px;
  }
}

</style>
