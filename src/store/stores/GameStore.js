import {
    gameChangLongLists,
    gameInfo,
    gameLists, getHBaoLists,
    getUserReportQihao, getUserReportQihaoInfo,
    getUserReportUser,
    historyLists, receiveHbao,
    simpleGameLists
} from "../../api/models/game";
import commonData from "../../utils/commonData";
import {isBoolean, isEmpty, isObject, isUndefined} from "../../utils/helpers";
import {Toast} from "vant";

export default {
    state: {
        showVideo: undefined,
        gameLists: [], // 游戏列表
        timerGameLists: [], // 首页定时游戏列表
        simpleGameLists: [], // 游戏列表（简单）
        changLongLists: {}, // 游戏长龙列表
        hBaoLists: [], // 红包列表
        gameId: undefined, // 当前游戏ID（进入房间）
        gameInfo: {}, // 当前游戏（进入房间）
        timerGameInfo: {}, // 当前游戏（进入房间定时游戏信息）
        historyLists: [], // 游戏历史开奖记录
        userReportUser: [], // 用户竞猜报表 游戏
        userReportQihao: [], // 用户竞猜报表 游戏 期号
        userReportQihaoInfo: [], // 用户竞猜报表 游戏 期号 详情
    },
    getters: {
        gameLists: (state) => state.gameLists,
        showVideo: (state) => state.showVideo,
        simpleGameLists: (state) => state.simpleGameLists,
        changLongLists: (state) => state.changLongLists,
        hBaoLists: (state) => state.hBaoLists,
        timerGameLists: (state) => state.timerGameLists,
        timerGameInfo: (state) => state.timerGameInfo,
        historyLists: (state) => state.historyLists,
        userReportUser: (state) => state.userReportUser,
        userReportQihao: (state) => state.userReportQihao,
        userReportQihaoInfo: (state) => state.userReportQihaoInfo,
    },
    mutations: {
        setTimerGameLists(state, gameLists) {
            state.timerGameLists = gameLists;
        },
        setShowVideo(state, val) {
            if (isUndefined(val)) {
                if (!isBoolean(state.showVideo)) {
                    state.showVideo = localStorage.getItem(commonData.videoLocalStoreKey) === 'true';
                    localStorage.setItem(commonData.videoLocalStoreKey, state.showVideo)
                }
            } else {
                state.showVideo = Boolean(val);
                localStorage.setItem(commonData.videoLocalStoreKey, state.showVideo)
            }


        },
        setGameLists(state, gameLists) {
            state.gameLists = gameLists;
        },
        setHBaoLists(state, hBaoLists) {
            state.hBaoLists = hBaoLists;
        },
        setChangLongLists(state, changLongLists) {
            state.changLongLists = changLongLists;
        },
        setSimpleGameLists(state, simpleGameLists) {
            state.simpleGameLists = simpleGameLists;
        },
        setTimerGameInfo(state, gameInfo) {
            state.timerGameInfo = gameInfo;
        },
        setGameInfo(state, gameInfo) {
            state.gameInfo = gameInfo;
        },
        setGameId(state, gameId) {
            state.gameId = gameId;
        },
        setHistoryLists(state, historyLists) {
            state.historyLists = historyLists;
        },
        prependHistoryLists(state, historyLists) {
            state.historyLists.unshift(...historyLists);
        },
        appendHistoryLists(state, historyLists) {
            state.historyLists.push(...historyLists);
        },
        setUserReportUser(state, userReportUser) {
            state.userReportUser = userReportUser;
        },
        setUserReportQihao(state, userReportQihao) {
            state.userReportQihao = userReportQihao;
        },
        setUserReportQihaoInfo(state, userReportQihaoInfo) {
            state.userReportQihaoInfo = userReportQihaoInfo;
        },
    },
    actions: {
        async getTimerGameLists({dispatch, commit}) {
            let {data} = await gameLists();
            if (data) {
                commit('setTimerGameLists', data.list)
                return data;
            }
        },
        async getGameLists({dispatch, commit}) {
            let {data} = await gameLists();
            if (data) {
                commit('setGameLists', data.list)
                return data;
            }
        },
        async getChangLongLists({dispatch, commit}, payload) {
            let {data} = await gameChangLongLists(payload);
            if (data) {
                commit('setChangLongLists', data.changlong || {})
                return data.changlong;
            }
        },
        async getSimpleGameLists({dispatch, commit}) {
            let {data} = await simpleGameLists();
            if (data) {
                commit('setSimpleGameLists', data)
                return data;
            }
        },
        async getTimerGameInfo({dispatch, commit}, payload) {
            let {data} = await gameInfo(payload);
            if (data) {
                commit('setTimerGameInfo', data.list)
                return data.list;
            }
        },
        async getGameInfo({dispatch, commit}, payload) {
            let {data} = await gameInfo(payload);
            if (data) {
                commit('setGameInfo', data.list)
                return data;
            }
        },
        async getHistoryLists({dispatch, commit}, payload) {
            let {data} = await historyLists(payload);
            if (data) {
                commit('setHistoryLists', data.history)
                return data.history;
            }
        },
        // 加载最新开奖记录
        async prependHistoryLists({dispatch, commit, state}, payload = {}) {
            if (state.historyLists && state.historyLists.length) {
                payload.qihao_min = state.historyLists[0].qihao;
                let {data} = await historyLists(payload);
                if (data) {
                    commit('prependHistoryLists', data.history);
                    return data.history;
                }
            }
        },
        // 加载更多开奖记录
        async loadMoreHistoryLists({dispatch, commit}, payload) {
            let {data} = await historyLists(payload);
            if (data) {
                commit('appendHistoryLists', data.history);
                return data.history;
            }
        },
        // 用户竞猜报表 游戏
        async getUserReportUser({dispatch, commit}, payload) {
            let {data} = await getUserReportUser(payload);
            if (data) {
                data = isObject(data) ? Object.values(data) : data;
                commit('setUserReportUser', data);
                return data;
            }
        },
        // 用户竞猜报表 游戏 期号
        async getUserReportQihao({dispatch, commit}, payload) {
            let {data} = await getUserReportQihao(payload);
            if (data) {
                commit('setUserReportQihao', data);
                return data;
            }
        },
        // 用户竞猜报表 游戏 期号 详情
        async getUserReportQihaoInfo({dispatch, commit}, payload) {
            let {data} = await getUserReportQihaoInfo(payload);
            if (data) {
                commit('setUserReportQihaoInfo', data);
                return data;
            }
        },
        // 红包列表
        async getHBaoLists({dispatch, commit}, payload) {
            let {data} = await getHBaoLists(payload);
            if (data) {
                let lists = data.list || [];
                if (isObject(lists)) {
                    lists = Object.values(lists);
                }
                commit('setHBaoLists', lists);
                return lists;
            }
        },
        // 领取红包
        async receiveHbao({dispatch, commit}, payload) {
            let res = await receiveHbao(payload);
            if (!isEmpty(res.message)) {
                Toast(res.message);
            }
            return res.state === 200;
        },

    }
}
