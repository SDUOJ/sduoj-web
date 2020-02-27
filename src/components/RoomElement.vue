<template>
  <el-col :span="6">
    <div class="grid-content">
      <el-card>
        <v-icon
          :name="canTime[0] || canTime[1] || canTime[2] ? 'laugh' : 'flushed'"
        />
        <div class="time">
          <span
            class="time-element"
            :class="{ 'time-element-can': canTime[0] }"
            @click="clickForm(0)"
            >上午</span
          >
          <span
            class="time-element"
            :class="{ 'time-element-can': canTime[1] }"
            @click="clickForm(1)"
            >下午</span
          >
          <span
            class="time-element"
            :class="{ 'time-element-can': canTime[2] }"
            @click="clickForm(2)"
            >晚上</span
          >
        </div>
        <br />
        <span class="title">{{ this.roomName }}</span>
      </el-card>
    </div>
  </el-col>
</template>

<script>
import ApplyForm from "@/components/ApplyForm";

export default {
  props: ["date", "roomId", "roomName", "canTime"],
  data: function() {
    return {
      form: {
        title: "",
        options: [],
        introduction: ""
      }
    };
  },
  components: {
    ApplyForm
  },
  methods: {
    clickForm: function(time) {
      // console.log(this.date, this.form.title);
      if (this.canTime[time] === 0) return;
      const h = this.$createElement;
      this.$msgbox({
        title: "预约",
        message: h("ApplyForm", { props: { inForm: this.form } }),
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        beforeClose: async (action, instance, done) => {
          if (action === "confirm") {
            if (this.form.title === "" || this.form.introduction === "") {
              this.$message.error("不可留空");
              return;
            }
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "执行中...";
            try {
              await this.$store.dispatch("newApply", {
                date: this.date,
                time: time,
                sid: this.$store.state.user.sid,
                roomId: this.roomId,
                title: this.form.title,
                otherData: JSON.stringify(this.form.options),
                introduce: this.form.introduction
              });
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
      });
    }
  }
};
</script>

<style scoped>
.grid-content {
  text-align: center;
  width: 100%;
  padding: 7px;
  /* margin-bottom: 20px; */
}

.title {
  font-size: 17px;

  margin-top: 3px;
}

.time {
  margin-top: 4px;
  cursor: default;
}

.time-element-can {
  background-color: green !important;
  cursor: pointer;
}

.time-element-can:hover {
  background-color: aqua;
}

.time-element {
  margin: 1px;
  padding: 5px;
  border-radius: 3px;
  background-color: red;
  font-size: 13px;
  color: white;
}
</style>
<style>
.main .fa-icon {
  width: 50%;
  max-width: 40px;
  height: auto;
}
</style>
