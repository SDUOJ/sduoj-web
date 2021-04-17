<!--
   Copyright 2020-2021 the original author or authors.

   Licensed under the General Public License, Version 3.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

        https://www.gnu.org/licenses/gpl-3.0.en.html
 -->

<template>
    <div class="box clearfix" v-if="apply">
      <div class="title">
        <span>Register in SDUOJ</span>
      </div>
      <div class="body">
        <Form
          ref="registerForm"
          :model="registerForm"
          :rules="registerRules"
          label-position="right"
          :label-width="150"
          label-colon>
          <FormItem prop="username" label="Username">
            <Input
              v-model="registerForm.username"
              placeholder="This will be your login handler"
              style="width: 220px"
            />
          </FormItem>
          <FormItem prop="email" label="Email">
            <Input v-model="registerForm.email" style="width: 220px" type="email" />
          </FormItem>
          <FormItem prop="password" label="Password">
            <Input
              v-model="registerForm.password"
              placeholder="At least 6 characters"
              style="width: 220px"
              type="password"
            />
          </FormItem>
          <FormItem prop="confirmPassword" label="Confirm Password">
            <Input
              v-model="registerForm.confirmPassword"
              placeholder="Be same as your password"
              style="width: 220px"
              type="password"
            />
          </FormItem>
          <FormItem label="Student ID">
            <Input v-model="registerForm.studentId" style="width: 220px" />
          </FormItem>
          <FormItem prop="captcha" label="Captcha">
            <div class="captcha-code">
              <Input
                v-model="registerForm.captcha"
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
          <router-link :to="{ name: 'login' }">Already registerd?</router-link>
          <Button type="text"
            @click="handleRegister('registerForm')"
            :loading="btnRegisterLoading">Register</Button>
        </div>
      </div>
    </div>
    <div class="container activation hover" v-else>
      <Tooltip  content="Return to Home" placement="bottom">
        <Icon type="md-checkmark-circle-outline" size="30"/>
        <h1 style="display: inline" @click="$router.replace({ name: 'home' })">&nbsp; {{ message }}</h1>
      </Tooltip>
    </div>
</template>

<script>
import api from '_u/api';

export default {
  // 打开 register 页面的时候，默认调我的接口 "get验证码"，然后我把一个验证码ID，和验证码图片Base64 给你
  data: function () {
    const validateUsername = (rule, value, callback) => {
      // 检查用户名是否存在
      api.isExist({ username: value }).then(ret => {
        callback();
      }).catch(_ => {
        callback(new Error('already exists'));
      });
    };
    const validateEmail = (rule, value, callback) => {
      // 检查邮箱是否已被使用
      api.isExist({ email: value }).then(ret => {
        callback();
      }, _ => {
        callback(new Error('already exists'));
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
        email: '',
        password: '',
        confirmPassword: '',
        studentId: '',
        captcha: ''
      },
      registerRules: {
        username: [
          { required: true, trigger: 'blur' },
          { validator: validateUsername, trigger: 'blur' }
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
        ],
        captcha: [{ required: true, trigger: 'blur', min: 1, max: 10 }]
      },
      captchaId: 0,
      captchaImg: '',
      btnRegisterLoading: false,
      apply: true,
      message: ''
    };
  },
  methods: {
    getCaptcha: function() {
      // 模拟获得图形验证码
      api.getCaptcha().then(ret => {
        this.captchaId = ret.captchaId;
        this.captchaImg = ret.captcha;
      }).catch(err => {
        this.$Message.error(err.message);
      });
    },
    onCaptchaInputFocus: function() {
      if (!this.captchaId) {
        this.getCaptcha();
      }
    },
    handleRegister: function (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const dataForm = Object.assign({}, this.registerForm);
          delete dataForm.confirmPassword;
          dataForm.captchaId = this.captchaId;
          this.btnRegisterLoading = true;
          api.register(dataForm).then(ret => {
            this.apply = false;
            this.message = 'Success, check your email for activation';
            this.$refs[name].resetFields();
          }).catch(err => {
            this.$Message.error(err.message);
          }).finally(() => {
            this.btnRegisterLoading = false;
            this.registerForm.captcha = '';
            this.getCaptcha();
          })
          return;
        }
        this.registerForm.captcha = '';
      });
    }
  },
  mounted: function() {
    if (this.$route.query.token) {
      api.verifyEmail(this.$route.query.token)
        .then(_ => {
          this.apply = false;
          this.message = 'You have activated';
        }).catch(err => {
          this.$Message.error(err.message);
        });
    }
  }
};
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

.activation {
  text-align: center;
}
</style>
