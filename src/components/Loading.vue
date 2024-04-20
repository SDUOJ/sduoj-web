<template>
  <div :style="`position: relative; width: ${size + 5}px; height: ${size + 5}px`">
    <Spin fix>
      <Icon type="ios-loading" :size="size" class="spin-icon-load" />
    </Spin>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    size: {
      type: Number,
      default: 18
    }
  }
}
</script>

<style scoped>
.spin-icon-load{
  animation: ani-demo-spin 1s linear infinite;
}

@keyframes ani-demo-spin {
  from { transform: rotate(0deg);}
  50%  { transform: rotate(180deg);}
  to   { transform: rotate(360deg);}
}
</style>
