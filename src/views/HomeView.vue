<template>
  <div class="container">
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
</style>