<!--
   Copyright 2020-2021 the original author or authors.

   Licensed under the General Public License, Version 3.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

        https://www.gnu.org/licenses/gpl-3.0.en.html
 -->

<template>
  <Card title="Change Your Email" :padding="0" dis-hover>
    <div class="form">
    <Form ref="emailForm" :model="emailForm" :rules="emailRules" label-position="top">
      <Row>
          <Col span="12">
            <FormItem label="Password" prop="password">
              <Input type="password" v-model="emailForm.password" style="width: 280px;" />
            </FormItem>
            <FormItem>
              <Button @click="handleEmailUpdate" :loading="btnLoading">Update</Button>
            </FormItem>
          </Col>
          <Col span="12">
            <EmailVerify :email.sync="emailForm.email"
                         :email-code.sync="emailForm.emailCode"
                         email-label="New Email">
              <template slot="email-tip">
                <span style="color: #aaa">Your email will be used at <a href="" target="_blank">Gravatar.com</a></span>
              </template>
            </EmailVerify>
          </Col>
        </Row>
    </Form>
    </div>
  </Card>
</template>

<script>
import api from '_u/api';
import EmailVerify from '_c/form/EmailVerify';

export default {
  components: { EmailVerify },
  data: function() {
    const validateEmail = (rule, value, callback) => {
      // 检查邮箱是否已被使用
      api.isExist({ email: value }).then(ret => {
        callback();
      }, _ => {
        callback(new Error('already exists'));
      });
    };
    return {
      emailForm: {
        password: '',
        email: '',
        emailCode: ''
      },
      emailRules: {
        password: [
          { required: true, trigger: 'blur', min: 6, max: 32 }
        ],
        email: [
          { required: true, type: 'email', trigger: 'blur' },
          { validator: validateEmail, trigger: 'blur' }
        ]
      },
      btnLoading: false
    }
  },
  methods: {
    handleEmailUpdate: function() {
      this.$refs.emailForm.validate(valid => {
        if (valid) {
          this.btnLoading = true;
          api.updateEmail(this.emailForm).then(ret => {
            api.getProfile();
            this.$Message.success('Updated');
            this.$refs.emailForm.resetFields();
          }).catch(err => {
            this.$Message.error(err.message);
          }).finally(() => {
            this.btnLoading = false;
          });
        }
      });
    }
  }
}
</script>
<style lang="less" scoped>
.form {
  margin-top: 25px;
  margin-left: 50px;
}
</style>
