<template>
  <Card title="Change Your Email" :padding="0" dis-hover>
    <div class="form">
    <Form ref="emailForm" :model="emailForm" :rules="emailRules" label-position="right" :label-width="105">
      <Row>
          <Col span="12">
            <FormItem label="Password" prop="password">
              <Input type="password" v-model="emailForm.password" style="width: 200px;">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
            <FormItem>
              <Button @click="handleEmailUpdate('emailForm')">Update</Button>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="New Email" prop="newEmail">
              <Input type="email" v-model="emailForm.newEmail" style="width: 200px;">
                <Icon type="ios-mail-outline" slot="prepend"/>
              </Input>
            </FormItem>
          </Col>
        </Row>
      
    </Form>
    </div>
  </Card>
</template>

<script>
import api from '@/utils/api';

export default {
  data: function() {
    const validateEmail = (rule, value, callback) => {
      // 检查邮箱是否已被使用
      api.isExist({ email: value }).then(ret => {
        callback();
      }, _ => {
        callback(new Error('already exists'));
      });
    };
    return {
      emailForm: {
        password: '',
        newEmail: ''
      },
      emailRules: {
        password: [
          { required: true, trigger: 'blur', min: 6, max: 32 }
        ],
        newEmail: [
          { required: true, type: 'email', trigger: 'blur' },
          { validator: validateEmail, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleEmailUpdate: function(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          api.updateProfile(this.emailForm).then(ret => {
            api.getProfile();
            this.$Message.success('Updated');
          }).catch(err => {
            this.$Message.error(err.message);
          }).finally(() => {
            this.$refs[name].resetFields();
          })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.form {
  margin-top: 25px;
}
</style>