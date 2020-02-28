import {httpGet, httpPost} from "../index";
import {setLoginToken} from "../../utils/db";
import {Toast} from "vant";


/**
 * 获取代理公告
 * @param params
 * @returns {Promise<*>}
 */
export async function agentNotice(params = {}) {
    return httpGet('user/agent_notice_list', params);
}

/**
 * 获取平台公告
 * @param params
 * @returns {Promise<*>}
 */
export async function allNotice(params = {}) {
    return httpGet('notice/index', params);
}
