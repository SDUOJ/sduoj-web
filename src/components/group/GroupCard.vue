<!--
   Copyright 2020-2021 the original author or authors.

   Licensed under the General Public License, Version 3.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

        https://www.gnu.org/licenses/gpl-3.0.en.html
 -->

<template>
  <div :class="`media__${size}`">
    <div class="media__left">
      <img src="//cn.gravatar.com/avatar/?d=mm&s=200&r=g" :width="avatarSize" :height="avatarSize" :class="imgClasses"
           @click.prevent="clickTitle">
    </div>
    <div class="media__body">
      <h1>
        <span :class="titleClasses" @click="clickTitle">{{ group.title }}</span>
        <small v-if="size === 'default'"> (Group ID: {{ group.groupId }})</small>
      </h1>
      <Tooltip>
        <p class="before-by">
          <UserCard v-if="size === 'default'" class="relative" :email="group.owner.email" :username="group.owner.username" :size="25"/>
          <span v-else :class="`hover owner__${size}`">{{ group.owner.username }}</span>
        </p>
        <span slot="content">Created at {{ group.gmtCreate | timeformat('yyyy-MM-DD HH:mm:ss') }}</span>
      </Tooltip>
      <p :class="descClasses">{{ group.description }}</p>

      <div class="media__tool-bar">
        <template v-if="group.openness === GROUP_OPENNESS_TYPE.PRIVATE">
          <Button :size="size" shape="circle" type="info"
                  v-if="group.status === null || group.status === GROUP_STATUS_TYPE.NONE" disabled>
            <span :class="`btn-font__${size} private`">Private</span>
          </Button>
          <Button :size="size" shape="circle" type="warning" @click="handleExit" v-else>
            <span :class="`btn-font__${size} exit`">Exit</span>
          </Button>
        </template>
        <template v-else>
          <div class="btn__clickable--apply" @click="handleJoin" v-if="group.status === GROUP_STATUS_TYPE.APPLIED">
            <Row type="flex" align="middle">
              <Col span="14">
                <span :class="`btn-font__${size}`">Applied</span>
              </Col>
              <Col span="10" v-if="size==='default'">
                <Icon type="md-information" :size="iconSize"/>
              </Col>
            </Row>
          </div>
          <div class="btn__clickable--exit" @click="handleExit" v-else-if="group.status === GROUP_STATUS_TYPE.JOINED">
            <Row type="flex" align="middle">
              <Col span="14">
                <span :class="`btn-font__${size}`">Exit</span>
              </Col>
              <Col span="10" v-if="size==='default'">
                <Icon type="ios-arrow-forward" :size="iconSize"/>
              </Col>
            </Row>
          </div>
          <div class="btn__clickable--rejected" @click="handleJoin"
               v-else-if="group.status === GROUP_STATUS_TYPE.REJECTED">
            <Row type="flex" align="middle">
              <Col span="14">
                <span :class="`btn-font__${size}`">Rejected</span>
              </Col>
              <Col span="10" v-if="size==='default'">
                <Icon type="ios-close" :size="iconSize"/>
              </Col>
            </Row>
          </div>
          <div class="btn__clickable--join" @click="handleJoin" v-else>
            <Row type="flex" align="middle">
              <Col span="14">
                <span :class="`btn-font__${size}`">Join</span>
              </Col>
              <Col span="10" v-if="size==='default'">
                <Icon type="ios-add" :size="iconSize"/>
              </Col>
            </Row>
          </div>
        </template>
      </div>
    </div>
    <div v-if="size === 'small'" class="media__right">
      <div class="media__extra">
        <Icon type="md-people" color="#808695" />&nbsp;
        <span>{{ group.memberNum }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import UserCard from '_c/UserCard';

import { GROUP_OPENNESS_TYPE, GROUP_STATUS_TYPE } from '_u/constants';
import api from '_u/api';

export default {
  name: 'GroupCard',
  components: { UserCard },
  inject: ['reload'],
  props: {
    group: {
      type: Object,
      default: () => {
        return {
          owner: {}
        };
      }
    },
    size: {
      type: String,
      default: 'default'
    },
    onClick: Function
  },
  filters: {
    timeformat: (timestamp, format) => {
      if (typeof (timestamp) === 'string') {
        timestamp = parseInt(timestamp);
      }
      return moment(new Date(timestamp)).format(format);
    }
  },
  computed: {
    GROUP_STATUS_TYPE: () => GROUP_STATUS_TYPE,
    GROUP_OPENNESS_TYPE: () => GROUP_OPENNESS_TYPE,
    titleClasses: function () {
      if (this.$listeners['click-title']) {
        return 'title__clickable ellipsis';
      } else {
        return '';
      }
    },
    imgClasses: function () {
      if (this.$listeners['click-title']) {
        return 'title__clickable';
      } else {
        return '';
      }
    },
    descClasses: function () {
      if (this.$listeners['click-title']) {
        return 'ellipsis';
      } else {
        return 'no-ellipsis';
      }
    },
    avatarSize: function () {
      if (this.size === 'default') {
        return 120;
      } else if (this.size === 'small') {
        return 60;
      } else {
        return 200;
      }
    },
    iconSize: function () {
      if (this.size === 'default') {
        return 40;
      } else {
        return 25;
      }
    }
  },
  methods: {
    handleJoin: function () {
      this.$Modal.confirm({
        title: `Confirm join #${this.group.groupId} `,
        content: `Do you want to join group ${this.group.title} ?`,
        loading: true,
        onOk: () => {
          api.joinGroup({
            groupId: this.group.groupId
          }).then(ret => {
            this.$Message.success('Applied');
            this.$Modal.remove();
            this.reload();
          }).catch(err => {
            this.$Message.error(err.message);
            this.reload();
          });
        }
      });
    },
    handleExit: function () {
      this.$Modal.confirm({
        title: `Confirm exit #${this.group.groupId}`,
        content: `Do you want to exit group ${this.group.title} ?`,
        loading: true,
        onOk: () => {
          api.exitGroup({
            groupId: this.group.groupId
          }).then(ret => {
            this.$Message.success('Exited');
            this.$Modal.remove();
            this.reload();
          }).catch(err => {
            this.$Message.error(err.message);
            this.reload();
          });
        }
      });
    },
    clickTitle: function () {
      if (this.$listeners['click-title']) {
        this.$emit('click-title', this.group.groupId);
      }
    }
  }
}
</script>

<style lang="less" scoped>
.media__default {
  display: table;
  width: 100%;

  .media__left img {
    display: block;
  }

  .media__left {
    padding-right: 1.875rem;
  }

  .media__body, .media__left, .media__right {
    display: table-cell;
    vertical-align: top;
  }

  .media__body {
    width: 100%;

    h1 {
      line-height: 40px;
      color: #17233d;
    }

    p {
      line-height: 30px;
      color: #515a6e;
    }

    small {
      color: rgba(128, 134, 149, .7);
      font-size: .9em;
    }
  }

  .media__tool-bar {
    position: absolute;
    right: 1.25rem;
    top: 2.285rem;
    text-align: right;
  }

  .owner__default {
    color: #17233d;
    font-size: 17px;
    text-decoration: underline;
  }
}

.media__small {
  display: table;
  width: 100%;

  .media__left img {
    display: block;
  }

  .media__left {
    padding-right: 1.075rem;
  }

  .media__body, .media__left, media__right {
    display: table-cell;
    vertical-align: middle;
  }

  .media__body {
    width: 100%;

    h1 {
      line-height: 25px;
      font-size: .9em;
      color: #17233d;
    }

    p {
      line-height: 20px;
      color: #515a6e;
      font-size: .7em
    }

    small {
      color: rgba(128, 134, 149, .7);
      font-size: .85em;
    }
  }

  .media__right {
    span {
      color: #515a6e;
      font-size: .7em;
      //margin-left: 2px;
    }
    .media__extra {
      position: absolute;
      right: .75rem;
      top: 3.705rem;
    }
  }

  .media__tool-bar {
    position: absolute;
    right: .75rem;
    top: .705rem;
    text-align: right;
  }

  .owner__small {
    color: #17233d;
    font-size: .85em;
    text-decoration: underline;
  }
}

.before-by {
  &:before {
    content: 'Created by '
  }
  .relative {
    position: relative;
    top: .6rem;
  }
}

.title__clickable:hover {
  cursor: pointer;
  text-decoration: underline;
}

.ellipsis {
  width: 200px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.no-ellipsis {
  width: 50%;
}

.btn-font__default {
  font-size: 1.5rem;
  font-weight: bold;
}

.btn-font__small {
  font-size: .7rem;
  font-weight: bold;
}

.middle {
  vertical-align: middle;
}

.btn__clickable--join {
  color: #2db7f5;

  span:hover {
    cursor: pointer;
    text-decoration: underline #2db7f5;
  }
}

.btn__clickable--apply {
  color: #19be6b;

  span:hover {
    cursor: pointer;
    text-decoration: underline #19be6b;
  }
}

.btn__clickable--exit {
  color: #ff9900;

  span:hover {
    cursor: pointer;
    text-decoration: underline #ff9900;
  }
}

.btn__clickable--rejected {
  color: #ed4014;

  span:hover {
    cursor: pointer;
    text-decoration: underline #ed4014;
  }
}
</style>
