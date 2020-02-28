import {
    isString
} from './helpers.js'
import {Toast} from "vant";

const __OPTIONS = Symbol('__OPTIONS');
export default class Socket {
    constructor(options) {
        const __options = Object.assign({
            host: null,
            debug: false,
            onOpen: null,
            onSend: null,
            onClose: null,
            onError: null,
            onMessage: null,
            onReload: null,
        });
        const __constOptions = {
            isOpen: false,
            isPause: false,
            error: null,
            ws: null,
        }
        this[__OPTIONS] = Object.assign(__options, options, __constOptions)
    }

    open(host) {
        this[__OPTIONS].error = null;
        this[__OPTIONS].isPause = false;
        host = host || this[__OPTIONS].host;
        if (!host) {
            Toast('WebSocket服务器域名不正确');
            return;
        }
        const ws = new WebSocket(host);
        ws.onopen = () => {
            this.__onDebug('onOpen')
            this[__OPTIONS].ws = ws;
            this[__OPTIONS].isOpen = true;
            if (typeof this[__OPTIONS].onOpen === 'function') {
                this[__OPTIONS].onOpen(ws, options);
            }
        }
        ws.onerror = (e) => {
            this.__onDebug('onError', e)
            if (typeof this[__OPTIONS].onError === 'function') {
                this[__OPTIONS].error = e;
                this[__OPTIONS].onError(e, this[__OPTIONS].options);
            }
        }
        ws.onclose = () => {
            this.__onDebug('onClose')
            this[__OPTIONS].ws = null;
            this[__OPTIONS].isOpen = false;
            if (typeof this[__OPTIONS].onClose === 'function') {
                if (this[__OPTIONS].onClose(options.error, this[__OPTIONS].options)) {
                    if (!this[__OPTIONS].isPause) {
                        this.reload();
                    }
                }
                ;
                this[__OPTIONS].error = null;
                return;
            }
            this[__OPTIONS].error = null;
            if (!this[__OPTIONS].isPause) {
                this.reload();
            }
        }
        ws.onmessage = ({data}) => {
            if (typeof data === 'string') {
                data = JSON.parse(data);
            }
            this.__onDebug('onMessage', data)
            if (typeof this[__OPTIONS].onMessage === 'function') {
                this[__OPTIONS].onMessage(data, this[__OPTIONS].options);
            }
        }

    }

    close() {
        if (this[__OPTIONS].ws) {
            this[__OPTIONS].ws.close();
        }
    }

    send(message) {
        if (isString(message)) {
            message = JSON.parse(message);
        }
        if (typeof this[__OPTIONS].onSend === 'function') {
            this[__OPTIONS].onSend(message, this[__OPTIONS].options);
        }
        this[__OPTIONS].ws.send(message);
    }

    pause() {
        this[__OPTIONS].isPause = true;
        this.close();
    }

    reload() {
        this.open();
    }

    isOpen() {
        return this[__OPTIONS].isOpen;
    }

    __onDebug(...args) {
        if (this[__OPTIONS].debug) {
            console.log(...args);
        }
    }


}
