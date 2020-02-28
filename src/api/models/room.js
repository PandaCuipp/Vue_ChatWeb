import {httpGet} from "../index";

/**
 * 获取房间信息、进入房间 1查询 2上传parent_id 3输入六位数房间号
 * @param params {type,code}
 * @returns {Promise<*>}
 */
export async function intoRoom(params={}) {
    return httpGet('user/into_room', params);
}
