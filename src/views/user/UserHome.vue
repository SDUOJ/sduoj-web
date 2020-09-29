<template>
  <div class="container">
    <Row>
      <Col span="18">
        <router-view></router-view>
      </Col>
      <Col span="6">
        <div class="profile">
          <div class="avatar-box">
            <img :src="profile.avatar || defaultAvatar" alt="">
          </div>
        </div>
      </Col>
    </Row>
  </div>
    <!-- <Card class="container clearfix">
      <Row style="margin: 20px 10px">
        <Col span="8">
          <Menu theme="light" :active-name="$route.path">
            <MenuItem name="/user/profile" to="profile">
              <Icon type="md-document" />
              Profile
            </MenuItem>
            <MenuItem name="/user/password" to="password">
              <Icon type="md-chatbubbles" />
              Password
            </MenuItem>
            <MenuItem name="/user/email" to="email">
              <Icon type="md-chatbubbles" />
              Email 
            </MenuItem>
          </Menu>
        </Col>
        <Col span="16">
          <Row>
            <Col span="15">
              <router-view></router-view>
            </Col> 
            <Col span="9" class="">
            <div class="avatar-box">
              <div class="avatar">
                <Avatar icon="ios-person" :size="100" />
              </div>
                <Upload
                  multiple
                  type="drag"
                  action="">
                  <div style="padding: 5px 0">
                      <Icon type="ios-cloud-upload" size="30" style="color: #3399ff"></Icon>
                      <p>Click or drag</p>
                  </div>
                </Upload>
            </div>
            </Col>
          </Row> 
        </Col>
      </Row>
    </Card> -->
</template>

<script>
import defaultAvatar from '@/assets/default.png';
import { mapState } from 'vuex';
import Card from '@/components/Card';

export default {
  // components: { Card }
  computed: {
    ...mapState('user', ['profile']),
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
  // border: 1px solid #eee;
  // border-radius: 50%;
  margin: 10px auto;
  // box-shadow: 0 0 10px #ddd;
  // position: absolute;
  // top: 50%;
  // left: 50%;
  // transform: translate(-50%, -50%);
  background-color: #fff;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
}
</style>