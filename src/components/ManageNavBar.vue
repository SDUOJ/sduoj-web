<!--
   Copyright 2020-2022 the original author or authors.

   Licensed under the Affero General Public License, Version 3.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

        https://www.gnu.org/licenses/agpl-3.0.en.html
 -->

<template>
  <div>
    <Row>
      <div class="logo">
        <img src="../assets/logo.png" style="width: 100px; height: 30px;"/>
      </div>
    </Row>
    <Menu :active-name="$route.path.split('/')[2]" theme="dark" width="auto">
      <MenuItem name="user" :to="{ name: 'manageuser' }">
        <Icon type="ios-navigate"></Icon>
        User
      </MenuItem>
      <MenuItem name="problem" :to="{ name: 'manageproblem' }">
        <Icon type="ios-navigate"></Icon>
        Problem
      </MenuItem>
      <MenuItem name="contest" :to="{ name: 'managecontest' }">
        <Icon type="ios-keypad"></Icon>
        Contest
      </MenuItem>
      <MenuItem name="template" :to="{ name: 'managetemplate' }">
        <Icon type="ios-paper"></Icon>
        Judge Template
      </MenuItem>
      <MenuItem name="group" :to="{ name: 'managegroup' }">
        <Icon type="ios-contacts"></Icon>
        Group
      </MenuItem>
      <MenuItem name="util" :to="{ name: 'manageutil' }">
        <Icon type="ios-settings" />
        Util
      </MenuItem>
    </Menu>
  </div>
</template>

<script>
import api from '@/utils/api';
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('user', ['username'])
  },
  mounted: function () {
    api.getProfile();
  }
};
</script>

<style lang="less" scoped>
  .logo {
    margin: 17px 0 10px 45px;

    :hover {
      cursor: pointer;
    }
  }

  /deep/ .ivu-menu-vertical {
    line-height: 25px;
  }
</style>
