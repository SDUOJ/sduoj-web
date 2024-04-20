<!--
   Copyright 2020-2022 the original author or authors.

   Licensed under the Affero General Public License, Version 3.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

        https://www.gnu.org/licenses/agpl-3.0.en.html
 -->

<template>
  <div>
    <div>
      <span class="subtitle">Newline</span>
      <div class="float-right">
        <Dropdown transfer @on-click="onChangeConvertMode">
          <a href="javascript:void(0)">
            {{ NEWLINE_CONVERT[convertMode].description }}
            <Icon type="ios-arrow-down"></Icon>
          </a>
          <DropdownMenu slot="list">
            <DropdownItem
              v-for="convert in NEWLINE_CONVERT" :key="convert.name"
              :name="convert.name">{{ convert.description }}</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
    <Form :model="checkpoint">
      <FormItem label="Standard Input">
        <Input type="textarea" autocomplete="off" v-model="checkpoint.input" :rows="10"/>
      </FormItem>
      <FormItem label="Standard Output">
        <Input type="textarea" autocomplete="off" v-model="checkpoint.output" :rows="10"/>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import api from '_u/api';
import { NEWLINE_CONVERT_INDEX, NEWLINE_CONVERT } from '_u/constants';

export default {
  name: 'CheckpointPreview',
  data: function () {
    return {
      onUploading: false,
      checkpoint: {},
      oldCheckpoint: {},
      convertMode: NEWLINE_CONVERT_INDEX.DOS2UNIX
    }
  },
  computed: {
    NEWLINE_CONVERT: () => NEWLINE_CONVERT
  },
  methods: {
    onChangeConvertMode: function(name) {
      this.convertMode = name;
    },
    reset: function() {
      this.convertMode = NEWLINE_CONVERT_INDEX.DOS2UNIX;
    },
    set: function(checkpoint) {
      this.checkpoint = checkpoint;
      this.oldCheckpoint = { ...checkpoint };
    },
    save: function(onSuccess, onFinally) {
      if (this.checkpoint.input === this.oldCheckpoint.input && this.checkpoint.output === this.oldCheckpoint.output) {
        onFinally();
        return;
      }
      this.onUploading = true;
      api.uploadSingleCheckpoint({
        input: this.checkpoint.input,
        output: this.checkpoint.output,
        mode: this.convertMode
      }).then(ret => {
        onSuccess(this.checkpoint.checkpointId, ret);
        this.$Message.success('Success');
      }).catch(err => {
        this.$Message.error(err);
      }).finally(() => {
        this.onUploading = false;
        onFinally();
      });
    }
  }
}
</script>

<style scoped>
.subtitle {
  font-size: 15px;
  font-weight: bold;
}
</style>
