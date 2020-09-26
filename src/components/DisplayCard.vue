<template>
  <div class="card">
    <div class="card-title bold-font big-font" v-if="$slots.header">
      <slot name="header"></slot>
    </div>
    <div class="card-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
    
}
</script>

<style lang="less" scoped>
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
  }
}

.bold-font {
  font-weight: bold;
}

.big-font {
  font-size: 1.2em;
}
</style>