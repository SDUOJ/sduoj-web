<!--
   Copyright 2020-2022 the original author or authors.

   Licensed under the Affero General Public License, Version 3.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

        https://www.gnu.org/licenses/agpl-3.0.en.html
 -->

<template>
  <div class="header fixed">
    <div class="container">
      <Menu mode="horizontal" theme="light" :active-name="$route.path.split('/')[1]">
<!--        <div class="logo" @click="$router.push('/')">-->
<!--          <img src="../../public/nju-logo.png" style="width: 30px; height: 30px;"/>-->
<!--        </div>-->
<!--        <MenuItem name="home" :to="{ name: 'home' }">-->
<!--          <span class="span__menu">Home</span>-->
<!--        </MenuItem>-->
<!--        <MenuItem name="problem" :to="{ name: 'problem' }">-->
<!--          <span class="span__menu">Problem</span>-->
<!--        </MenuItem>-->
        <MenuItem name="contest" :to="{ name: 'contest' }">
          <span class="span__menu">南京大学编译原理实验平台</span>
        </MenuItem>
<!--        <MenuItem name="submission" :to="{ name: 'submission' }">-->
<!--          <span class="span__menu">Submission</span>-->
<!--        </MenuItem>-->
<!--        <MenuItem name="group" :to="{ name: 'group' }">-->
<!--          <span class="span__menu">Group</span>-->
<!--        </MenuItem>-->
        <div class="navbar-user">
          <template v-if="isLogin">
            <Avatar :src="avatar"/>
            <Dropdown @on-click="onClick">
              <div class="navbar-username">
                {{nickname}} ({{username}})
                <Icon type="ios-arrow-down"></Icon>
              </div>
              <DropdownMenu slot="list">
                <DropdownItem name="user">Profile</DropdownItem>
                <DropdownItem name="logout" divided>Logout</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <template v-if="isAdmin">
              <Divider type="vertical" />
              <a :href="manageUrl" target="_blank">To Manage</a>
            </template>
          </template>
          <template v-else>
            <Button type="text" @click="toLogin">
              <span class="span__menu">Login</span>
            </Button>
            <Button type="text" @click="toRegist">
              <span class="span__menu">Register</span>
            </Button>
          </template>
        </div>
      </Menu>
    </div>
  </div>
</template>

<script>
import api from '_u/api';
import { mapGetters } from 'vuex';

import { SDUOJ_ENV } from '_u/env';

export default {
  inject: ['reload'],
  methods: {
    toLogin: function () {
      this.$router.push({
        name: 'login',
        query: {
          to: this.$route.name === 'login' ? '/contest' : this.$route.fullPath
        }
      });
    },
    toRegist: function () {
      this.$router.push({
        name: 'register'
      });
    },
    onClick: function (name) {
      if (name === 'logout') {
        this.handleLogout();
      } else if (name === 'user') {
        this.toUser();
      }
    },
    handleLogout: function () {
      api.logout().then(_ => {
        this.$store.dispatch('user/clearProfile');
        this.$router.push({ name: 'contest' });
        this.$Message.success('Log out successfully');
      });
    },
    toUser: function () {
      this.$router.push({ name: 'user' });
    }
  },
  computed: {
    ...mapGetters('user', ['isLogin', 'username', 'nickname', 'avatar', 'isAdmin']),
    manageUrl: function() {
      if (SDUOJ_ENV.PROD) {
        return `${location.origin}${process.env.VUE_APP_OJ_MANAGE}`;
      } else {
        return process.env.VUE_APP_OJ_MANAGE;
      }
    }
  },
  mounted: function () {
    api.getProfile();
  }
};
</script>

<style lang="less" scoped>
  .header {
    user-select: none;
    position: fixed;
    height: 50px;
    top: 0;
    left: 0;
    right: auto;
    bottom: auto;
    background-color: #fff;
    border: 1px solid rgba(34, 36, 38, .15);
    box-shadow: 0 1px 2px 0 rgba(34, 36, 38, .15);
  }

  .fixed {
    z-index: 101;
    width: 100%;
    margin: 0;
  }

  .logo {
    // width: 100px;
    margin-right: 20px;
    float: left;
    position: relative;
    top: 8px;

    :hover {
      cursor: pointer;
    }
  }

  /deep/ .ivu-menu-item-active {
    background: rgba(0, 0, 0, .05);
  }

  /deep/ .ivu-menu-item:hover {
    background: rgba(0, 0, 0, .05);
  }

  /deep/ .ivu-menu-item {
    font-size: 30px;
  }

  /deep/ .ivu-menu-horizontal {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid rgba(34, 36, 38, .15);
    box-shadow: 0 1px 2px -1px rgba(34, 36, 38, .15);
  }

  .navbar-user {
    float: right;
    margin: 0;

    .navbar-username {
      margin: auto 8px;
      font-size: 16px;
    }

    :hover {
      cursor: pointer;
    }

    .ivu-btn:hover {
      background: rgba(0, 0, 0, .05);
    }
  }
</style>
