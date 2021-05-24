<!--
   Copyright 2020-2021 the original author or authors.

   Licensed under the General Public License, Version 3.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

        https://www.gnu.org/licenses/gpl-3.0.en.html
 -->

<template>
    <div class="box clearfix" v-if="apply">
      <div class="registerDiv">
        <div class="registerSwitchDiv">
          <div class="accountRegister">
            <div class="selectedType">Register Account</div>
          </div>
        </div>
        <div class="registerForm">
          <AccountRegisterForm @on-success="handleRegister" />
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
import AccountRegisterForm from '_c/form/register/AccountRegisterForm';

export default {
  components: { AccountRegisterForm },
  data: function () {
    return {
      apply: true,
      message: ''
    };
  },
  methods: {
    handleRegister: function() {
      this.apply = false;
      this.message = 'Success, check your email for activation';
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
@sdu-red: #d84a2b;
.box {
  width: 420px;
  margin: 0 auto;
  border: 1px solid rgb(185, 185, 185);
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px #f5f7f9;
}

.registerDiv {
  background: #fff;
  border-radius: 4px
}

.registerSwitchDiv {
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

.registerSwitchDiv .accountRegister {
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

.registerSwitchDiv div.selectedType {
  border-bottom: 3px solid @sdu-red;
  color: @sdu-red;
}

.activation {
  text-align: center;
}

.registerForm {
  margin: 20px 10px;

}
</style>
