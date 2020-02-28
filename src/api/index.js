import Axios from 'axios'
import {stringify} from 'qs'
import config from "../config";
import {getLoginToken, removeLoginToken, setLoginToken} from "../utils/db";
import {navigateTo} from "../utils/navigate";
import {isString} from "../utils/helpers";
import {Toast} from "vant";

const http = Axios.create({
    baseURL: config.hostName,
    // timeout: 5000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    withCredentials: true,
    transformRequest: [function (data, headers) {
        headers.Authorization = 'Bearer ' + getLoginToken();
        return data instanceof FormData ? data : stringify(data);
    }],
    transformResponse: [function (data, headers) {
        if (isString(data)) {
            try {
                data = JSON.parse(data);
            } catch (e) {
                data = {};
            }
        }
        if (data.state === 251 && headers.authorization) {
            setLoginToken(headers.authorization);
        }

        if (data.state === 250 || data.state === 403) {
            removeLoginToken();
            // Toast('您的账号已在别处登录');
            navigateTo(config.loginRouteName);
        }
        // if (data.state !== 200 && data.message) {
        //     Message.error(data.message);
        // } else if (data.state === 200 && data.message) {
        //     Message.success(data.message);
        // }
        return data;
    }],
});
http.all = Axios.all;

const httpGet = async (url, params = {}) => {
    let res = await http.get(url, {
        params,
    }).catch(console.log)
    return res.data;

};
const httpPost = async (url, data = {}) => {
    let res = await http.post(url, data).catch(console.log)
    return res.data;
};


export {
    http,
    httpGet,
    httpPost,
};
