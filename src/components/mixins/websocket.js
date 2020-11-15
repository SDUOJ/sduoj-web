/*
 * Copyright 2020-2020 the original author or authors.
 *
 * Licensed under the General Public License, Version 3.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.gnu.org/licenses/gpl-3.0.en.html
 */

function getWsURL() {
  if (process.env.NODE_ENV === 'production') {
    return `ws://${location.host}/ws`;
  }
  if (process.env.VUE_APP_OJ_WS) {
    return `${process.env.VUE_APP_OJ_WS}/ws`;
  }
  const OJ_SERVER = new URL(process.env.VUE_APP_OJ_SERVER);
  if (OJ_SERVER.protocol === 'https:') {
    return `ws://${OJ_SERVER.host}/ws`;
  } else {
    return `ws://${OJ_SERVER.host}/ws`;
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
      this.websock.onopen = () => {
        this.websock.send(JSON.stringify(params));
      };
      this.websock.onmessage = ret => {
        onmessage(JSON.parse(ret.data));
      };
      this.websock.onerror = onerror;
      this.websock.onclose = onclose;
    }
  },
  destroyed: function() {
    if (this.websock) {
      this.websock.close();
    }
  }
}
