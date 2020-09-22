<template>
  <div class="header">
    <Menu mode="horizontal" theme="light" @on-select="selectNavItem">
      <div class="logo" @click="selectNavItem('home')">
        <img src="../assets/logo.png" />
      </div>
      <div class="navbar">
        <MenuItem name="problem">
          <Icon type="ios-navigate"></Icon>题库
        </MenuItem>
        <MenuItem name="contest">
          <Icon type="ios-keypad"></Icon>比赛
        </MenuItem>
        <MenuItem name="undefined1">
          <Icon type="ios-analytics"></Icon>Item 3
        </MenuItem>
        <MenuItem name="undefined2">
          <Icon type="ios-paper"></Icon>Item 4
        </MenuItem>
      </div>
      <div class="navbar-user">
        <template v-if="isLogin">
          <Avatar :src="avatar" />
          <Dropdown>
            <div class="navbar-username">
              {{username}}
              <Icon type="ios-arrow-down"></Icon>
            </div>
          <DropdownMenu slot="list">
            <DropdownItem>驴打滚</DropdownItem>
            <DropdownItem>炸酱面</DropdownItem>
            <DropdownItem disabled>豆汁儿</DropdownItem>
            <DropdownItem>冰糖葫芦</DropdownItem>
            <DropdownItem divided>北京烤鸭</DropdownItem>
          </DropdownMenu>
          </Dropdown>
          <!-- <div class="username">{{ currentUser.username }}</div> -->
        </template>
        <template v-else>
          <Button type="text">登录</Button>
          <Button type="text">注册</Button>
        </template>
      </div>
    </Menu>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data: function() {
    return {
      activeItemName: ''
    }
  },
  methods: {
    selectNavItem: function(name) {
      this.activeItemName = name;
      this.$router.push('/' + this.activeItemName);
    }
  },
  computed: {
    ...mapState('user', ['isLogin', 'username', 'avatar'])
  }
};
</script>

<style lang="less" scoped>
.logo {
  img {
    width: 100px;
    margin-right: 50px;
    float: left;
    position: relative;
    top: 20px;
    left: 20px;
  }
  :hover {
    cursor: pointer;
  }
}

.navbar-user {
  float: right;
  margin: 0 80px;
  .navbar-username {
    // display: inline;
    margin: auto 8px;
    font-size: 16px;
  }
    :hover {
      cursor: pointer;
    }
}
</style>