/*
 * Copyright 2020-2020 the original author or authors.
 *
 * Licensed under the General Public License, Version 3.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.gnu.org/licenses/gpl-3.0.en.html
 */

let websocket = null;
let successCallback = null;
let errorCallback = null;
let wsUrl = '';

function getWsURL() {
  if (process.env.NODE_ENV === 'production') {
    return `ws://${location.host}/ws`;
  }
  if (process.env.VUE_APP_OJ_WS) {
    return process.env.VUE_APP_OJ_WS;
  }
  const OJ_SERVER = new URL(process.env.VUE_APP_OJ_SERVER);
  if (OJ_SERVER.protocol === 'https:') {
    return `ws://${OJ_SERVER.host}/ws`;
  } else {
    return `ws://${OJ_SERVER.host}/ws`;
  }
}

function websocketMessage(ret) {
  successCallback(JSON.parse(ret.data));
}

function websocketOpen() {}

function websocketClose(e) {
  if (e && e.code !== 1000) {
    errorCallback();
  }
}

function websocketInit() {
  if (typeof (WebSocket) === 'undefined') {
    return false;
  }
  websocket = new WebSocket(wsUrl);
  websocket.onmessage = websocketMessage;
  websocket.onopen = websocketOpen;
  websocket.onerror = errorCallback;
  websocket.onclose = websocketClose;
}

export function sendWebsocket(url, params, success, error) {
  wsUrl = getWsURL() + url;
  if (params) {
    const arr = [];
    for (const key in params) {
      arr.push(`${key}=${params[key]}`);
    }
    wsUrl += '?' + arr.join('&');
  }
  successCallback = success;
  errorCallback = error;
  websocketInit();
}

export function closeWebsocket() {
  if (websocket) {
    websocket.close();
    websocket.onclose();
  }
}
