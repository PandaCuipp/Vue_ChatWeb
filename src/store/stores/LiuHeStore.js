import {liuList, liuPlayPage} from "../../api/models/liuhe";
import {isArray, isEmpty, isNumeric, isObject, isString, isUndefined} from "../../utils/helpers";
import liuHeBalls from "../../components/liuHeKeyboard/liuHeBalls";

export default {
    state: {
        liuHeNavs: [],
        liuHeLists: {},
        liuHeBalls: [],
    },
    getters: {
        liuHeNavs: (state) => state.liuHeNavs,
        liuHeLists: (state) => state.liuHeLists,
        liuHeLists2: state => (navId, subNavId) => {
            const _key = `${navId}_${subNavId}`;
            const lists = state.liuHeLists[_key] || [];
            let res = {};
            lists.forEach(item => {
                let _name = item.page_name1 || '';
                let page_name2 = (item.page_name2 || '').split('_');
                const _name2 = page_name2[0] || _name;
                if (_name.endsWith('码') || _name.endsWith('特') || _name.endsWith('多不中一')) {
                    if (isUndefined(res.balls)) {
                        res.balls = {
                            title: _name2,
                            data: [],
                        };
                    }
                    if (isUndefined(res.rules)) {
                        res.rules = {
                            title: `${_name2}-规则`,
                            data: [],
                        };
                    }
                    if (isNumeric(item.remark)) {
                        res.balls.data.push({
                            id: item.remark,
                            name: item.remark,
                            peilv: item.peilv,
                            color: liuHeBalls[item.remark - 1].color,
                        });
                    } else {
                        res.rules.data.push({
                            id: item.remark,
                            name: item.remark,
                            peilv: item.peilv,
                            color: '#2FBCF6',
                        });
                    }
                } else if (isString(item.keywords)) {
                    if (isUndefined(res.zodiac)) {
                        res.zodiac = {
                            title: _name2,
                            data: [],
                        };
                    }
                    if (isUndefined(res.wave)) {
                        res.wave = {
                            title: _name2,
                            data: [],
                        };
                    }
                    if ((item.page_name1 || '').endsWith('半波')) {
                        res.wave.data.push({
                            id: item.remark,
                            name: item.remark,
                            peilv: item.peilv,
                            balls: item.keywords.split(',').map(item => {
                                return {
                                    id: item,
                                    name: item,
                                    color: liuHeBalls[item - 1].color,
                                }
                            }),
                        });
                    } else {
                        res.zodiac.data.push({
                            id: item.remark,
                            name: item.remark,
                            peilv: item.peilv,
                            balls: item.keywords.split(',').map(item => {
                                return {
                                    id: item,
                                    name: item,
                                    color: liuHeBalls[item - 1].color,
                                }
                            }),
                        });
                    }

                }
            });
            return res;
        }
    },
    mutations: {
        setLiuHeNavs(state, liuHeNavs = []) {
            liuHeNavs = liuHeNavs.map(item => {
                switch (item.page_name) {
                    case '连码':
                    case '尾数连':
                        item.subNav = [{
                            id: 1,
                            name: '复式',
                        }, {
                            id: 2,
                            name: '拖胆',
                        }];
                        break;
                    default:
                        item.subNav = [];
                }
                return item;
            })
            state.liuHeNavs = liuHeNavs;
        },
        setLiuHeLists(state, {navId, data}) {
            let _data = {};
            data.forEach(item => {
                let key = `${item.page}_${item.page2}`;
                if (isUndefined(_data[key])) {
                    _data[key] = [];
                }
                _data[key].push(item);
            });
            state.liuHeLists = {...state.liuHeLists, ..._data};
        },
    },
    actions: {
        async getLiuPlayPage({commit}) {
            let {data} = await liuPlayPage();
            if (isArray(data) && data.length === 2) {
                let [nav, subNav] = data;

                if (!isArray(nav) || !isArray(subNav)) {
                    return [];
                }
                nav = nav.map(item => {
                    for (let subItem of subNav) {
                        if (isUndefined(item.children)) {
                            item.children = [];
                        }
                        if (item.class_id === subItem.page1) {
                            item.children.push(subItem);
                        }
                    }
                    return item;
                });
                commit('setLiuHeNavs', nav);
                return nav;
            }
            return [];

        },

        async getLiuList({commit, state}, payload) {
            const emptyRes = [];
            if (!isObject(payload) || isEmpty(payload)) {
                return emptyRes;
            }
            if (!isNumeric(payload.page_id)) {
                return emptyRes;
            }
            const nav = state.liuHeNavs;
            let currentNav = {children: []};
            for (let item of nav) {
                if (item.class_id == payload.page_id) {
                    payload.page = item.page_name;
                    currentNav = item;
                    break;
                }
            }
            let {data} = await liuList(payload);

            if (isEmpty(data)) {
                return emptyRes;
            }
            if (isNumeric(payload.page2_id)) {
                for (let item of currentNav.children) {
                    if (item.class_id == payload.page2_id) {
                        payload.page2 = item.page_name;
                        break;
                    }
                }
            }
            const _data = {
                navId: payload.page_id,
                subNavId: payload.page2_id,
                data,
            };
            commit('setLiuHeLists', _data);
            const _key = `${_data.navId}_${_data.subNavId}`;
            return state.liuHeLists[_key] || [];
        },

    }
}
