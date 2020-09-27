<template>
  <div class="box clearfix">
      <div class="title">
          <span>Reset your password</span>
      </div>
      <div class="body">
        <Form ref="resetForm" 
          :model="resetForm" 
          :rules="resetRules" 
          label-position="right" 
          :label-width="150" 
          label-colo>
          <template v-if="apply">
            <FormItem prop="handler" label="Username or Email">
              <Input v-model="resetForm.handler" placeholder="Username or Email" style="width: 220px" />
            </FormItem>
          </template>
          <template v-else>
            <FormItem prop="password" label="New Password">
              <Input
                v-model="resetForm.password"
                placeholder="At least 6 characters"
                style="width: 220px"
                type="password"
              />
            </FormItem>
            <FormItem prop="confirmPassword" label="Confirm New Password">
              <Input
                v-model="resetForm.confirmPassword"
                placeholder="Be same as your new password"
                style="width: 220px"
                type="password"
              />
            </FormItem>
            </template>
            <FormItem prop="captcha" label="Captcha">
              <div class="captcha-code">
                <Input
                  v-model="resetForm.captcha"
                  placeholder="Click to get captcha"
                  style="width: 220px"
                  @on-focus="onCaptchaInputFocus"
                />
              </div>
              <div class="captcha-img">
                <Tooltip content="Click to refresh" placement="right">
                  <img :src="captchaImg" @click="getCaptcha"/>
                </Tooltip>
              </div>
            </FormItem>
        </Form>
      </div>
      <div class="bottom">
        <div class="btns">
          <Button type="text" 
            @click="handleReset('resetForm')" 
            :loading="btnResetLoading">Reset</Button>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  data: function() {
    const validatePass = (rule, value, callback) => {
      if (value !== '') {
        this.$refs.resetForm.validateField('confirmPassword');
      }
      callback();
    };
    const validateConfirmPass = (rule, value, callback) => {
      if (value !== this.resetForm.password) {
        callback(new Error('Password does not match'));
      }
      callback();
    };
    return {
      resetForm: {
        handler: '',
        captcha: '',
        password: '',
        confirmPassword: ''
      },
      resetRules: {
        handler: [
          { required: true, trigger: 'blur' }
        ],
        captcha: [
          { required: true, trigger: 'blur' }
        ],
        password: [
          { required: true, trigger: 'blur', min: 6, max: 32 },
          { validator: validatePass, trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, validator: validateConfirmPass, trigger: 'change' }
        ]
      },
      btnResetLoading: false,
      captchaId: '',
      captchaImg: '',
      token: '',
      apply: true
    }
  },
  methods: {
    handleReset: function(name) {
      this.$refs[name].validate(valid => {
        if (!valid) {
          return;
        }

        const dataForm = Object.assign({}, this.resetForm);
        delete dataForm.confirmPassword;
        if (this.apply) {
          delete dataForm.password;
          // TODO: 发送重置链接
        } else {
          delete dataForm.handler;
          dataForm.token = this.token;
          // TODO: 重置密码
        }
        console.log(dataForm);
      })
    },
    onCaptchaInputFocus: function() {
      if (!this.captchaId) {
        this.getCaptcha();
      }
    },
    getCaptcha: function() {
      // TODO: 索取图形验证码
      // 模拟获得图形验证码
      this.captchaId = 1;
      this.captchaImg = 'data:image/png;base64,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';
    }
  },
  mounted: function() {
    if (this.$route.query.token) {
      this.token = this.$route.query.token;
      // TODO: validate token and set `apply` to false if valid
      this.apply = false;
      this.$Message.success('Reset your password');
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
  :hover {
    cursor: pointer;
  }
}

.bottom {
  border-top: 1px solid rgb(185, 185, 185);
  padding-right: 10px;
}
</style>