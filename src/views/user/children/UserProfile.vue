<template>
  <Form ref="profileForm" :model="profileForm" inline>
    <FormItem>
      <Input type="text" v-model="profileForm.username">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem>
      <Input type="text" v-model="profileForm.nickname">
        <Icon type="ios-lock-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem>
      <Input type="text" v-model="profileForm.gender">
        <Icon type="ios-lock-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem>
      <Input type="text" v-model="profileForm.email" disabled>
        <Icon type="ios-lock-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem>
      <Input type="text" v-model="profileForm.phone">
        <Icon type="ios-lock-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem>
      <Input type="text" v-model="profileForm.studentId">
        <Icon type="ios-lock-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem>
      <Input type="text" v-model="profileForm.role">
        <Icon type="ios-lock-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="handleProfileUpdate('profileForm')">Update</Button>
    </FormItem>
  </Form>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: function() {
    return {
      profileForm: {}
    }
  },
  methods: {
    handleProfileUpdate: function(name) {

    }
  },
  computed: {
    ...mapState('user', ['profile'])
  },
  mounted: function() {
    this.profileForm = Object.assign({}, this.profile);
  }
}
</script>

<style lang="less" scoped>

</style>