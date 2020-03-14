import axios from "axios";
import { Message } from "element-ui";
const url = "https://mockapi.eolinker.com/ubZtMVv79b19290b98f726da0d0bcd06d77089f92f40270/api";
// const url = "http://182.92.75.217:8080/api";

axios.defaults.withCredentials = true; // 开启 cookie

function alert_message(message) {
    Message({
        message: message,
        type: "error",
        duration: "1900"
    });
}
export function post(backUrl, data) {
    return new Promise((resolve, reject) => {
        axios
            .post(url + backUrl, data)
            .then(res => {
                // 如何返回值不是 0 的话，那么返回错误信息
                console.log(res.data);
                
                if (res.data.code !== 0) {
                    if (typeof res.data.message == "undefined") {
                        alert_message(res.data);
                        reject(res.data);
                    } else {
                        alert_message(res.data.message);
                        reject(res.data.message);
                    }
                } else {
                    resolve(res.data.data);
                }
            })
            .catch(err => {
                reject(err);
            });
    });
}
// export function get(backUrl, data) {
//     // console.log(data)
//     return new Promise((resolve, reject) => {
//         axios
//             .get(url + backUrl, {
//                 params: { ...data }
//             })
//             .then(res => {
//                 resolve(res.data);
//             })
//             .catch(reject);
//     });
// }
