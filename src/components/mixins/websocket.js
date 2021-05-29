/*
 * Copyright 2020-2021 the original author or authors.
 *
 * Licensed under the General Public License, Version 3.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.gnu.org/licenses/gpl-3.0.en.html
 */

import { SDUOJ_ENV } from '_u/env';

function getWsURL() {
  if (process.env.VUE_APP_OJ_WS) {
    return `${process.env.VUE_APP_OJ_WS}/ws`;
  }
  if (SDUOJ_ENV.PROD) { // 生产环境
    // https 对应 wss，http 对应 ws
    const WS_PROTOCOL = location.protocol === 'https:' ? 'wss:' : 'ws:';
    return `${WS_PROTOCOL}//${location.host}/ws`;
  } else {
    const OJ_SERVER = new URL(process.env.VUE_APP_OJ_SERVER);
    const WS_PROTOCOL = OJ_SERVER.protocol === 'https:' ? 'wss:' : 'ws:';
    return `${WS_PROTOCOL}//${OJ_SERVER.host}/ws`;
  }
}

export default {
  data: function () {
    return {
      websock: null
    }
  },
  methods: {
    initWebSocket: function(url, params, onmessage, onerror, onclose) {
      this.websock = new WebSocket(getWsURL() + url);

      // proxy function that wait readyState === 1
      const waitForConnection = (callback, interval) => {
        if (this.websock.readyState === 1) {
          callback();
        } else {
          setTimeout(() => {
            waitForConnection(callback, interval);
          }, interval);
        }
      }
      this.websock.onopen = () => {
        waitForConnection(() => {
          this.websock.send(JSON.stringify(params));
        }, 500);
      };

      this.websock.onmessage = ret => {
        onmessage(JSON.parse(ret.data));
      };

      this.websock.onerror = onerror;
      this.websock.onclose = onclose;
    },
    closeWebSocket: function() {
      if (this.websock) {
        this.websock.close();
      }
    }
  },
  watch: {
    $route: function() {
      this.closeWebSocket();
    }
  },
  destroyed: function() {
    this.closeWebSocket();
  },
  beforeRouteUpdate: function() {
    this.closeWebSocket();
  }
}
