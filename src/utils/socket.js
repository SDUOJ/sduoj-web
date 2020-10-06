let websocket = null;
let successCallback = null;
let errorCallback = null;
const baseUrl = 'ws://api.oj.sdu.edu.cn:8080';
let wsUrl = '';

function websocketMessage(ret) {
  console.log('origin, ', ret);
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
  wsUrl = baseUrl + url;
  if (params) {
    wsUrl += '?';
    for (const key in params) {
      wsUrl += key.toString() + '=' + params[key].toString() + '&';
    }
    wsUrl = wsUrl.slice(0, -1);
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
