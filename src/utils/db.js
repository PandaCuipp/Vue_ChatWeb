import config from "../config";

export function setLoginToken(token) {
    return localStorage.setItem(config.loginTokenKey, token)
}

export function getLoginToken() {
    return localStorage.getItem(config.loginTokenKey)

}

export function removeLoginToken() {
    return localStorage.removeItem(config.loginTokenKey)
}
