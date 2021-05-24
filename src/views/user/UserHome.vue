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
            <span style="color: #aaa;">We use <a href="https://cn.gravatar.com/" target="_blank">Gravatar</a> to present your avatar icon</span>
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
        <Card class="profile clearfix" style="margin: 20px 0;" :padding="20" dis-hover>
          <List>
            <ListItem v-for="cas in THIRD_PARTY_ENUM" :key="cas">
              <ListItemMeta :title="cas" :description="THIRD_PARTY_CAS[cas].description"/>
              <template slot="action" v-if="THIRD_PARTY_CAS[cas].getId(profile)">
                <li>
                  <span>{{ THIRD_PARTY_CAS[cas].getId(profile) }}</span>
                </li>
                <li>
                  <a v-if="!thirdPartyStatus[cas]" href="javascript:void(0)" @click="handleUnbind(cas)">Unbind</a>
                </li>
                </template>
                <template slot="action" v-else>
                  <li>NONE</li>
                </template>
            </ListItem>
          </List>
        </Card>
      </Col>
    </Row>
    <Reconfirm ref="reconfirm"
               message="Are you sure to unbind this third party certification?"
               :confirm-text.sync="confirmText"
               button-text="I confirm to unbind" />
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import UserProfile from '@/views/user/children/UserProfile';
import UserPassword from '@/views/user/children/UserPassword';
import UserEmail from '@/views/user/children/UserEmail';
import Reconfirm from '_c/Reconfirm';

import { THIRD_PARTY_CAS, THIRD_PARTY_ENUM } from '../third-party/js/ThirdPartyEnum';
import api from '_u/api';

export default {
  components: { UserProfile, UserPassword, UserEmail, Reconfirm },
  inject: ['reload'],
  data: function() {
    return {
      thirdPartyStatus: {},
      confirmText: ''
    };
  },
  computed: {
    ...mapState('user', ['profile']),
    ...mapGetters('user', ['avatar', 'isVerified']),
    THIRD_PARTY_CAS: () => THIRD_PARTY_CAS,
    THIRD_PARTY_ENUM: () => THIRD_PARTY_ENUM
  },
  methods: {
    handleUnbind: function(thirdParty) {
      this.confirmText = THIRD_PARTY_CAS[thirdParty].getId(this.profile);
      console.log(this.confirmText);
      this.$refs.reconfirm.reconfirm(() => {
        this.thirdPartyStatus[thirdParty] = true;
        api.thirdPartyUnbinding({ thirdParty }).then(ret => {
          this.$Message.success('Success');
          this.reload();
        }).catch(err => {
          this.$Message.error(err.message);
        }).finally(() => {
          this.thirdPartyStatus[thirdParty] = false;
        });
      });
    }
  },
  mounted: function() {
    for (const cas in THIRD_PARTY_ENUM) {
      this.$set(this.thirdPartyStatus, cas, false);
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
