import moment from "moment";
import {getLoginToken} from "./db";
import config from "../config";
import {Toast} from "vant";

/**
 * 转大写中文（转换一次）
 * 原文链接：https://segmentfault.com/a/1190000008962568
 */
export function numberConvertToUppercase(str) {
    if (str.indexOf('10') > -1) {
        return str.replace('10', '十');
    }
    let _str = '';
    let upperCaseNumber = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
    str = str.split('');
    for (let i in str) {
        let item = str[i];
        let num = Number(item);
        if (isNaN(num)) {
            _str += `${item}`;
            continue;
        }
        _str += `${upperCaseNumber[num]}`;
    }
    return _str;
}

export function goWxLogin(redirectUrl) {
    const auth_url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${config.wxAppId}&redirect_uri=${redirectUrl}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
    window.location.replace(auth_url);
}

export function randomString(len) {
    len = len || 32;
    let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    let maxPos = $chars.length;
    let pwd = '';
    for (i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

export function genUserChatHistroyMessage(rmsg) {
    if (rmsg.user && (rmsg.code == 266 || rmsg.code == 200 || rmsg.code == 288)) {
        let msg = {
            createdAt: rmsg.createdAt,
            system: false,
            user: {
                _id: rmsg.user._id,
                name: rmsg.user.name,
                avatar: rmsg.user.avatar,
            },
        };
        const apiUrl = config.hostName;
        if (rmsg.code == 288) {
            msg.image = apiUrl + rmsg.message;
        } else {
            msg.text = rmsg.message;
        }
        if (msg.text && msg.text.endsWith('加入房间')) {
            msg.system = true;
        }
        let isZhongJiang = false;
        if (isArray(rmsg.data) && rmsg.data.length) {
            let r = {
                _type: undefined,
                _money: 0,
                _all_result: 0,
                _data: {},
            };
            rmsg.data.forEach((item) => {
                let isFeng = typeof item.all_result === 'undefined';
                if (r._data[item.user_id]) {
                    r._data[item.user_id].data.push(item);
                    r._data[item.user_id].money = bcAdd(r._data[item.user_id].money, item.money);
                    r._data[item.user_id]._all_result = bcAdd(r._data[item.user_id]._all_result, item.all_result || 0);
                    r._money = bcAdd(r._money, item.money);
                    r._all_result = bcAdd(r._all_result, item.all_result || 0);
                } else {
                    r._data[item.user_id] = {
                        user_id: item.user_id,
                        cnname: item.cnname,
                        money: item.money,
                        _all_result: item.all_result || 0,
                        data: [item],
                    };
                    r._money = bcAdd(r._money, item.money);
                    r._all_result = bcAdd(r._all_result, item.all_result || 0);
                    r._type = isFeng ? 'feng' : 'kai';
                }

            });
            if (r._type === 'feng') {
                msg.text += `\r\n`;
                msg.text += `注单核对，总计：${formatMoney(r._money, 2)} `;
                msg.text += `\r\n\r\n`;
                let _dataArray = Object.values(r._data);
                let _maxLength = _dataArray.length - 1;
                _dataArray.forEach((v, index) => {
                    msg.text += `[${v.cnname || v.user_id}]，合计：${formatMoney(v.money, 2)} `;
                    let _text = {};
                    v.data.forEach(i => {
                        if (_text[i.page_name]) {
                            _text[i.page_name].push(`${i.page_name2}/${i.money}`);
                        } else {
                            _text[i.page_name] = [`${i.page_name2}/${i.money}`];
                        }

                    });
                    for (let key in _text) {
                        let value = _text[key];
                        if (Array.isArray(value) && value.length) {
                            msg.text += `\r\n`;
                            msg.text += `${key}[${value.join(' ')}]`;
                        }

                    }

                    if (index < _maxLength) {
                        msg.text += `\r\n\r\n`;
                    }
                });

            } else {
                isZhongJiang = true;
                msg.text += `\r\n`;
                msg.text += `中奖用户，总计：${formatMoney(r._all_result, 2)} `;
                msg.text += `\r\n`;
                let _dataArray = Object.values(r._data);
                let _maxLength = _dataArray.length - 1;
                _dataArray.forEach((v, index) => {
                    msg.text += `[${v.cnname || v.user_id}]，合计：${formatMoney(v._all_result, 2)} `;
                    let _text = {};
                    v.data.forEach(i => {
                        if (_text[i.page_name]) {
                            _text[i.page_name].push(`${i.page_name2}/${i.money}/${formatMoney(i.all_result, 2)}`);
                        } else {
                            _text[i.page_name] = [`${i.page_name2}/${i.money}/${formatMoney(i.all_result, 2)}`];
                        }

                    });
                    for (let key in _text) {
                        let value = _text[key];
                        if (Array.isArray(value) && value.length) {
                            msg.text += `\r\n`;
                            msg.text += `${key}[${value.join(' ')}]`;
                        }

                    }
                    if (index < _maxLength) {
                        msg.text += `\r\n\r\n`;
                    }
                });

            }

        }
        if (isZhongJiang) {
            this.dispatch('getTodayResult');
            this.dispatch('getUserInfo');
        }
        return msg;
    } else {
        if (!isEmpty(rmsg.message)) {
            switch (rmsg.code) {
                case 301:
                    Toast(rmsg.message);
                    break;

            }
        }

    }

}

export function webSocketApi() {
    return `${config.wsSocketHostName}?token=` + getLoginToken();
}

export function defaultValue(value, defaultValue) {
    if (isUndefined(value) || isNull(value)) {
        return defaultValue
    }
    return value;
}

export function isNull(value) {
    return toString.call(value, String) === "[object Null]";
}

export function isEmpty(value) {
    if (isUndefined(value) || isNull(value)) {
        return true;
    }
    if ((isString(value) || isArray(value)) && value.length === 0) {

        return true;
    }
    if (isObject(value) && Object.values(value).length === 0) {
        return true;
    }
    return false;
}

export function isObject(value) {
    return toString.call(value, String) === "[object Object]";
}


export function isArray(value) {
    return toString.call(value, String) === "[object Array]";
}


export function isString(value) {
    return typeof value === 'string';
}

export function isUndefined(value) {
    return typeof value === 'undefined';
}

export function isTrue(value) {
    if (isBoolean(value)) {
        return value;
    } else if (isNumeric(value)) {
        return value != 0;
    } else if (isString(value)) {
        return value === 'true';
    }
    return false;
}

export function isBoolean(value) {
    return typeof value === 'boolean';
}

export function isFunction(value) {
    return typeof value === 'function';
}

export function isNumber(value) {
    return !isNaN(value) && typeof value === 'number';
}

export function isNumeric(value) {
    return isNumber(Number(value));
}

export function isInteger(value, isStrict = true) {
    if (isStrict) {
        return Number.isInteger(value);
    }
    return Number.isInteger(Number(value));
}

/**
 * 加法
 * @param arg1
 * @param arg2
 * @returns {number}
 */
export function bcAdd(arg1, arg2) {
    let r1, r2, m;
    try {
        r1 = arg1.toString().split('.')[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split('.')[1].length;
    } catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    return (arg1 * m + arg2 * m) / m;
}

/**
 * 乘法
 * @param arg1
 * @param arg2
 * @returns {number}
 */
export function bcMul(arg1, arg2) {
    let m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try {
        m += s1.split(".")[1].length
    } catch (e) {
    }
    try {
        m += s2.split(".")[1].length
    } catch (e) {
    }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}

/**
 * 除法
 * @param arg1
 * @param arg2
 * @returns {number}
 */
export function bcDiv(arg1, arg2) {
    let t1 = 0, t2 = 0, r1, r2;
    try {
        t1 = arg1.toString().split(".")[1].length;
    } catch (e) {
    }
    try {
        t2 = arg2.toString().split(".")[1].length;
    } catch (e) {
    }
    r1 = Number(arg1.toString().replace(".", ""));
    r2 = Number(arg2.toString().replace(".", ""));
    return (r1 / r2) * Math.pow(10, t2 - t1);
}

export function bcSub(arg1, arg2) {
    let r1, r2, max, min;
    try {
        r1 = arg1.toString().split(".")[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split(".")[1].length
    } catch (e) {
        r2 = 0
    }
    max = Math.pow(10, Math.max(r1, r2));
    //动态控制精度长度
    min = (r1 >= r2) ? r1 : r2;
    return ((arg1 * max - arg2 * max) / max).toFixed(min)
}

export const bcComp = (a, b) => {
    a = Number(a);
    b = Number(b);
    if (isNaN(a)) {
        a = 0;
    }
    if (isNaN(b)) {
        b = 0;
    }
    if (a === b) {
        return 0;
    }
    return a > b ? 1 : -1;
};

export function formatMoney(val, v2 = 2) {
    val = Number(val);
    if (isNaN(val)) {
        return 0;
    }
    return Number(val.toFixed(v2));
}


export const lhColor = (lh) => {
    if (lh > 0) {
        return 'red';
    } else if (lh < 0) {
        return '#0089FF';
    }
    return '#333';
};
export const lhText = (lh) => {
    if (lh > 0) {
        return '龍';
    } else if (lh < 0) {
        return '虎';
    }
    return '和';
};

export function dateFormat(time, format = 'Y-m-d H:i:s') {
    format = format.replace('Y', 'YYYY').replace('y', 'YYYY')
        .replace('m', 'MM').replace('d', 'DD')
        .replace('H', 'HH').replace('i', 'mm')
        .replace('s', 'ss');
    time = time || new Date();
    return moment(time).format(format);

}

export function paginationSplice(lists, per_page = 20, current_page = 1) {
    lists = [...lists || []];
    let res = {
        data: [],
        per_page,
        total: 0,
        current_page,
        last_page: 0,
    };
    res.total = lists.length;
    while (lists.length) {
        res.last_page++;
        res.data.push(lists.splice(0, per_page));
    }
    return res;
};


