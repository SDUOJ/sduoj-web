<template>
  <div class="container">
    <template v-if="openness === 'private' && !contest.participants.includes(username)">
          <Input type="password" v-model="participateForm.password" placeholder="Password">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
          <Button @click="handleParticipate">Participate In</Button>
    </template>
    <template v-else-if="start">
      123123123
    </template>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import api from '_u/api';

export default {
  name: 'ContestOverviewView.vue',
  data: function() {
    return {
      participateForm: {
        password: '',
        contestId: ''
      },
      start: false
    }
  },
  methods: {
    handleParticipate: function() {
      this.participateForm.contestId = this.contest.contestId;
      if (this.openness !== 'protected' && !this.contest.participants.includes(this.username)) {
        api.participateIn(this.participateForm)
          .then(() => {
            this.$router.push(0)
          });
      }
    }
  },
  computed: {
    ...mapGetters('user', ['username']),
    ...mapGetters('contest', ['startTime', 'endTime', 'openness']),
    ...mapState('contest', ['contest', 'questions'])
  },
  mounted: function () {
    if (this.openness === 'public') {
      this.handleParticipate();
    }
    const currentTime = new Date();
    if (this.startTime <= currentTime) {
      // start
      this.start = true;
    }
  }
}
</script>

<style lang="less" scoped>
</style>
