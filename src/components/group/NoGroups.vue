<template>
  <div class="nogroup-hint">
      <h1>You have not joined any groups</h1>
      <small>Try to find one!</small>
  </div>
</template>

<script>
export default {
  name: 'NoGroups'
}
</script>

<style scoped>
.nogroup-hint {
  display: block;
  width: 100%;
  text-align: center;
  margin: 20px auto;
  color: #c5c8ce;
}

h1 {
  display: block;
  font-size: 40px;
  line-height: 80px;
}
small {
  font-size: 25px;
  display: block;
}
</style>
