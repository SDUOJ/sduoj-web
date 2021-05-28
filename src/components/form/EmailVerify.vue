<!--
   Copyright 2020-2021 the original author or authors.

   Licensed under the General Public License, Version 3.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

        https://www.gnu.org/licenses/gpl-3.0.en.html
 -->

<template>
  <div>
    <div>
      <FormItem :prop="emailProp" :label="emailLabel">
        <Input v-model="tempEmail"
               style="width: 280px"
               type="email">
          <div slot="append" class="btns">
            <span v-if="captchaColdDown">{{ `${captchaColdDown} s` }}</span>
            <Button v-else size="small" type="text" @click="openCaptchaModal" :loading="captchaBtnLoading">Verify</Button>
          </div>
        </Input>
        <slot name="email-tip"></slot>
      </FormItem>
      <FormItem :prop="emailCodeProp" :label="emailCodeLabel" required>
        <Input
          v-model="tempEmailCode"
          placeholder="Check your email"
          style="width: 280px"
          type="text" />
        <slot name="email-code-tip"></slot>
      </FormItem>
    </div>
    <Modal v-model="captchaModal"
           title="Human verification"
           width="350"
           transfer
           :loading="captchaModalLoading"
           :mask-closable="false"
           @on-ok="sendEmail">
      <div style="width: 300px">
        <div class="captcha-img">
          <slot name="captcha-tip">
            <div style="margin-top: -15px; margin-bottom: 10px">
              <span>Are you a ROBOT?</span>
            </div>
          </slot>
          <Tooltip content="Click to refresh"
                   placement="right">
            <img :src="captchaImg" @click="getCaptcha"/>
          </Tooltip>
        </div>
        <div>
          <Input v-model="captcha"
                 placeholder="Enter captcha" />
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import api from '_u/api';
import AsyncValidator from 'async-validator';

export default {
  name: 'EmailVerify',
  props: {
    emailProp: {
      type: String,
      default: 'email'
    },
    emailLabel: {
      type: String,
      default: 'Email'
    },
    emailCodeProp: {
      type: String,
      default: 'emailCode'
    },
    emailCodeLabel: {
      type: String,
      default: 'Email Code'
    },
    email: {
      type: String
    },
    emailCode: {
      type: String
    }
  },
  data: function() {
    const validateEmail = (rule, value, callback) => {
      // 检查邮箱是否已被使用
      api.isExist({ email: value }).then(ret => {
        if (ret) {
          callback(new Error('already exists'));
        } else {
          callback();
        }
      }).catch(err => {
        callback(new Error(err.message));
      });
    };

    return {
      tempEmail: '',
      tempEmailCode: '',
      captchaId: 0,
      captcha: '',
      captchaImg: '',
      captchaColdDown: 0,
      captchaModal: false,
      captchaModalLoading: true,
      captchaBtnLoading: false,
      captchaTimer: null,
      validator: new AsyncValidator({
        email: [
          { required: true, type: 'email', trigger: 'blur' },
          { validator: validateEmail, trigger: 'blur' }
        ]
      })
    }
  },
  methods: {
    getCaptcha: function() {
      // 模拟获得图形验证码
      return new Promise((resolve, reject) => {
        api.getCaptcha().then(ret => {
          this.captchaId = ret.captchaId;
          this.captchaImg = ret.captcha;
          this.clearCaptcha();
          resolve(ret);
        }).catch(err => {
          this.$Message.error(err.message);
          reject(err);
        });
      });
    },
    clearCaptcha: function() {
      this.captcha = '';
    },
    openCaptchaModal: function() {
      this.captchaBtnLoading = true;
      this.validator.validate({ email: this.tempEmail }, errors => {
        if (errors === null) {
          this.getCaptcha().then(_ => {
            this.captchaModal = true;
          }).finally(() => {
            this.captchaBtnLoading = false;
          });
        } else {
          this.captchaBtnLoading = false;
          this.$Message.error(errors[0].message);
        }
      });
    },
    sendEmail: function() {
      if (this.captcha === '') {
        this.$Message.error('Enter captcha');
        this.captchaModalLoading = false;
        this.$nextTick(() => {
          this.captchaModalLoading = true;
        });
        return;
      }

      api.sendVerificationEmail({
        email: this.tempEmail,
        captchaId: this.captchaId,
        captcha: this.captcha
      }).then(ret => {
        this.$emit('on-success', ret);
        this.captchaModal = false;
        this.$Message.success({
          content: 'A verification code has been send to your email',
          duration: 10
        });

        this.captchaColdDown = ret;
        this.captchaTimer = setInterval(() => {
          if (--this.captchaColdDown <= 0) {
            clearInterval(this.captchaTimer);
            this.captchaTimer = null;
            this.captchaColdDown = 0;
          }
        }, 1000);
      }).catch(err => {
        this.$emit('on-failed', err);
        this.$Message.error(err.message);
      }).finally(() => {
        this.getCaptcha();
        this.captchaModalLoading = false;
        this.$nextTick(() => {
          this.captchaModalLoading = true;
        });
      });
    }
  },
  watch: {
    email: function(val) {
      this.tempEmail = val;
    },
    emailCode: function (val) {
      this.tempEmailCode = val;
    },
    tempEmail: function(val) {
      this.$emit('update:email', val);
    },
    tempEmailCode: function (val) {
      this.$emit('update:emailCode', val);
    }
  },
  mounted: function() {
    this.tempEmail = this.email;
    this.tempEmailCode = this.emailCode;
  },
  beforeDestroy: function() {
    if (this.captchaTimer) {
      clearInterval(this.captchaTimer);
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .btns .ivu-btn-text:hover {
  border-color: transparent;
  background-color: transparent;
}

/deep/ .btns .ivu-btn-text:focus {
  border-color: transparent;
  background-color: transparent;
}

/deep/ .btns .ivu-btn-loading {
  border-color: transparent;
  background-color: transparent;
}

.captcha-img {
  margin-top: 5px;
  :hover {
    cursor: pointer;
  }
}
</style>
