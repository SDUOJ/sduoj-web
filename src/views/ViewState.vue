// 状态页
<template>
  <div class="state">
    <div class="option">
      <div class="group">
        <span class="group-span">日期：</span>
        <el-date-picker
          v-model="date"
          type="date"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="timestamp"
        ></el-date-picker>
      </div>
      <div class="group">
        <span class="group-span">楼层：</span>
        <el-radio-group v-model="floor">
          <el-radio-button :label="0">ALL</el-radio-button>
          <el-radio-button :label="1">一楼</el-radio-button>
          <el-radio-button :label="2">二楼</el-radio-button>
          <el-radio-button :label="3">三楼</el-radio-button>
        </el-radio-group>
      </div>
      <div class="group">
        <span class="group-span">时间：</span>
        <el-radio-group v-model="time">
          <el-radio-button :label="-1">ALL</el-radio-button>
          <el-radio-button :label="0">上午</el-radio-button>
          <el-radio-button :label="1">下午</el-radio-button>
          <el-radio-button :label="2">晚上</el-radio-button>
        </el-radio-group>
      </div>
      <div class="group">
        <span class="group-span">类型：</span>
        <el-radio-group v-model="type">
          <el-radio-button :label="0">ALL</el-radio-button>
          <el-radio-button :label="1">普通教室</el-radio-button>
          <el-radio-button :label="2">会议室</el-radio-button>
          <el-radio-button :label="3">阶梯教室</el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <el-row class="main">
      <room-element
        v-for="item in $store.state.app.rooms"
        :date="date / 1000"
        :roomId="item.roomId"
        :roomName="item.roomName"
        :key="item.roomId"
        :canTime="getCanTime(item.unusable)"
        v-show="theCheck(item.floor, item.type, item.unusable)"
      />
    </el-row>
  </div>
</template>
<script>
import RoomElement from "@/components/RoomElement.vue";
export default {
  data: function() {
    return {
      date: new Date(new Date().setHours(0, 0, 0, 0)).getTime(),
      floor: 0,
      time: -1,
      type: 0
    };
  },
  components: {
    RoomElement
  },
  methods: {
    // options 切换时筛选
    theCheck: function(itFloor, itType, itUnusable) {
      if (!(this.floor === 0 || this.floor === itFloor)) return false;
      if (!(this.type === 0 || this.type === itType)) return false;
      for (var item of itUnusable) {
        if (item.date === this.date / 1000 && item.time === this.time)
          return false;
      }

      return true;
    },
    getCanTime: function(timeList) {
      var b = [true, true, true];
      for (let item of timeList) {
        if (item.date === this.date / 1000) {
          b[item.time] = false;
        }
      }
      return b;
    }
  }
};
</script>

<style scoped>
.main {
  margin-top: 20px;
  text-align: center;
}
.group-span {
  height: 37px;
  line-height: 37px;
  vertical-align: middle;
  font-size: 20px;
}
.group {
  margin-bottom: 10px;
}
</style>
<style>
.el-radio-button__inner {
  padding: 11px 17px 11px 17px;
}
</style>
