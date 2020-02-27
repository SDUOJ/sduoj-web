import axios from "axios";
// const DEV_URL = "http://room-test.vkzot.com:5001";
// const MOCK_URL =

const url =
  "https://mockapi.eolinker.com/ubZtMVv79b19290b98f726da0d0bcd06d77089f92f40270";

axios.defaults.withCredentials = true; // 开启 cookie
export function post(backUrl, data) {
  return new Promise((resolve, reject) => {
    axios
      .post(url + backUrl, data)
      .then(res => {
        if (res.data.code !== 0) {
          console.log(res.data);
          reject(res.data.message);
        }
        resolve(res.data);
      })
      .catch(err => {
        console.log(err);
        reject("网络错误");
      });
  });
}
export function get(backUrl, data) {
  // console.log(data)
  return new Promise((resolve, reject) => {
    axios
      .get(url + backUrl, {
        params: { ...data }
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(reject);
  });
}
