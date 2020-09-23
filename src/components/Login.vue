<template>
  <div class="container clearfix">
    <div class="login">
      <div class="login-title">
          <span>Welcome to SDUOJ</span>
      </div>
      <div class="login-body">
        <Form ref="loginForm" :model="loginForm" :rules="loginRules">
          <FormItem prop="user">
            <span>Username</span>
            <Input v-model="loginForm.username" placeholder="Username" style="width: 250px" />
          </FormItem>
          <FormItem prop="password">
            <span>Password</span>
            <Input type="password" v-model="loginForm.password" placeholder="Password" style="width: 250px" />
          </FormItem>
          <FormItem>
            <Button type="text" @click="handleSubmit(loginForm)">Sign In</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        
      }
    }
  },
  methods: {
    handleSubmit: function(loginForm) {
      console.log(loginForm);
    }
  }
}
</script>

<style lang="less" scoped>

.login {
  width: 420px;
  margin: 0 auto;
  border: 1px solid rgb(185, 185, 185);
  background-color: #fff;
  border-radius: 5px;
  box-shadow:0 0 10px #f5f7f9;
}

.login-title {
  margin: 0.2em 0;
  padding: 0 0.5em;
  position: relative;
  color: #9e0a11;
  font-size: 1rem;
  font-weight: bold;
}

.login-body {
  border-top: 1px solid rgb(185, 185, 185);
  padding: 2em 1em 0 1em;
  span {
    font-weight: bold;
    margin: 0 20px 0 20px;
  }

}

.ivu-btn {
  float: right;
  :hover {
    background: rgba(0, 0, 0, .05);
  }
}

</style>