<!--
   Copyright 2020-2021 the original author or authors.

   Licensed under the General Public License, Version 3.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

        https://www.gnu.org/licenses/gpl-3.0.en.html
 -->

<template>
  <div class="spin-container center" v-if="spinShow">
    <Spin size="large" fix />
  </div>
  <div v-else>
    <List size="large" item-layout="vertical">
      <ListItem v-for="contest in contestList" :key="contest.contestId">
        <div slot="extra" style="margin-right: 10px">
          <div v-if="participatedContest.includes(contest.contestId)" style="color: #5cb85c">
            <Icon type="md-checkmark"/>
            <strong>&nbsp;Participated</strong>
          </div>
        </div>
        <ListItemMeta>
          <div slot="avatar" class="contest__date numbox">
            <div class="numbox__num__large">{{ contest.gmtStart | timeformat('DD') }}</div>
            <div class="numbox__text">{{ contest.gmtStart | timeformat('yyyy-MM') }}</div>
          </div>
          <div slot="title">
            <router-link
              :to="{
                name: 'contest-detail',
                params: { contestId: contest.contestId }
              }"
              v-slot="{ href, navigate }"
              custom
            >
              <a :href="href" @click="navigate" class="contest__title">{{ contest.contestTitle }}</a>
            </router-link>
            <template v-if="contest.features.openness === CONTEST_OPENNESS.PRIVATE">
              <Icon type="ios-unlock" color="#d9534f" size="19" v-if="participatedContest.includes(contest.contestId)"/>
              <Icon type="md-lock" color="#d9534f" size="19" v-else/>
            </template>
            <template v-else-if="contest.features.openness === CONTEST_OPENNESS.PROTECTED">
              <Icon type="ios-unlock" color="orange" size="19" v-if="participatedContest.includes(contest.contestId)"/>
              <Icon type="md-lock" color="orange" size="19" v-else/>
            </template>
          </div>
          <ul slot="description" class="ivu-list-item-action">
            <li>
              <div :class="`contest-type--${contest.features.mode}`">
                <Icon type="md-bulb" color="#fff"/>&nbsp;
                <span>{{ contest.features.mode.toUpperCase() }}</span>
              </div>
            </li>
            <li>
              {{ contest.gmtStart | timeformat('HH:mm:ss') }}
            </li>
            <li>
              <Icon type="ios-time-outline"/>
              {{ (contest.gmtEnd - contest.gmtStart) | time2hour }}
            </li>
            <li>
              <Icon type="ios-people-outline"/>
              {{ contest.participantNum }}
            </li>
            <li>
              <Tag v-if="$store.state.now > contest.gmtEnd" color="green">Finished</Tag>
              <Tag v-else-if="contest.gmtStart < $store.state.now && $store.state.now < contest.gmtEnd" color="gold">Running</Tag>
              <Tag v-if="contest.isPublic === 0" color="red">Private</Tag>
            </li>
          </ul>
        </ListItemMeta>
      </ListItem>
    </List>
  </div>
</template>

<script>
import moment from 'moment';
import { CONTEST_OPENNESS, CONTEST_MODE, CONTEST_STATUS } from '_u/constants';
import { s2hs } from '_u/transform';
import api from '_u/api';

export default {
  name: 'ContestList',
  data: function () {
    return {
      contestList: [],
      participatedContest: [],
      spinShow: false
    }
  },
  filters: {
    timeformat: (timestamp, format) => {
      if (typeof (timestamp) === 'string') {
        timestamp = parseInt(timestamp);
      }
      return moment(new Date(timestamp)).format(format);
    },
    time2hour: timediff => s2hs(timediff),
    contestStatus: contest => {
      const now = this.$store.store.now;
      if (contest.contestStartTime > now) {
        return CONTEST_STATUS.UPCOMING;
      } else if (contest.contestEndTime < now) {
        return CONTEST_STATUS.FINISHED;
      } else {
        return CONTEST_STATUS.RUNNING;
      }
    }
  },
  methods: {
    toContestDetail: function (contestId) {
      this.$router.push({
        name: 'contest-detail',
        params: { contestId }
      });
    },
    getContestList: function (params) {
      return new Promise((resolve, reject) => {
        this.spinShow = true;
        api.getContestList(params)
          .then(ret => {
            this.contestList = ret.rows;
            resolve(ret);

            if (process.env.VUE_APP_OJ_ONLY_CONTEST === 'TRUE') {
              this.contestList = this.contestList.filter(item => parseInt(item.contestId) === 81)
            }
          })
          .catch(reject)
          .finally(() => {
            this.spinShow = false;
          });
      });
    },
    getParticipatedContests: function () {
      return new Promise((resolve, reject) => {
        api.getParticipatedContests()
          .then(ret => {
            this.participatedContest = ret;
            resolve(ret);
          })
          .catch(reject);
      });
    }
  },
  computed: {
    CONTEST_OPENNESS: () => CONTEST_OPENNESS,
    CONTEST_MODE: () => CONTEST_MODE,
    CONTEST_STATUS: () => CONTEST_STATUS
  }
}
</script>

<style lang="less" scoped>
// Number Box Object
.numbox {
  font-size: 16px;
  text-align: center;
}

.numbox__num__large {
  font-size: 1.7rem;
}

.numbox__text {
  font-size: 14px;
  color: #AAA;
}

/deep/ .ivu-list-item {
  padding: 10px 0;
}

/deep/ .ivu-list-vertical {
  .ivu-list-item-meta {
    margin-bottom: 0;
  }

  .ivu-list-item-action {
    margin-top: 6px;
  }

  .ivu-list-item-meta-title {
    margin-bottom: 4px;
    margin-top: 4px;
  }
}

/deep/ .ivu-list-item-meta-avatar {
  margin-top: -2px;
}
.contest__title {
  color: rgba(0, 0, 0, 0.85);
  &:hover {
    text-decoration: underline;
  }
}

.contest__date {
  margin: 0 10px 0 15px;
  white-space: nowrap;
}
</style>
