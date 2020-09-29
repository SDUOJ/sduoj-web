<template>
  <Card>
    <div slot="header">Your Profile</div>
    <div class="form">
      <Form ref="profileForm" :model="profileForm" label-position="right" :label-width="100">
        <Row>
          <Col span="12">
            <FormItem label="Username">
              <Input type="text" v-model="profileForm.username" style="width: 200px;">
                <Icon type="ios-person-outline" slot="prepend" />
              </Input>
            </FormItem>
            <FormItem label="Nickname">
              <Input type="text" v-model="profileForm.nickname" style="width: 200px;">
                <Icon type="ios-person-outline" slot="prepend" />
              </Input>
            </FormItem>
            <FormItem label="Student ID">
              <Input type="text" v-model="profileForm.studentId" style="width: 200px;">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
            <FormItem>
              <Button type="text" @click="handleProfileUpdate('profileForm')" :disabled="!isVerified">Update</Button>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="Gender">
              <RadioGroup v-model="profileForm.gender" border>
                <Radio label="1"><Icon type="ios-male" /></Radio>
                <Radio label="0"><Icon type="ios-female" /></Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="Phone">
              <Input type="text" v-model="profileForm.ehone" style="width: 200px;">
                <Icon type="ios-call-outline" slot="prepend" />
              </Input>
            </FormItem>
            <FormItem label="Email">
              <Tooltip v-if="isVerified" content="You are verified" placement="right">
                <span class="email-verified" v-text="profile.email"></span>
              </Tooltip>
              <Tooltip v-else content="Click to send an email" placement="right">
                <span class="email-unverified" v-text="profile.email" @click="sendEmail"></span>
              </Tooltip>
            </FormItem>
            <FormItem label="Roles">
              <span class="roles" v-for="role in profile.roles" :key="role">{{ role }}</span>
            </FormItem>
          </Col>
        </Row>
    </Form>
    </div>
  </Card>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Card from '@/components/Card';

export default {
  components: { Card },
  data: function() {
    return {
      profileForm: {
        username: '',
        nickname: '',
        studentId: '',
        gender: '',
        phone: '',
        email: ''
      }
    }
  },
  methods: {
    handleProfileUpdate: function(name) {
      console.log(this.profileForm);
    },
    sendEmail: function() {
      console.log('resend email to' + this.profile.email);
    }
  },
  computed: {
    ...mapState('user', ['profile']),
    ...mapGetters('user', ['isVerified'])
  },
  mounted: function() {
    const profile = this.$store.state.user.profile
    Object.keys(this.profileForm).forEach(element => {
      if (profile[element] !== undefined) {
        this.profileForm[element] = profile[element]
      }
    })
  }
}
</script>

<style lang="less" scoped>
.form {
  margin-top: 25px;
}
.roles {
  ::after {
    content: ", "
  }
  ::after:last-child {
    content: "";
  }
}

.email-verified::after {
  color: #5cb85c;
  font-weight: 500;
  content: " (Verified)";
}
.email-unverified::after {
  color: #d9534f;
  font-weight: 500;
  content: " (Unverified)";
}
.email-unverified:hover {
  cursor: pointer;
}
</style>