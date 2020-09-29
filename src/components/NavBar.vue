<template>
  <div class="header fixed">
    <div class="container">
      <Menu mode="horizontal" theme="light" :active-name="$route.path">
        <div class="logo" @click="$router.push('/')">
          <img src="../assets/logo.png" style="width: 100px; height: 30px;"/>
        </div>
        <!-- <div class="navbar"> -->
          <MenuItem name="/home" to="/home">
            <Icon type="ios-navigate"></Icon>首页
          </MenuItem>
          <MenuItem name="/problem" to="/problem">
            <Icon type="ios-navigate"></Icon>题库
          </MenuItem>
          <MenuItem name="/contest" to="/contest">
            <Icon type="ios-keypad"></Icon>比赛
          </MenuItem>
          <MenuItem name="/undefined" to="/undefined">
            <Icon type="ios-analytics"></Icon>Item 3
          </MenuItem>
          <MenuItem name="/undefined" to="/undefined">
            <Icon type="ios-paper"></Icon>Item 4
          </MenuItem>
        <!-- </div> -->
        <div class="navbar-user">
          <template v-if="isLogin">
            <Avatar :src="avatar" />
            <Dropdown @on-click="onClick">
              <div class="navbar-username">
                {{username}}
                <Icon type="ios-arrow-down"></Icon>
              </div>
              <DropdownMenu slot="list">
                <DropdownItem name="home">主页</DropdownItem>
                <DropdownItem name="logout" divided>登出</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </template>
          <template v-else>
            <Button type="text" @click="toLogin">登录</Button>
            <Button type="text" @click="toRegist">注册</Button>
          </template>
        </div>
      </Menu>
    </div>
  </div>
</template>

<script>
import api from '@/utils/api';
import { mapGetters } from 'vuex';

export default {
  methods: {
    toLogin: function() {
      this.$router.push('/login');
    },
    toRegist: function() {
      this.$router.push('/register');
    },
    onClick: function(name) {
      if (name === 'logout') {
        this.handleLogout();
      } else if (name === 'home') {
        this.toHome();
      }
    },
    handleLogout: function() {
      api.logout().then(_ => this.$store.dispatch('user/clearProfile'));
    },
    toHome: function() {
      this.$router.push('/user');
    }
  },
  computed: {
    ...mapGetters('user', ['isLogin', 'username', 'avatar'])
  },
  mounted: function() {
    api.getProfile().then(ret => this.$store.dispatch('user/setProfile', ret)); 
  }
};
</script>

<style lang="less" scoped>
.header {
  user-select: none;
  position: fixed;
  height: 50px;
  top: 0px;
  left: 0px;
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