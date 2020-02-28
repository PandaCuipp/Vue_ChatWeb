import {Toast} from "vant";
import {isString} from "../../utils/helpers";

const SessionLoadingStatusKey = '__SessionLoadingStatus__';
export default {
    data() {
        return {
            __toast: null,
        }
    },
    methods: {
        _initShowLoading(messageKey) {
            if (this._getSessionLoadingStatus()) {
                this._showLoading(this._getSessionLoadingMessage(messageKey));
                this._setSessionLoadingMessage(messageKey, '');
            }
        },
        _showLoading(message = '', duration = 0) {
            this._closeLoading();
            const __toast = Toast.loading({
                duration, // 0 持续展示 toast
                forbidClick: true,
                message,
            });
            if (duration === 0) {
                this.__toast = __toast;
            }

        },
        _closeLoading() {
            if (this.__toast) {
                if (typeof this.__toast.clear === 'function') {
                    this.__toast.clear();
                }
                this.__toast = null;
                this._setSessionLoadingStatus(false);
            }
        },
        _setSessionLoadingStatus(status = false, message) {
            sessionStorage.setItem(SessionLoadingStatusKey, `${status}`);
        },
        _getSessionLoadingStatus() {
            return sessionStorage.getItem(SessionLoadingStatusKey) === 'true';
        },
        _setSessionLoadingMessage(key, message = '') {
            if (isString(message)) {
                sessionStorage.setItem(key, message);
            }
        },
        _getSessionLoadingMessage(key) {
            return sessionStorage.getItem(key) || '';
        }
    }
}