<template>
  <Card title="Your Profile" :padding="0" dis-hover>
    <div class="form">
      <Form ref="profileForm" :model="profileForm" :rules="profileRules" label-position="right" :label-width="100">
        <Row>
          <Col span="12">
            <FormItem label="Username">
                <span>{{ profile.username }}</span>
            </FormItem>
            <FormItem label="Nickname">
              <Input type="text" v-model="profileForm.nickname" style="width: 200px;">
                <Icon type="ios-person-outline" slot="prepend" />
              </Input>
            </FormItem>
            <FormItem label="Student ID">
              <Input type="text" v-model="profileForm.studentId" style="width: 200px;">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
            <FormItem label="Confirm Password" prop="password">
              <Input type="password" v-model="profileForm.password" style="width: 200px;">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
            <FormItem>
              <Button @click="handleProfileUpdate('profileForm')" :disabled="!isVerified">Update</Button>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="Gender">
              <RadioGroup v-model="profileForm.gender" border>
                <Radio label=2><Icon type="md-help" /></Radio>
                <Radio label=1><Icon type="md-male" /></Radio>
                <Radio label=0><Icon type="md-female" /></Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="Phone">
              <Input type="text" v-model="profileForm.phone" style="width: 200px;">
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
import api from '@/utils/api';

export default {
  data: function() {
    return {
      profileForm: {
        nickname: '',
        studentId: '',
        gender: '',
        phone: '',
        password: ''
      },
      profileRules: {
        password: [
          { required: true, trigger: 'blur', min: 6, max: 32 }
        ]
      }
    }
  },
  methods: {
    handleProfileUpdate: function(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          api.updateProfile(this.profileForm).then(ret => {
            api.getProfile().then(ret => this.$store.dispatch('user/setProfile', ret)).catch(_ => _);
            this.$Message.success('Updated');
          }).catch(err => {
            this.$Message.error(err.message);
          })
        }
      })
    },
    sendEmail: function() {
      if (!this.isVerified) {
        api.sendVerificationEmail(this.username).then(ret => {
          this.$Message.success('An verification email has sent to ' + ret.data);
        }).catch(err => {
          this.$Message.error(err.message);
        })
      }
    }
  },
  computed: {
    ...mapState('user', ['profile']),
    ...mapGetters('user', ['isVerified', 'username'])
  },
  mounted: function() {
    const profile = this.$store.state.user.profile
    Object.keys(this.profileForm).forEach(element => {
      if (profile[element] !== undefined) {
        this.profileForm[element] = profile[element]
      }
    })
    this.profileForm.gender = this.profileForm.gender.toString();
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