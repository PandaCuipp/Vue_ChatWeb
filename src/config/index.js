const env = process.env;
const isDev = env.NODE_ENV === "development";
export default {
    loginRouteName: env.VUE_APP_LOGIN_NAME || "login",
    homeName: env.VUE_APP_HOME_NAME || "rooms",
    loginTokenKey: env.VUE_APP_LOGIN_TOKEN || "APP_LOGIN_TOKEN",
    siteName: env.VUE_APP_SITE_NAME || "site_name",
    hostName: env.VUE_APP_API_HOST,
    wsSocketHostName: env.VUE_APP_SOCKET_HOST,
    wxAppId: env.VUE_APP_WX_APP_ID,
    version: env.VUE_APP_VERSION,
    onlyWx: isDev ? false : env.VUE_APP_ONLY_WX || false,
};
