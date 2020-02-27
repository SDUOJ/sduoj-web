<template>
  <div class="menu">
    <span @click="logout" class="menu-item">
      <span class="menu-item-svg"> <v-icon name="sign-out-alt" /> </span>登出
    </span>
    <span @click="changePassword" class="menu-item">
      <span class="menu-item-svg"> <v-icon name="user" /> </span>
      {{ $store.state.user.name + " [" + $store.state.user.sid + "]" }}
    </span>
  </div>
</template>

<script>
import ChangePassword from "@/components/ChangePassword";
export default {
  components: {
    ChangePassword
  },
  data: function() {
    return {
      form: {
        sid: this.$store.state.user.sid,
        password: "",
        newPassword: "",
        newPassword0: ""
      }
    };
  },
  methods: {
    logout: function() {
      this.$store.dispatch("deleteCookie").catch(e => {
        console.log(e);
      });
    },
    changePassword: function() {
      const h = this.$createElement;
      this.$msgbox({
        title: "更改密码",
        message: h("ChangePassword", { props: { inForm: this.form } }),
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        beforeClose: async (action, instance, done) => {
          if (action === "confirm") {
            if (
              this.form.password === "" ||
              this.form.newPassword === "" ||
              this.form.newPassword0 === ""
            ) {
              this.$message.error("不可留空");
              return;
            }
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "执行中...";
            try {
              await this.$store.dispatch("changePassword", this.form);
              this.$message({
                type: "success",
                message: "提交成功"
              });
            } catch (e) {
              // 提交失败
              this.$message.error("error: " + e);
            }
          }
          instance.confirmButtonLoading = false;
          done();
        }
      }).catch(err => {
        console.log(err);
        this.$message({
          type: "info",
          message: "取消输入"
        });
      });
    }
  }
};
</script>

<style scoped>
.menu {
  height: 29px;
  background-color: rgb(52, 152, 219);
  color: white;
}
.menu-item {
  display: inline-block;
  height: 29px;
  line-height: 29px;
  font-size: 17px;
  float: right;
  vertical-align: middle;
  margin-right: 7px;
  padding: 0px 7px 0 7px;
  cursor: pointer;
}
.menu-item:hover {
  background-color: aqua;
}
.menu-item-svg {
  margin-right: 7px;
}
</style>
