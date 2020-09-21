<template>
  <div id="header">
    <Menu mode="horizontal" theme="light" active-name="1">
      <div class="logo"><img src="../assets/logo.png" alt=""></div>
      <div class="nav">
        <MenuItem name="1">
          <Icon type="ios-navigate"></Icon>Item 1
        </MenuItem>
        <MenuItem name="2">
          <Icon type="ios-keypad"></Icon>Item 2
        </MenuItem>
        <MenuItem name="3">
          <Icon type="ios-analytics"></Icon>Item 3
        </MenuItem>
        <MenuItem name="4">
          <Icon type="ios-paper"></Icon>Item 4
        </MenuItem>
      </div>
    </Menu>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.logo img {
  width: 100px;
  margin-right: 50px;
  float: left;
  position: relative;
  top: 20px;
  left: 20px;
}
</style>