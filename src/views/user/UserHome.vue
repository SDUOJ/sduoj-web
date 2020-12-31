<!--
   Copyright 2020-2021 the original author or authors.

   Licensed under the General Public License, Version 3.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

        https://www.gnu.org/licenses/gpl-3.0.en.html
 -->

<template>
  <div class="container">
    <Row>
      <Col span="16">
        <div style="margin-right: 30px;">
          <UserProfile />
          <UserPassword style="margin: 20px 0;" />
          <UserEmail />
        </div>
      </Col>
      <Col span="8">
        <Card class="profile clearfix" :padding="20" dis-hover>
          <div class="avatar-box">
            <img :src="avatar" />
          </div>
          <div style="text-align: center;">
            <span style="color: #aaa;">We use <a href="https://en.gravatar.com/" target="_blank">Gravatar</a> to present your avatar icon</span>
          </div>
          <!--          TODO：暂不可用 需要后端支持-->
<!--          <div class="statistic clearfix">-->
<!--            <div>-->
<!--              <span>Submissions</span>-->
<!--              <p class="emphasis">{{ profile.submissions || 0 }}</p>-->
<!--            </div>-->
<!--            <div>-->
<!--              <span>Solved</span>-->
<!--              <span class="emphasis">{{ profile.solved || 0 }}</span>-->
<!--            </div>-->
<!--            <div>-->
<!--              <span>Unsolved</span>-->
<!--              <span class="emphasis">{{ profile.unsolved || 0 }}</span>-->
<!--            </div>-->
<!--          </div>-->
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import UserProfile from '@/views/user/children/UserProfile';
import UserPassword from '@/views/user/children/UserPassword';
import UserEmail from '@/views/user/children/UserEmail';

export default {
  components: { UserProfile, UserPassword, UserEmail },
  computed: {
    ...mapState('user', ['profile']),
    ...mapGetters('user', ['avatar', 'isVerified'])
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
.emphasis {
  float: right;
  font-size: 20px;
  font-weight: 600;
}
.statistic {
  border-top: 1px solid #d4d4d5;
  padding: 10px 40px 0;
  div {
    margin: 10px 0;
    height: 30px;
    span {
      line-height: 30px;
    }
  }
}
</style>
