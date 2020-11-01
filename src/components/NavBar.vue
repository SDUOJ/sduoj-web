<!--
   Copyright 2020-2020 the original author or authors.

   Licensed under the General Public License, Version 3.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

        https://www.gnu.org/licenses/gpl-3.0.en.html
 -->

<template>
  <div class="header fixed">
    <div class="container">
      <Menu mode="horizontal" theme="light" :active-name="$route.path.split('/')[1]">
        <div class="logo" @click="$router.push('/')">
          <img src="../assets/logo.png" style="width: 100px; height: 30px;"/>
        </div>
        <MenuItem name="home" :to="{ name: 'home' }">
          <span class="span__menu">Home</span>
        </MenuItem>
        <MenuItem name="problem" :to="{ name: 'problem' }">
          <span class="span__menu">Problem</span>
        </MenuItem>
        <MenuItem name="contest" :to="{ name: 'contest' }">
          <span class="span__menu">Contest</span>
        </MenuItem>
        <MenuItem name="submission" :to="{ name: 'submission' }">
          <span class="span__menu">Submission</span>
        </MenuItem>
        <div class="navbar-user">
          <template v-if="isLogin">
            <Avatar :src="avatar"/>
            <Dropdown @on-click="onClick">
              <div class="navbar-username">
                {{username}}
                <Icon type="ios-arrow-down"></Icon>
              </div>
              <DropdownMenu slot="list">
                <DropdownItem name="home">Profile</DropdownItem>
                <DropdownItem name="manage" v-if="isAdmin">Manage</DropdownItem>
                <DropdownItem name="logout" divided>Logout</DropdownItem>
              </DropdownMenu>
            </Dropdown>
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

export default {
  methods: {
    toLogin: function () {
      this.$router.push({
        name: 'login'
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
      } else if (name === 'home') {
        this.toHome();
      } else if (name === 'manage') {
        window.open(this.manageUrl, '_blank');
      }
    },
    handleLogout: function () {
      api.logout().then(_ => this.$store.dispatch('user/clearProfile'));
    },
    toHome: function () {
      this.$router.push({
        name: 'user'
      });
    }
  },
  computed: {
    ...mapGetters('user', ['isLogin', 'username', 'avatar', 'isAdmin']),
    manageUrl: function() {
      if (process.env.NODE_ENV === 'production') {
        return `${location.protocol}//${location.host}${process.env.VUE_APP_OJ_MANAGE}`;
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
