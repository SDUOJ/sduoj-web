<!--
   Copyright 2020-2022 the original author or authors.

   Licensed under the Affero General Public License, Version 3.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

        https://www.gnu.org/licenses/agpl-3.0.en.html
 -->

<template>
  <div>
    <div class="center">
      <Form
        ref="registerForm"
        :model="registerForm"
        :rules="registerRules"
        label-position="top">
        <FormItem prop="username" label="Username">
          <Input
            v-model="registerForm.username"
            placeholder="Your login handler"
            style="width: 280px" />
        </FormItem>
        <FormItem prop="nickname" label="Nickname">
          <Input
            v-model="registerForm.nickname"
            placeholder="Your nickname"
            style="width: 280px" />
        </FormItem>
        <FormItem prop="password" label="Password">
          <Input
            v-model="registerForm.password"
            placeholder="At least 6 characters"
            style="width: 280px"
            type="password" />
        </FormItem>
        <FormItem prop="confirmPassword" label="Confirm Password">
          <Input
            v-model="registerForm.confirmPassword"
            placeholder="Same as your password"
            style="width: 280px"
            type="password" />
        </FormItem>
        <EmailVerify :email.sync="registerForm.email" :email-code.sync="registerForm.emailCode" />
      </Form>
    </div>
    <div class="btnGroup" style="margin-top: -1px">
      <Button class="btn" type="error" long size="large"
              @click="handleRegister"
              :loading="btnRegisterLoading">{{ registerText }}</Button>
      <Button v-if="token === ''" class="btn" long :to="{ name: 'login' }">Already registered</Button>
    </div>
  </div>
</template>

<script>
import api from '_u/api';
import EmailVerify from '_c/form/EmailVerify';

export default {
  name: 'AccountRegisterForm',
  components: { EmailVerify },
  props: {
    token: {
      type: String,
      default: ''
    },
    registerText: {
      type: String,
      default: 'Register'
    }
  },
  data: function () {
    const validateUsername = (rule, value, callback) => {
      // 检查用户名是否存在
      api.isExist({ username: value }).then(ret => {
        if (ret) {
          callback(new Error('already exists'));
        } else {
          callback();
        }
      }).catch(err => {
        this.$Message.error(err.message);
      });
    };
    const validateEmail = (rule, value, callback) => {
      // 检查邮箱是否已被使用
      api.isExist({ email: value }).then(ret => {
        if (ret) {
          callback(new Error('already exists'));
        } else {
          callback();
        }
      }).catch(err => {
        this.$Message.error(err.message);
      });
    };
    const validatePass = (rule, value, callback) => {
      if (value !== '') {
        this.$refs.registerForm.validateField('confirmPassword');
      }
      callback();
    };
    const validateConfirmPass = (rule, value, callback) => {
      if (value !== this.registerForm.password) {
        callback(new Error('Password does not match'));
      }
      callback();
    };
    return {
      registerForm: {
        username: '',
        nickname: '',
        email: '',
        emailCode: '',
        password: '',
        confirmPassword: ''
      },
      registerRules: {
        username: [
          { required: true, trigger: 'blur' },
          { validator: validateUsername, trigger: 'blur' }
        ],
        nickname: [
          { required: true, trigger: 'blur' }
        ],
        email: [
          { required: true, type: 'email', trigger: 'blur' },
          { validator: validateEmail, trigger: 'blur' }
        ],
        password: [
          { required: true, trigger: 'blur', min: 6, max: 32 },
          { validator: validatePass, trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, validator: validateConfirmPass, trigger: 'change' }
        ]
      },
      btnRegisterLoading: false
    };
  },
  methods: {
    handleRegister: function() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          const data = Object.assign({}, this.registerForm);
          let apiName = 'register';
          delete data.confirmPassword;

          if (this.token !== '') {
            data.token = this.token;
            apiName = 'thirdPartyRegister';
          }

          this.btnRegisterLoading = true;
          api[apiName](data).then(ret => {
            this.$emit('on-success', ret);
            this.$refs.registerForm.resetFields();
          }).catch(err => {
            this.$Message.error(err.message);
          }).finally(() => {
            this.btnRegisterLoading = false;
          });
        }
      });
    }
  }
}
</script>

<style lang="less" scoped>
@sdu-red: #d84a2b;
/deep/.ivu-form-item-label {
  font-weight: 500;
}

.btn {
  margin: 3px auto;
  &:hover {
    color: @sdu-red;
    border-color: @sdu-red;
  }
}

/deep/ .ivu-btn-error {
  background-color: @sdu-red;
  border-color: @sdu-red;
  &:hover {
    color: #fff;
  }
}

.btnGroup {
  width: 280px;
  margin: 15px auto;
}
</style>
