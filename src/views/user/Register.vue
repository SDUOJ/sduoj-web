<!--
   Copyright 2020-2022 the original author or authors.

   Licensed under the Affero General Public License, Version 3.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

        https://www.gnu.org/licenses/agpl-3.0.en.html
 -->

<template>
    <div class="box clearfix">
      <div class="registerDiv">
        <div class="registerSwitchDiv">
          <div class="accountRegister">
            <div class="selectedType">Register Account</div>
          </div>
        </div>
        <div class="registerForm">
          <AccountRegisterForm @on-success="handleAccountRegister" />
        </div>
      </div>
    </div>
</template>

<script>
import AccountRegisterForm from '_c/form/register/AccountRegisterForm';
import { mapActions } from 'vuex';

export default {
  components: { AccountRegisterForm },
  methods: {
    ...mapActions('user', ['setProfile']),
    handleAccountRegister: function(profile) {
      this.$Message.success('Register successfully');

      this.setProfile(profile);
      this.$router.replace({ name: 'problem' });
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

.registerForm {
  margin: 20px 10px;

}
</style>
