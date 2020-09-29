<template>
  <div class="container">
    <Row>
      <Col span="16">
        <div style="margin-right: 30px;">
          <UserProfile />
          <UserPassword v-if="isVerified" style="margin: 20px 0;" />
          <UserEmail v-if="isVerified" />
        </div>
      </Col>
      <Col span="8">
        <Card class="profile">
          <div class="avatar-box">
            <img :src="avatar || defaultAvatar" alt="">
          </div>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import defaultAvatar from '@/assets/default.png';
import { mapGetters } from 'vuex';
import Card from '@/components/Card';
import UserProfile from '@/views/user/children/UserProfile';
import UserPassword from '@/views/user/children/UserPassword';
import UserEmail from '@/views/user/children/UserEmail';

export default {
  components: { Card, UserProfile, UserPassword, UserEmail },
  computed: {
    ...mapGetters('user', ['avatar', 'isVerified']),
    defaultAvatar: function() {
      return defaultAvatar;
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.ivu-menu-item:hover {
  background: rgba(0, 0, 0, .05);
}
.profile {
  width: 100%;
}
.avatar-box {
  height: 150px;
  width: 150px;
  margin: 10px auto;
  background-color: #fff;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
}
</style>