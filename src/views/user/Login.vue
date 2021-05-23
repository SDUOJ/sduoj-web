<!--
   Copyright 2020-2021 the original author or authors.

   Licensed under the General Public License, Version 3.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

        https://www.gnu.org/licenses/gpl-3.0.en.html
 -->

<template>
  <div class="box clearfix">
    <div class="loginDiv">
      <div class="loginSwitchDiv">
        <div class="thirdPartyLogin" @click="switchLoginType(true)">
          <div :class="{ selectedType: isThirdPartyLogin }">Third Party</div>
        </div>
        <div class="intervalDiv"></div>
        <div class="accountLogin" @click="switchLoginType(false)">
          <div :class="{ selectedType: !isThirdPartyLogin }">Account</div>
        </div>
      </div>
      <div class="loginForm">
        <template v-if="isThirdPartyLogin">
          <span class="loginTip">
            <span>SDU CAS</span>
          </span>
          <div class="btnGroup">
            <Button class="btn" long type="error" size="large"> 跳转至统一身份认证登录 </Button>
          </div>
<!--          <span class="loginTip">-->
<!--            <span>Other Certifications</span>-->
<!--          </span>-->
<!--          <div class="btnGroup">-->
<!--            <Button class="btn" long size="large"> QQ </Button>-->
<!--            <Button class="btn" long size="large"> WeChat </Button>-->
<!--            <Button class="btn" long size="large"> Github </Button>-->
<!--          </div>-->
        </template>
        <template v-else>
          <div class="center">
            <Form ref="loginForm"
              :model="loginForm"
              :rules="loginRules"
              label-position="right">
              <FormItem prop="username" label="Username">
                <Input v-model="loginForm.username" placeholder="Username" style="width: 280px" />
              </FormItem>
              <FormItem prop="password" label="Password">
                <Input type="password" v-model="loginForm.password" placeholder="Password" style="width: 280px" @on-enter="handleLogin('loginForm')"/>
              </FormItem>
            </Form>
          </div>
          <div class="btnGroup" style="margin-top: -1px">
            <Button class="btn" type="error" long size="large"
              @click="handleLogin('loginForm')"
              :loading="btnLoginLoading">Login</Button>
            <Button class="btn" long :to="{ name: 'reset-password'}">Forget password?</Button>
          </div>
        </template>
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
      btnLoginLoading: false,
      isThirdPartyLogin: true
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
    },
    switchLoginType: function(type) {
      this.isThirdPartyLogin = type;
    }
  }
}
</script>

<style lang="less" scoped>
@sdu-red: #d84a2b;
.box {
  width: 420px;
  margin: 0 auto;
  border: 1px solid rgb(185, 185, 185);
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px #f5f7f9;
}

.loginDiv {
  background: #fff;
  border-radius: 4px
}

.loginSwitchDiv {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  height: 65px;
  border-bottom: 1px solid #DFE1E6;
  font-size: 18px;
  color: rgba(0, 0, 0, .5);
  cursor: pointer;

  .intervalDiv {
    height: 20px;
    border-right: 1px solid #DFE1E6
  }
}

.loginSwitchDiv .thirdPartyLogin,
.loginSwitchDiv .accountLogin {
  flex-grow: 1;
  text-align: center;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  div {
    height: calc(100% - 5px);
    display: flex;
    align-items: center;
    border-bottom: 3px solid transparent;
    border-top: 3px solid transparent;
  }
}

.loginSwitchDiv div.selectedType {
  border-bottom: 3px solid @sdu-red;
  color: @sdu-red;
}

.loginForm {
  margin: 20px 10px;
  .btnGroup {
    width: 280px;
    margin: 15px auto;
  }
}

.loginTip {
  width: 100%;
  text-align: center;
  position: relative;
  line-height: 1;
  margin: 12px auto;
  display: block;
}
.loginTip:before {
  content: '';
  position: absolute;
  top: 50%;
  display: block;
  width: 100%;
  border-top: 1px solid #DDD;
}
.loginTip span {
  background-color: #fff;
  padding: 0 7px;
  position: relative;
  color: rgba(0, 0, 0, .5);
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

</style>
