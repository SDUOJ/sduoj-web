<!--
   Copyright 2020-2021 the original author or authors.

   Licensed under the General Public License, Version 3.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

        https://www.gnu.org/licenses/gpl-3.0.en.html
 -->

<template>
  <div class="box clearfix">
    <div class="bindWrapper" v-if="params.thirdParty !== ''">
      <div class="bindHeader">
        <header class="bindTitle center">
          <h3>Continue to bind third party account</h3>
        </header>
        <div class="bindTip">
          <AuthTip :third-party-params="params" />
        </div>
      </div>
      <Divider />
      <div v-if="params.token !== ''">
        <AccountLoginForm v-if="bindType" :token="params.token" @on-success="handleBindAccount" login-text="Login and Bind"  />
        <AccountRegisterForm v-else :token="params.token" @on-success="handleBindAccount" register-text="Register and Bind" />
      </div>
      <div class="bindBottom center">
        <a v-if="bindType" href="javascript:void(0)" @click="onChangeBindType(false)">No account</a>
        <a v-else href="javascript:void(0)" @click="onChangeBindType(true)">Bind existing account</a>
      </div>
    </div>
  </div>
</template>

<script>
import AccountLoginForm from '_c/form/login/AccountLoginForm';
import AccountRegisterForm from '_c/form/register/AccountRegisterForm';
import { THIRD_PARTY_CAS } from './js/ThirdPartyEnum';
import { mapActions } from 'vuex';

const AuthTip = {
  name: 'ThirdPartyHint',
  props: {
    thirdPartyParams: Object
  },
  render: function(h) {
    const thirdParty = THIRD_PARTY_CAS[this.thirdPartyParams.thirdParty];
    if (thirdParty) {
      return thirdParty.render(h, this.thirdPartyParams);
    } else {
      return h('div');
    }
  }
}

export default {
  name: 'Bind',
  components: { AccountLoginForm, AccountRegisterForm, AuthTip },
  data: function() {
    return {
      params: {},
      bindType: true
    };
  },
  methods: {
    ...mapActions('user', ['setProfile']),
    set: function(params) {
      this.params = params;
    },
    onChangeBindType: function(type) {
      this.bindType = type;
    },
    handleBindAccount: function(profile) {
      this.setProfile(profile);
      this.$router.replace({ name: 'home' });
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  width: 520px;
  margin: 0 auto;
  border: 1px solid rgb(185, 185, 185);
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px #f5f7f9;
}

.bindWrapper {
  padding: 64px 70px 48px;
}

.bindWrapper .bindBottom {
  margin-top: -8px;
  margin-bottom: 8px;

  a {
    color: #005980;
  }
}

.bindWrapper .bindHeader {
  margin-bottom: -10px;
  h3 {
    font-size: 1.28rem;
  }
}

.bindWrapper .bindTitle {
  margin-bottom: 40px;
}
</style>
