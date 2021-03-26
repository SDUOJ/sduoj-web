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
          <span>Welcome to SDUOJ</span>
      </div>
      <div class="body">
        3rd-Party Login
        <hr>
        <div style="text-align:center">
          <Button type="error"
                  size="small"
                  to="http://pass.sdu.edu.cn/cas/login?service=https://oj.qd.sdu.edu.cn/api/user/sduCasLogin">
                  SDU 统一身份认证</Button>（In Experiment）
        </div>
        <br />
        Account Login
        <hr>
        <Form ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          label-position="right"
          :label-width="150"
          label-colo>
          <FormItem prop="username" label="Username">
            <Input v-model="loginForm.username" placeholder="Username" style="width: 220px" />
          </FormItem>
          <FormItem prop="password" label="Password">
            <Input type="password" v-model="loginForm.password" placeholder="Password" style="width: 220px" @on-enter="handleLogin('loginForm')"/>
          </FormItem>
        </Form>
      </div>
      <div class="bottom">
        <div class="btns">
          <router-link :to="{ name: 'reset-password' }">Forgot your password?</router-link>
          <Button type="text"
            @click="handleLogin('loginForm')"
            :loading="btnLoginLoading">Login</Button>
        </div>
      </div>
  </div>
</template>

<script>
import api from '_u/api';
import { mapActions } from 'vuex';

export default {
  data: function() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur' }
        ],
        password: [
          { required: true, trigger: 'blur', min: 6, max: 32 }
        ]
      },
      btnLoginLoading: false
    }
  },
  methods: {
    ...mapActions('user', ['setProfile', 'setLogin']),
    handleLogin: function(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          api.login(this.loginForm).then(ret => {
            this.setProfile(ret);
            this.$router.replace(this.$route.query.to || '/');
          }).catch(err => {
            this.$Message.error(err.message);
          });
        }
      })
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
  padding: 0.5em 1em 0 1em;
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
}

.bottom {
  border-top: 1px solid rgb(185, 185, 185);
  padding-right: 10px;
}
</style>
