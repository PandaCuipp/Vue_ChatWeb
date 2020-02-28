import {httpGet, httpPost} from "../index";

/**
 * 玩法
 * @param params
 * @returns {Promise<*>}
 */
export async function liuPlayPage(params = {}) {
    return httpGet('user/liu_play_page', params);
}

/**
 * 列表
 * @param params
 * @returns {Promise<*>}
 */
export async function liuList(params = {}) {
    return httpGet('user/liu_list', params);
}

/**
 * 投注
 * @param params
 * @returns {Promise<*>}
 */
export async function liuTouZhu(params = {}) {
    return httpPost('pan/xiazhuLiu', params);
}
