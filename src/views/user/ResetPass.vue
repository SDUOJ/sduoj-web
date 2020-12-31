<!--
   Copyright 2020-2021 the original author or authors.

   Licensed under the General Public License, Version 3.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

        https://www.gnu.org/licenses/gpl-3.0.en.html
 -->

<template>
  <div class="box clearfix">
      <div class="title">
          <span>Reset your password</span>
      </div>
      <div class="body">
        <Form ref="resetForm"
          :model="resetForm"
          :rules="resetRules"
          label-position="right"
          :label-width="150"
          label-colo>
          <template v-if="apply">
            <FormItem prop="handler" label="Username or Email">
              <Input v-model="resetForm.handler" placeholder="Username or Email" style="width: 220px" />
            </FormItem>
          </template>
          <template v-else>
            <FormItem prop="password" label="New Password">
              <Input
                v-model="resetForm.password"
                placeholder="At least 6 characters"
                style="width: 220px"
                type="password"
              />
            </FormItem>
            <FormItem prop="confirmPassword" label="Confirm New Password">
              <Input
                v-model="resetForm.confirmPassword"
                placeholder="Be same as your new password"
                style="width: 220px"
                type="password"
              />
            </FormItem>
            </template>
            <FormItem prop="captcha" label="Captcha">
              <div class="captcha-code">
                <Input
                  v-model="resetForm.captcha"
                  placeholder="Click to get captcha"
                  style="width: 220px"
                  @on-focus="onCaptchaInputFocus"
                />
              </div>
              <div class="captcha-img">
                <Tooltip content="Click to refresh" placement="right">
                  <img :src="captchaImg" @click="getCaptcha"/>
                </Tooltip>
              </div>
            </FormItem>
        </Form>
      </div>
      <div class="bottom">
        <div class="btns">
          <Button type="text"
            @click="handleReset('resetForm')"
            :loading="btnResetLoading">Reset</Button>
        </div>
      </div>
  </div>
</template>

<script>
import api from '_u/api';

export default {
  data: function() {
    const validatePass = (rule, value, callback) => {
      if (value !== '') {
        this.$refs.resetForm.validateField('confirmPassword');
      }
      callback();
    };
    const validateConfirmPass = (rule, value, callback) => {
      if (value !== this.resetForm.password) {
        callback(new Error('Password does not match'));
      }
      callback();
    };
    return {
      resetForm: {
        handler: '',
        captcha: '',
        password: '',
        confirmPassword: ''
      },
      resetRules: {
        handler: [
          { required: true, trigger: 'blur' }
        ],
        captcha: [
          { required: true, trigger: 'blur' }
        ],
        password: [
          { required: true, trigger: 'blur', min: 6, max: 32 },
          { validator: validatePass, trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, validator: validateConfirmPass, trigger: 'change' }
        ]
      },
      btnResetLoading: false,
      captchaId: '',
      captchaImg: '',
      token: '',
      apply: true
    }
  },
  methods: {
    handleReset: function(name) {
      this.$refs[name].validate(valid => {
        if (!valid) {
          return;
        }
        if (this.apply) {
          const dataForm = {
            username: this.resetForm.handler,
            email: this.resetForm.handler,
            captcha: this.resetForm.captcha,
            captchaId: this.captchaId
          }
          if (this.resetForm.handler.indexOf('@') !== -1) {
            // 邮件
            delete dataForm.username;
          } else {
            // 用户名
            delete dataForm.email;
          }
          this.btnResetLoading = true;
          api.forgetPassword(dataForm).then(ret => {
            this.$Message.success(`重置密码链接已发送到 ${ret}`);
          }).catch(err => {
            this.$Message.error(err.message);
            this.getCaptcha();
          }).finally(() => {
            this.resetForm.handler = '';
            this.resetForm.captcha = '';
            this.btnResetLoading = false;
          })
        } else {
          const dataForm = {
            token: this.token,
            password: this.resetForm.password,
            captcha: this.resetForm.captcha,
            captchaId: this.captchaId
          }
          this.btnResetLoading = true;
          api.resetPassword(dataForm).then(ret => {
            this.$Message.success({
              content: 'Password resetted, please login',
              onClose: () => this.$router.replace({ name: 'login' })
            })
          }).catch(err => {
            this.$Message.error(err.message);
          }).finally(() => {
            this.btnResetLoading = false;
          });
        }
      })
    },
    onCaptchaInputFocus: function() {
      if (!this.captchaId) {
        this.getCaptcha();
      }
    },
    getCaptcha: function() {
      api.getCaptcha().then(ret => {
        this.captchaId = ret.captchaId;
        this.captchaImg = ret.captcha;
      })
    }
  },
  mounted: function() {
    if (this.$route.query.token) {
      this.token = this.$route.query.token;
      this.apply = false;
      this.$Message.success('Reset your password');
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  width: 420px;
  margin: 0 auto;
  border: 1px solid rgb(185, 185, 185);
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px #f5f7f9;
}

.title {
  margin: 0.2em 0;
  padding: 0 0.5em;
  position: relative;
  color: #9e0a11;
  font-size: 1rem;
  font-weight: bold;
  border-bottom: 1px solid rgb(185, 185, 185);
}

.body {
  padding: 1.5em 1em 0 1em;
}

/deep/.ivu-form-item-label {
  font-weight: 500;
}

.btns {
  float: right;
  margin: 5px 0;
  .ivu-btn:hover {
    background: rgba(0, 0, 0, 0.05);
  }
  a {
    color: #000;
    text-decoration: underline;
    margin-right: 8px;
  }
}

.captcha-img {
  margin-top: 5px;
  :hover {
    cursor: pointer;
  }
}

.bottom {
  border-top: 1px solid rgb(185, 185, 185);
  padding-right: 10px;
}
</style>
