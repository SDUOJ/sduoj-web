<!--
   Copyright 2020-2021 the original author or authors.

   Licensed under the General Public License, Version 3.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

        https://www.gnu.org/licenses/gpl-3.0.en.html
 -->

<template>
  <Card title="Your Profile" :padding="0" dis-hover>
    <div class="form">
      <Form ref="profileForm" :model="profileForm" :rules="profileRules" label-position="right">
        <Row>
          <Col span="12">
            <FormItem label="Username">
                <span>{{ profile.username }}</span>
            </FormItem>
            <FormItem label="Nickname">
              <Input type="text" v-model="profileForm.nickname" style="width: 280px;" />
            </FormItem>
            <FormItem label="Student ID">
              <Input type="text" v-model="profileForm.studentId" style="width: 280px;" />
            </FormItem>
            <FormItem>
              <Button @click="handleProfileUpdate" :loading="btnLoading">Update</Button>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="Gender">
              <RadioGroup v-model="profileForm.gender" border>
                <Radio label=2><Icon type="md-help" /></Radio>
                <Radio label=1><Icon type="md-male" /></Radio>
                <Radio label=0><Icon type="md-female" /></Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="Phone">
              <Input type="text" v-model="profileForm.phone" style="width: 280px;" />
            </FormItem>
            <FormItem label="Email">
              <span v-text="profile.email" />
            </FormItem>
            <FormItem label="Roles">
              <span class="roles" v-for="role in profile.roles" :key="role">
                <Tag :color="USER_ROLE[role].color">{{ role }}</Tag>
              </span>
            </FormItem>
          </Col>
        </Row>
    </Form>
    </div>
  </Card>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import api from '_u/api';
import { USER_ROLE } from '_u/constants';

export default {
  data: function() {
    return {
      profileForm: {
        nickname: '',
        studentId: '',
        gender: '',
        phone: '',
        password: ''
      },
      profileRules: {
        password: [
          { required: true, trigger: 'blur', min: 6, max: 32 }
        ]
      },
      btnLoading: false
    }
  },
  methods: {
    handleProfileUpdate: function() {
      this.$refs.profileForm.validate(valid => {
        if (valid) {
          this.btnLoading = true;
          api.updateProfile(this.profileForm).then(ret => {
            api.getProfile();
            this.$Message.success('Profile Updated');
          }).catch(err => {
            this.$Message.error(err.message);
          }).finally(() => {
            this.btnLoading = false;
          })
        }
      })
    }
  },
  computed: {
    ...mapState('user', ['profile']),
    ...mapGetters('user', ['username']),
    USER_ROLE: () => USER_ROLE
  },
  mounted: function() {
    api.getProfile(ret => {
      this.profileForm = Object.assign({}, ret);
      this.profileForm.gender = this.profileForm.gender.toString();
    });
  }
}
</script>

<style lang="less" scoped>
.form {
  margin-top: 25px;
  margin-left: 50px;
}
</style>
