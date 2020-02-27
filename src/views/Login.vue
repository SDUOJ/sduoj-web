<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      class="login-form"
      label-position="left"
      :rules="loginRules"
    >
      <!-- <img style="width:70px;" src="@/assets/Shandong_University-1.png" alt=""> -->
      <h3 class="title">计算机学院在线评测系统</h3>
      <el-form-item prop="username">
        <span class="svg-container"> <v-icon name="user" /> </span>
        <el-input
          v-model="loginForm.username"
          name="username"
          type="text"
          placeholder="在此输入用户名"
        />
      </el-form-item>
      <el-form-item prop="password" ref="passwordForm">
        <span class="svg-container"> <v-icon name="key" /> </span>
        <el-input
          :type="pwdType"
          v-model="loginForm.password"
          name="password"
          placeholder="在此输入密码"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd"> <v-icon name="eye" /> </span>
      </el-form-item>
      <el-form-item>
        <el-button
          :loading="loading"
          type="primary"
          style="width:100%;"
          @click.native.prevent="handleLogin"
          >登录</el-button
        >
      </el-form-item>
      <div class="tips">
        <span style="margin-right:20px;">默认账号: 学号/教工号</span>
        <span>默认密码: 学号/教工号</span>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data: function() {
    const validateUsername = (rule, value, callback) => {
      if (value.length == 0) {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length == 0) {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "change", validator: validateUsername }
        ],
        password: [
          { required: true, trigger: "change", validator: validatePassword }
        ]
      },
      loading: false,
      pwdType: "password"
    };
  },
  methods: {
    showPwd: function() {
      if (this.pwdType === "password") {
        this.pwdType = "";
      } else {
        this.pwdType = "password";
      }
    },
    handleLogin: function() {
      this.$refs["loginForm"].validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("login", { ...this.loginForm, to: "/" })
            .catch(err => {
              console.log(err);
              this.$message({
                message: err,
                type: "warning",
                duration: "1900"
              });
              this.loginForm.password = "";
              this.loading = false;
            });
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
$bg: #2d3a4b;
$light_gray: #eee;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      font-size: 19px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
