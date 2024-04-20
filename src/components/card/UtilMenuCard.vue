<template>
  <div>
    <Card>
      <p slot="title" class="util-title">{{ utilTitle }}</p>
      <Button slot="extra" class="util-button" type="success" @click="DialogChange">Take it</Button>
      <p class="util-introduction">{{ utilIntroduction }}</p>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'UtilMenuCard',
  props: {
    utilTitle: String,
    utilIntroduction: String
  },
  methods: {
    DialogChange() {
      this.$emit('change-dialog')
    }
  }
}
</script>

<style scoped lang="less">
/deep/ .ivu-card-extra{
  top: 9px
}

.util-introduction {
  padding: 12px 12px;
  line-height: 1;
}
</style>
