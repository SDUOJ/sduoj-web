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
      <Form ref="accountLoginForm"
            :model="accountLoginForm"
            :rules="accountLoginRules"
            label-position="right">
        <FormItem prop="username" label="Username (or Email)">
          <Input v-model="accountLoginForm.username" style="width: 280px" />
        </FormItem>
        <FormItem prop="password" label="Password">
          <Input type="password" v-model="accountLoginForm.password" style="width: 280px" @on-enter="handleAccountLogin"/>
        </FormItem>
      </Form>
    </div>
    <div class="btnGroup" style="margin-top: -1px">
      <Button class="btn" type="error" long size="large"
              @click="handleAccountLogin"
              :loading="btnAccountLoginLoading">{{ loginText }}</Button>
      <Button v-if="token === ''" class="btn" long :to="{ name: 'reset-password' }">Forget password</Button>
    </div>
  </div>
</template>

<script>
import api from '_u/api';

export default {
  name: 'AccountLoginForm',
  props: {
    token: {
      type: String,
      default: ''
    },
    loginText: {
      type: String,
      default: 'Login'
    }
  },
  data: function() {
    return {
      accountLoginForm: {
        username: '',
        password: ''
      },
      accountLoginRules: {
        username: [
          { required: true, trigger: 'blur' }
        ],
        password: [
          { required: true, trigger: 'blur' }
        ]
      },
      btnAccountLoginLoading: false
    }
  },
  methods: {
    handleAccountLogin: function() {
      this.$refs.accountLoginForm.validate(valid => {
        if (valid) {
          let apiName = 'login';
          const data = this.accountLoginForm;
          if (this.token !== '') {
            apiName = 'thirdPartyBinding';
            data.token = this.token;
          }

          this.btnAccountLoginLoading = true;
          api[apiName](data).then(ret => {
            this.$emit('on-success', ret);
          }).catch(err => {
            this.$Message.error(err.message);
          }).finally(() => {
            this.btnAccountLoginLoading = false;
          });
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
@sdu-red: #d84a2b;
.btnGroup {
  width: 280px;
  margin: 15px auto;
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
