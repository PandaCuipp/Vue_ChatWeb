import Vue from "vue";
import {genUserChatHistroyMessage, isObject, isString, isArray} from "../../utils/helpers";
import commonData from "../../utils/commonData";
import {Toast} from "vant";

export default {
    state: {
        userChatHistoryLog: [],
        closing: false,
        customReconnect: false,
        socket: {
            isConnected: false,
            message: '',
            connectCount: 0,
            reconnectError: false,
        }
    },
    getters: {
        isConnected: (state) => state.socket.isConnected,
        connectCount: (state) => state.socket.connectCount,
        userChatHistoryLog: (state) => state.userChatHistoryLog,
    },
    mutations: {
        setConnectCount(state, connectCount = 0) {
            state.socket.connectCount = connectCount;
        },
        setCustomReconnect(state, status = false) {
            state.customReconnect = status;
        },
        initUserChatHistoryLog(state, message = []) {
            state.userChatHistoryLog = message;
        },
        setSockCloseStatus(state, val) {
            state.closing = Boolean(val);
        },
        SOCKET_ONOPEN(state, event) {
            console.log('SOCKET_ONOPEN')
            // 在App.vue中处理（优先级比vuex中高）
            // Vue.prototype.$socket = event.currentTarget;
            state.customReconnect = false;
            state.socket.isConnected = true;
            state.socket.connectCount++;
            state.socket.reconnectError = false;
            if (commonData.wsHeartbeatTimer) {
                clearInterval(commonData.wsHeartbeatTimer);
            }
            commonData.wsHeartbeatTimer = setInterval(() => {
                this.dispatch('userSocketHeartbeat');
            }, 20000);
        },
        SOCKET_ONCLOSE(state, event) {
            console.log('SOCKET_ONCLOSE');
            Vue.prototype.$socket = null;
            state.socket.isConnected = false;
            if (commonData.wsHeartbeatTimer) {
                clearInterval(commonData.wsHeartbeatTimer);
            }
            if (state.customReconnect && typeof Vue.prototype.$connect === 'function') {
                // Vue.prototype.$connect(webSocketApi());
            }
        },
        SOCKET_ONERROR(state, event) {
            if (event.message === 'TIMEOUT') {
                Toast('网络连接超时，请检查您的网络是否正常');
            }
            console.log('SOCKET_ONERROR', event)
        },
        SOCKET_ONMESSAGE(state, message) {
            if (message) {
                let _msg = message.message || '';
                // Toast(_msg);
                if (_msg.endsWith('加入房间')) {
                    const logs = state.userChatHistoryLog;
                    const logLength = logs.length;
                    if (logLength > 0) {
                        const endMsg = logs[logLength - 1];
                        if (endMsg.text === message.message || message.message.indexOf(endMsg.text) > -1) {
                            return;
                        }
                    }
                } else if (message.code == 266 || _msg.endsWith('已经开奖') || _msg.endsWith('已开奖')) {
                    this.dispatch('getTodayResult');
                    // this.commit('playKaijiangSound');
                } else if (_msg.endsWith('已封盘')) {
                    // this.commit('playFengpanSound');
                } else if (_msg.indexOf('已经开盘') > -1) {
                    // this.commit('playKeyixiazhuSound');
                }

                if (message.code === 401 || message.code === 400) {
                    if (!state.closing) this.dispatch('userLogout');
                } else if (message.code === 208) {
                    this.dispatch('getTodayResult');
                    this.dispatch('getUserInfo');
                }


            }
            if (message && message.code == 112) {
                let historyMessage = message.data;

                if (Array.isArray(historyMessage)) {
                    // historyMessage = historyMessage.resolve();
                    let preMessage;
                    historyMessage.forEach(item => {
                        if (typeof item === 'string') {
                            try {
                                item = JSON.parse(item);
                            } catch (e) {
                                return;
                            }
                        }
                        if (!item) {
                            return;
                        }

                        if (!item.message || !item.message.length) {
                            return;
                        }
                        try {
                            const msg = genUserChatHistroyMessage.bind(this)(item);
                            if (msg.text === preMessage) {
                                return;
                            }
                            preMessage = msg.text;
                            if (msg) {
                                if (msg.text && isString(msg.text)) {
                                    msg.text = msg.text.replace(/\r\n/g, "<br/>");
                                }
                                state.userChatHistoryLog.push(msg);
                            }
                        } catch (e) {

                        }

                    });
                }
            } else {
                const msg = genUserChatHistroyMessage.bind(this)(message);
                if (msg) {
                    if (msg.text && isString(msg.text)) {
                        msg.text = msg.text.replace(/\r\n/g, "<br/>");
                    }
                    state.userChatHistoryLog.push(msg);
                }
            }


        },
        SOCKET_RECONNECT(state, count) {
            console.log('SOCKET_RECONNECT', count)
            state.socket.isConnected = true
        },
        SOCKET_RECONNECT_ERROR(state) {
            state.socket.reconnectError = true;
        },
    },
    actions: {
        sendMessage(context, message) {
            if (isString(message)) {
                Vue.prototype.$socket.send(message)
            } else if (isObject(message) || isArray(message)) {
                Vue.prototype.$socket.send(JSON.stringify(message));
            }

        },
        userJoinRoom({dispatch}, game_id) {
            dispatch('sendMessage', {
                type: "choose",
                game_id
            });
        },
        userSocketHeartbeat({dispatch}) {
            dispatch('sendMessage', {
                type: "heartbeat",
            })
        }
    }
}
