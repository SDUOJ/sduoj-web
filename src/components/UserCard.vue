<template>
  <div style="display: inline-block">
    <div class="media">
      <div class="media__left">
        <img :src="avatar" :width="size" :height="size" class="user-avatar">
      </div>
      <div class="media__body">
        <p>{{ username }}</p>
        <small v-if="nickname">{{ nickname }}</small>
      </div>
    </div>
  </div>
</template>

<script>
import { getGravatarUrl } from '_u/md5';

export default {
  name: 'UserCard',
  props: {
    email: {
      type: String,
      default: ''
    },
    username: {
      type: String,
      default: ''
    },
    nickname: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 32
    }
  },
  computed: {
    avatar: function () {
      return getGravatarUrl(this.email || '', this.size);
    }
  }
}
</script>

<style lang="less" scoped>
.media {
  display: table;
  width: 100%;
  .media__left {
    padding: 0 1em;
  }
}
.media__left img {
  display: block;
}

.media__body, .media__left, .media__right {
  display: table-cell;
  vertical-align: middle;
}

.media__body {
  width: 100%;
  p {
    font-size: 17px;
    color: #17233d;
  }
  small {
    color: rgba(128, 134, 149, .7);
    font-size: .9em;
  }
}

.user-avatar {
  border-radius: 50%;
}
</style>
