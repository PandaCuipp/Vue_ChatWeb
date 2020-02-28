import {httpGet, httpPost} from "../index";
import {isObject} from "../../utils/helpers";


/**
 * 领取红包
 * @param params
 * @returns {Promise<*>}
 */
export async function receiveHbao(params = {}) {
    return httpGet('user/get_hongbao', params);
}

/**
 * 已经领取的红包信息
 * @param params
 * @returns {Promise<*>}
 */
export async function getHongbaoInfo(params = {}) {
    return httpGet('user/getHongbaoInfo', params);
}

/**
 * 获取红包列表
 * @param params
 * @returns {Promise<*>}
 */
export async function getHBaoLists(params = {}) {
    return httpPost('user/get_hb_list', params);
}

/**
 * 获取游戏长龙
 * @param params {game_id}
 * @returns {Promise<*>}
 */
export async function gameChangLongLists(params = {}) {
    return httpPost('pan/changlong', params);
}

/**
 * 获取游戏列表（包含所有数据）
 * @param params
 * @returns {Promise<*>}
 */
export async function gameLists(params = {}) {
    let res = await httpGet('pan/game_list', params);
    if (res.data && isObject(res.data.list)) {
        res.data.list = Object.values(res.data.list)
    }
    return res;

}

/**
 * 获取游戏列表（仅包含开启的、字段仅包含ID、game_name）
 * @param params
 * @returns {Promise<*>}
 */
export async function simpleGameLists(params = {}) {
    let res = await httpGet('user/game_pan_list', params);
    if (isObject(res.data)) {
        res.data = Object.values(res.data)
    }
    return res;
}


/**
 * 获取单个游戏信息
 * @param params {game_id}
 * @returns {Promise<*>}
 */
export async function gameInfo(params = {}) {
    return httpGet('pan/one_game_list', params);

}

/**
 * 获取游戏历史开奖记录
 * @param params
 * @returns {Promise<*>}
 */
export async function historyLists(params = {}) {
    return httpGet('pan/history', params);
}

/**
 * 获取游戏赔率
 * @param params
 * @returns {Promise<*>}
 */
export async function getPeilv(params = {}) {
    return httpGet('pan/peilv', params);
}

/**
 * 获取未开奖记录
 * @param params
 * @returns {Promise<*>}
 */
export async function getNotOpen(params = {}) {
    return httpGet('pan/not_open', params);
}

/**
 * 用户竞猜报表 游戏
 * @param params
 * @returns {Promise<*>}
 */
export async function getUserReportUser(params = {}) {
    return httpGet('pan/userReportUser', params);
}

/**
 * 用户竞猜报表 游戏 期号
 * @param params
 * @returns {Promise<*>}
 */
export async function getUserReportQihao(params = {}) {
    return httpGet('pan/userReportQihao', params);
}

/**
 * 用户竞猜报表 游戏 期号 详情
 * @param params
 * @returns {Promise<*>}
 */
export async function getUserReportQihaoInfo(params = {}) {
    return httpGet('pan/userReportQihaoInfo', params);
}
