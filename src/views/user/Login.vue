<!--
   Copyright 2020-2022 the original author or authors.

   Licensed under the Affero General Public License, Version 3.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

        https://www.gnu.org/licenses/agpl-3.0.en.html
 -->

<template>
  <div class="box clearfix">
    <div class="loginDiv">
      <div class="loginSwitchDiv">
        <div class="thirdPartyLogin" @click="switchLoginType(true)" v-if="false">
          <div :class="{ selectedType: isThirdPartyLogin }">Third Party</div>
        </div>
        <div class="intervalDiv"></div>
        <div class="accountLogin" @click="switchLoginType(false)">
          <div :class="{ selectedType: !isThirdPartyLogin }">Account</div>
        </div>
      </div>
      <div class="loginForm">
        <div v-if="isThirdPartyLogin">
<!--          <span class="loginTip">-->
<!--            <span>SDU CAS</span>-->
<!--          </span>-->
          <div class="btnGroup">
            <Button class="btn" long type="error" size="large" @click="handleThirdPartyLogin(THIRD_PARTY_ENUM.SDUCAS)"> SDU 统一身份认证 </Button>
          </div>
<!--          <span class="loginTip">-->
<!--            <span>Other Certifications</span>-->
<!--          </span>-->
<!--          <div class="btnGroup">-->
<!--            <Button class="btn" long size="large"> QQ </Button>-->
<!--            <Button class="btn" long size="large"> WeChat </Button>-->
<!--            <Button class="btn" long size="large"> Github </Button>-->
<!--          </div>-->
        </div>
        <div v-else>
          <AccountLoginForm @on-success="handleAccountLogin" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { THIRD_PARTY_CAS, THIRD_PARTY_ENUM } from '@/views/third-party/js/ThirdPartyEnum';
import AccountLoginForm from '_c/form/login/AccountLoginForm';

export default {
  components: { AccountLoginForm },
  data: function() {
    return {
      isThirdPartyLogin: false
    }
  },
  computed: {
    THIRD_PARTY_ENUM: () => THIRD_PARTY_ENUM
  },
  methods: {
    ...mapActions('user', ['setProfile']),
    switchLoginType: function(type) {
      this.isThirdPartyLogin = type;
    },
    handleAccountLogin: function(profile) {
      this.setProfile(profile);
      this.$router.replace(this.$route.query.to || '/');
    },
    handleThirdPartyLogin: function(direct) {
      window.location = THIRD_PARTY_CAS[direct].targetUrl();
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

/deep/ .ivu-btn-error {
  background-color: @sdu-red;
  border-color: @sdu-red;
  &:hover {
    color: #fff !important;
  }
}

.loginForm {
  margin: 20px 10px;
  .btnGroup {
    width: 280px;
    margin: 15px auto;
  }
}

.btn {
  margin: 3px auto;

  &:hover {
    color: @sdu-red;
    border-color: @sdu-red;
  }
}
</style>
