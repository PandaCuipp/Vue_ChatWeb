import {
    agentChat, getTuiShui, logout,
    todayResult,
    userChangePass,
    userFinance,
    userFuliReport,
    userInfo,
    userInfoEdit,
    userInviteCode,
    userInviteLists,
    userRecordLists, userXiaZhu
} from "../../api/models/user";
import {Toast} from "vant";
import {bcAdd, isEmpty, isArray} from "../../utils/helpers";
import Vue from "vue";
import {navigateTo} from "../../utils/navigate";
import config from "../../config";
import {removeLoginToken} from "../../utils/db";

export default {
    state: {
        userInfo: {}, // 登录用户信息
        agentQQ: '',
        agentWeiXin: '',
        todayResult: {},
        userRecordLists: {}, //用户上下分记录
        userInviteCode: {},
        userInviteLists: {},
        userFinance: {},
        userFuliReport: [],
        fanDianList: {}, // 提前反水信息
    },
    getters: {
        userInfo: (state) => state.userInfo,
        agentQQ: (state) => state.agentQQ,
        agentWeiXin: (state) => state.agentWeiXin,
        todayResult: (state) => state.todayResult,
        userRecordLists: (state) => state.userRecordLists,
        userInviteCode: (state) => state.userInviteCode,
        userInviteLists: (state) => state.userInviteLists,
        userFinance: (state) => state.userFinance,
        userFuliReport: (state) => state.userFuliReport,
        fanDianList: (state) => state.fanDianList,
    },
    mutations: {
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo;
        },
        setAgentQQ(state, agentQQ) {
            state.agentQQ = agentQQ;
        },
        setAgentWeiXin(state, agentWeiXin) {
            state.agentWeiXin = agentWeiXin;
        },
        setTodayResult(state, todayResult) {
            state.todayResult = todayResult;
        },
        setUserRecordLists(state, userRecordLists) {
            state.userRecordLists = userRecordLists;
        },
        setUserInviteCode(state, userInviteCode) {
            state.userInviteCode = userInviteCode;
        },
        setUserInviteLists(state, userInviteLists) {
            state.userInviteLists = userInviteLists;
        },
        setUserFinance(state, userFinance) {
            state.userFinance = userFinance;
        },
        setUserFuliReport(state, userFuliReport) {
            state.userFuliReport = userFuliReport;
        },
        setUserTuiShui(state, data) {
            let fanDianList = {
                money: 0,
                not_money: 0,
                already_money: 0,
                result: 0,
            };

            data.forEach(item => {
                let not_money = [fanDianList.not_money, item.not_money, item.lost_not_money, item.special_not_money];
                let already_money = [fanDianList.already_money, item.already_money, item.lost_already_money, item.special_already_money];
                let result = [fanDianList.result, item.result, item.lost_result, item.special_result];
                fanDianList.not_money = not_money.reduce((a, b) => bcAdd(a, b), 0);
                fanDianList.already_money = already_money.reduce((a, b) => bcAdd(a, b), 0);
                fanDianList.result = result.reduce((a, b) => bcAdd(a, b), 0);
            });
            state.fanDianList = fanDianList;
        }
    },
    actions: {
        async getUserInfo({dispatch, commit}) {
            let {data} = await userInfo();
            if (data) {
                commit('setUserInfo', data.userInfo)
                return data;
            }
        },
        async getAgentQQ({dispatch, commit}) {
            let {data} = await agentChat({type: 1});
            if (data) {
                commit('setAgentQQ', data.agent_chat_list)
                return data;
            }
        },
        async getAgentWeiXin({dispatch, commit}) {
            let {data} = await agentChat({type: 2});
            if (data) {
                commit('setAgentWeiXin', data.agent_chat_list)
                return data;
            }
        },
        async getTodayResult({dispatch, commit}) {
            let {data} = await todayResult();
            if (data) {
                commit('setTodayResult', data)
                return data;
            }
        },
        async setUserInfoEdit({dispatch}, payload) {
            let res = await userInfoEdit(payload);
            Toast(res.message);
            if (res.state === 200) {
                dispatch('getUserInfo');
                return true;
            }
            return false;
        },
        async setUserChangePass({dispatch}, payload) {
            let res = await userChangePass(payload);
            Toast(res.message);
            if (res.state === 200) {
                return true;
            }
            return false;
        },
        async getUserRecordLists({dispatch, commit}) {
            let {data} = await userRecordLists();
            if (data) {
                commit('setUserRecordLists', data)
                return data;
            }
        },
        async getUserInviteCode({dispatch, commit}) {
            let {data} = await userInviteCode();
            if (data) {
                commit('setUserInviteCode', data)
                return data;
            }
        },
        async getUserInviteLists({dispatch, commit}) {
            let {data} = await userInviteLists();
            if (data) {
                commit('setUserInviteLists', data)
                return data;
            }
        },
        async getUserFinance({dispatch, commit}, payload) {
            let {data} = await userFinance(payload);
            if (data) {
                commit('setUserFinance', data.list)
                return data.list;
            }
        },
        async getUserFuliReport({dispatch, commit}, payload) {
            let {data} = await userFuliReport(payload);
            if (data) {
                commit('setUserFuliReport', data.list)
                return data.list;
            }
        },
        // 用户下注
        async userXiaZhu({dispatch, commit}, payload) {
            let res = await userXiaZhu(payload);
            if (res.message) {
                Toast(res.message);
            }
            return res && res.state === 200;
        },
        // 提前返点
        async setTuiShui({dispatch, commit}, payload) {
            let {data, message} = await getTuiShui(payload);
            if (data) {
                if (!isArray(data)) {
                    data = Object.values(data);
                }
                if (payload.type === 0) {
                    commit('setUserTuiShui', data);
                } else if (payload.type === 1) {
                    if (!isEmpty(message)) {
                        Toast(message);
                    }
                }
            }

            return data;
        },
        async userLogout({dispatch, commit}, payload) {
            const res = await logout();
            if (res) {
                if (Vue.prototype.$socket) {
                    Vue.prototype.$socket.close();
                }
                removeLoginToken();
                navigateTo(config.loginRouteName)
            }
        }
    }
}
