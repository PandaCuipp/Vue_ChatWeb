import {httpGet, httpPost} from "../index";
import {setLoginToken} from "../../utils/db";
import {Toast} from "vant";
import config from "../../config";
import {navigateTo} from "../../utils/navigate";


/**
 * 提前返点
 * @param params{type 0.获取返点信息 1.提前返点}
 * @returns {Promise<*>}
 */
export async function getTuiShui(params = {}) {
    return httpGet('pan/get_tuishui', params);

}

/**
 * 接口投注
 * @param params {game_id,money,data}
 * @returns {Promise<*>}
 */
export async function userXiaZhu(params = {}) {
    return httpPost('pan/xiazhu', params);
}

/**
 * 用户注册
 * @param params
 * @returns {Promise<*>}
 */
export async function userRegister(params = {}) {
    let res = await httpPost('user/register', params);
    if (res.message) {
        Toast(res.message)
    }
    return res.state === 200;
}

/**
 * 用户登录
 * @param params
 * @returns {Promise<*>}
 */
export async function login(params = {}) {
    let res = await httpPost('auth/login', params);
    if (res.state === 200) {
        setLoginToken(res.data.token);
    }
    return res;
}

/**
 * 用户微信登录
 * @param params
 * @returns {Promise<*>}
 */
export async function userWxLogin(params = {}) {
    let res = await httpGet('auth/webLogin', params);
    if (res.message) {
        if (res.message.indexOf('missing')) {
            // 待处理（提交两次?）
        } else {
            Toast(res.message)
        }
    }
    if (res.state === 200) {
        setLoginToken(res.data.token);
        return true;
    }
    return false;
}

export async function logout(params = {}) {
    let res = await httpGet('auth/logout', params);
    if (res.state !== 403 && res.state !== 250) Toast(res.message);
    if (res.state === 200) {
        navigateTo(config.loginRouteName);
        return true;
    }
    return false;
}

/**
 * 获取用户信息
 * @param params
 * @returns {Promise<*>}
 */
export async function userInfo(params = {}) {
    return httpGet('user/info', params);

}

/**
 * 获取代理QQ、微信号
 * @param params {1:qq,2:weixin}
 * @returns {Promise<*>}
 */
export async function agentChat(params = {}) {
    return httpGet('user/agent_chat_list', params);

}

/**
 * 获取今日盈亏
 * @param params
 * @returns {Promise<*>}
 */
export async function todayResult(params = {}) {
    return httpGet('pan/today_result', params);

}

/**
 * 用户头像、昵称
 * @param params
 * @returns {Promise<*>}
 */
export async function userInfoEdit(params = {}) {
    return httpGet('user/user_edit', params);

}


/**
 * 用户密码修改
 * @param params
 * @returns {Promise<*>}
 */
export async function userChangePass(params = {}) {
    return httpPost('user/changePass', params);

}


/**
 * 用户上下分记录
 * @param params {start_time,end_time} 例：2018-11-11
 * @returns {Promise<*>}
 */
export async function userRecordLists(params = {}) {
    return httpGet('pan/user_Record_list', params);

}


/**
 * 用户邀请码和邀请图片
 * @param params
 * @returns {Promise<*>} {code,photo}
 */
export async function userInviteCode(params = {}) {
    return httpGet('pan/invite_code', params);

}


/**
 * 用户邀请列表
 * @param params
 * @returns {Promise<*>} {list,user_invite}
 */
export async function userInviteLists(params = {}) {
    return httpGet('user/get_user_invite', params);

}

/**
 * 用户个人流水
 * @param params
 * @returns {Promise<*>} {list,user_invite}
 */
export async function userFinance(params = {}) {
    return httpGet('pan/user_finance', params);

}

/**
 * 用户福利报表(汇总) type 选填 不填显示全部 1 佣金 2 红利 3 特殊返点 4 邀请福利 5 红包
 * @param params
 * @returns {Promise<*>} {list}
 */
export async function userFuliReport(params = {}) {
    if (params && params.type == 5) {
        return userHongbaoReport(params);
    }
    return userWelfareReport(params);
}

/**
 * 用户福利报表 type 选填 不填显示全部 1 佣金 2 红利 3 特殊返点 4 邀请福利
 * @param params
 * @returns {Promise<*>} {list}
 */
export async function userWelfareReport(params = {}) {
    return httpGet('pan/welfare_report', params);
}

/**
 * 用户福利报表 红包
 * @param params
 * @returns {Promise<*>} {list}
 */
export async function userHongbaoReport(params = {}) {
    return httpGet('pan/hongbaoReport', params);
}
