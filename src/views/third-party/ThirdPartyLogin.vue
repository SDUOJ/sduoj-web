<!--
   Copyright 2020-2022 the original author or authors.

   Licensed under the Affero General Public License, Version 3.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

        https://www.gnu.org/licenses/agpl-3.0.en.html
 -->

<template>
  <div v-if="valid" class="container clearfix">
    <div v-if="ready">
      <Bind ref="bind" />
    </div>
    <div v-else>
      <div class="waitTip">
        <div>Waiting for response</div>
        <span>{{ thirdParty.description }}</span>
      </div>
      <div class="loader">
        <div class="square"></div>
        <div class="square"></div>
        <div class="square last"></div>
        <div class="square clear"></div>
        <div class="square"></div>
        <div class="square last"></div>
        <div class="square clear"></div>
        <div class="square"></div>
        <div class="square last"></div>
      </div>
    </div>
  </div>
</template>

<script>
import './css/loader.css';
import { THIRD_PARTY_ENUM, THIRD_PARTY_CAS } from './js/ThirdPartyEnum';
import { mapActions } from 'vuex';
import Bind from './Bind';

export default {
  name: 'ThirdPartyLogin',
  components: { Bind },
  data: function() {
    return {
      thirdParty: {},
      valid: false,
      ready: false
    }
  },
  methods: {
    ...mapActions('user', ['setProfile'])
  },
  mounted: function() {
    this.valid = false;
    this.ready = false;
    for (const cas in THIRD_PARTY_ENUM) {
      if (THIRD_PARTY_ENUM[cas] === this.$route.query.thirdParty) {
        this.valid = true;
        this.thirdParty = THIRD_PARTY_CAS[THIRD_PARTY_ENUM[cas]];
      }
    }

    if (!this.valid) {
      this.$Message.error('Invalid Parameters');
      return;
    }

    this.thirdParty.certificate(this.$route.query).then(ret => {
      if (ret.user) {
        this.setProfile(ret.user);
        this.$router.replace({ name: 'home' });
      } else {
        this.ready = true;
        this.$nextTick(() => {
          this.$refs.bind.set(ret);
        })
      }
    }).catch(err => {
      this.$Message.error(err.message);
      this.$router.replace({ name: 'login' });
    });
  }
}
</script>

<style lang="less" scoped>
.waitTip {
  height: 220px;
  text-align: center;
  div {
    color: #515a6e;
    font-size: 40px;
  }
  span {
    color: #515a6e;
    font-size: 24px;
  }
}
</style>
