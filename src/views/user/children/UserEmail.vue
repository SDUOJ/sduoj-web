<template>
  <Card>
    <div slot="header">Change Your Email</div>
    <div class="form">
    <Form ref="emailForm" :model="emailForm" :rules="emailRules" label-position="right" :label-width="105">
      <FormItem label="New Email" prop="newEmail">
        <Input type="email" v-model="emailForm.newEmail" style="width: 200px;">
          <Icon type="ios-mail-outline" slot="prepend"/>
        </Input>
      </FormItem>
      <FormItem>
        <Button type="text" @click="handleEmailUpdate('emailForm')">Update</Button>
      </FormItem>
    </Form>
    </div>
  </Card>
</template>

<script>
import Card from '@/components/Card';

export default {
  components: { Card },
  data: function() {
    const validateEmail = (rule, value, callback) => {
      // vcheck email is valid
      callback();
    }
    return {
      emailForm: {
        newEmail: ''
      },
      emailRules: {
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
          console.log(this.emailForm);
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