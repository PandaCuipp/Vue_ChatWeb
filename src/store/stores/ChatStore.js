import {agentNotice, allNotice} from "../../api/models/notice";
import {getNotOpen, getPeilv} from "../../api/models/game";

export default {
    state: {
        peilv: [],
        notOpenLists: [],
        allNotice: {},
        agentNotice: ''
    },
    getters: {
        peilv: (state) => state.peilv,
        agentNotice: (state) => state.agentNotice,
        notOpenLists: (state) => state.notOpenLists,
    },
    mutations: {
        setAgentNotice(state, agentNotice) {
            state.agentNotice = agentNotice;
        },
        setAllNotice(state, allNotice) {
            state.allNotice = allNotice;
        },
        setPeilv(state, peilv) {
            state.peilv = peilv;
        },
        setNotOpen(state, notOpenLists) {
            state.notOpenLists = notOpenLists;
        },
    },
    actions: {
        async getAgentNotice({dispatch, commit}) {
            let {data} = await agentNotice();
            if (data) {
                commit('setAgentNotice', data.agent_notice)
                return data.agent_notice;
            }
        },
        async getAllNotice({dispatch, commit}) {
            let {data} = await allNotice();
            if (data) {
                commit('setAllNotice', data.admin_notice)
                return data.admin_notice;
            }
        },
        async getPeilv({dispatch, commit}, payload) {
            let {data} = await getPeilv(payload);
            if (data) {
                commit('setPeilv', data.peilv)
                return data.peilv;
            }
        },
        async getNotOpen({dispatch, commit}, payload) {
            let {data} = await getNotOpen(payload);
            if (data) {
                commit('setNotOpen', data.list)
                return data.list;
            }
        },
    }
}
