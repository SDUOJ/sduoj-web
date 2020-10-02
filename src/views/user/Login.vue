<template>
  <div class="box clearfix">
      <div class="title">
          <span>Welcome to SDUOJ</span>
      </div>
      <div class="body">
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
            <Input type="password" v-model="loginForm.password" placeholder="Password" style="width: 220px" />
          </FormItem>
        </Form>
      </div>
      <div class="bottom">
        <div class="btns">
          <a href="/#/resetpass">Forgot your password?</a>
          <Button type="text" 
            @click="handleLogin('loginForm')" 
            :loading="btnLoginLoading">Login</Button>
        </div>
      </div>
  </div>
</template>

<script>
import api from '@/utils/api';
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
          const dataForm = Object.assign({}, this.loginForm);
          api.login(dataForm).then(ret => {
            this.setProfile(ret);
            this.$router.replace({ name: 'home' });
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
}

.bottom {
  border-top: 1px solid rgb(185, 185, 185);
  padding-right: 10px;
}
</style>