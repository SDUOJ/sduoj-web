<template>
  <Card title="Change Your Password" :padding="0" dis-hover>
      <div class="form">
      <Form ref="passwordForm" :model="passwordForm" :rules="passwordRules" label-position="right" :label-width="105">
        <Row>
          <Col span="12">
            <FormItem label="Old Password" prop="oldPassword">
              <Input type="password" v-model="passwordForm.oldPassword" style="width: 200px;">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
            <FormItem>
              <Button @click="handlePasswordUpdate('passwordForm')">Update</Button>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="New Password" prop="newPassword">
              <Input type="password" v-model="passwordForm.newPassword" style="width: 200px;">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
            <FormItem label="Confirm New Password" prop="confirmNewPassword">
              <Input type="password" v-model="passwordForm.confirmNewPassword" style="width: 200px;">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
          </Col>
        </Row>
    </Form>
    </div>
  </Card>
</template>

<script>
import api from '_u/api';

export default {
  data: function() {
    const validateNewPass = (rule, value, callback) => {
      if (value !== '') {
        this.$refs.passwordForm.validateField('confirmNewPassword');
      }
      callback();
    };
    const validateConfirmNewPass = (rule, value, callback) => {
      if (value !== this.passwordForm.newPassword) {
        callback(new Error('Password does not match'));
      }
      callback();
    };

    return {
      passwordForm: {
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      },
      passwordRules: {
        oldPassword: [
          { required: true, trigger: 'blur', min: 6, max: 32 }
        ],
        newPassword: [
          { required: true, trigger: 'blur', min: 6, max: 32 },
          { validator: validateNewPass, trigger: 'blur' }
        ],
        confirmNewPassword: [
          { required: true, validator: validateConfirmNewPass, trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    handlePasswordUpdate: function(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          const dataForm = {
            password: this.passwordForm.oldPassword,
            newPassword: this.passwordForm.newPassword
          };
          api.updateProfile(dataForm).then(ret => {
            this.$Message.success('Updated');
          }).catch(err => {
            this.$Message.error(err.message);
          }).finally(() => {
            this.$refs[name].resetFields();
          })
        }
      });
    }
  }
}
</script>

<style lang="less" scoped>
.form {
  margin-top: 25px;
}
</style>
