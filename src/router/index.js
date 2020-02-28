import Vue from 'vue'
import VueRouter from 'vue-router'
import {getLoginToken} from "../utils/db";
import config from "../config";

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'login',
        meta: {notToken: true},
        component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
    },
    {
        path: '/register',
        name: 'register',
        meta: {notToken: true},
        component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue')
    },
    {
        path: '/demo',
        name: 'demo',
        meta: {notToken: true},
        component: () => import(/* webpackChunkName: "demo" */ '../views/Demo.vue')
    },
    {
        path: '/test',
        name: 'test',
        meta: {notToken: true},
        component: () => import(/* webpackChunkName: "test" */ '../views/Test.vue')
    },
    {
        path: '/rooms',
        name: 'rooms',
        component: () => import(/* webpackChunkName: "rooms" */ '../views/Rooms.vue')
    },
    {
        path: '/home',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
    },
    {
        path: '/userInfo',
        name: 'userInfo',
        component: () => import(/* webpackChunkName: "userInfo" */ '../views/UserInfo.vue')
    },
    {
        path: '/userHeads',
        name: 'userHeads',
        component: () => import(/* webpackChunkName: "userHeads" */ '../views/UserHeads.vue')
    },
    {
        path: '/chat',
        name: 'chat',
        component: () => import(/* webpackChunkName: "chat" */ '../views/Chat.vue')
    },
    {
        path: '/peiLv',
        name: 'peiLv',
        component: () => import(/* webpackChunkName: "peiLv" */ '../views/PeiLv.vue')
    },
    {
        path: '/wanFa',
        name: 'wanFa',
        component: () => import(/* webpackChunkName: "wanFa" */ '../views/WanFa.vue')
    },
    {
        path: '/description',
        name: 'description',
        component: () => import(/* webpackChunkName: "description" */ '../views/Description.vue')
    },
    {
        path: '/record',
        name: 'record',
        component: () => import(/* webpackChunkName: "record" */ '../views/Record.vue')
    },
    {
        path: '/share',
        name: 'share',
        component: () => import(/* webpackChunkName: "share" */ '../views/Share.vue')
    },
    {
        path: '/report',
        name: 'report',
        component: () => import(/* webpackChunkName: "report" */ '../views/Report.vue')
    },
    {
        path: '/reportInput',
        name: 'reportInput',
        component: () => import(/* webpackChunkName: "reportInput" */ '../views/ReportInput.vue')
    },
    {
        path: '/userFinance',
        name: 'userFinance',
        component: () => import(/* webpackChunkName: "userFinance" */ '../views/UserFinance.vue')
    },
    {
        path: '/bettingReport',
        name: 'bettingReport',
        component: () => import(/* webpackChunkName: "bettingReport" */ '../views/BettingReport.vue')
    },
    {
        path: '/bettingQihao',
        name: 'bettingQihao',
        component: () => import(/* webpackChunkName: "bettingQihao" */ '../views/BettingQihao.vue')
    },
    {
        path: '/bettingInfo',
        name: 'bettingInfo',
        component: () => import(/* webpackChunkName: "bettingInfo" */ '../views/BettingInfo.vue')
    },
    {
        path: '/fuliReport',
        name: 'fuliReport',
        component: () => import(/* webpackChunkName: "fuliReport" */ '../views/FuliReport.vue')
    },

    {
        path: '/redPacket',
        name: 'redPacket',
        component: () => import(/* webpackChunkName: "redPacket" */ '../views/RedPacket.vue')
    },

    {
        path: '*',
        meta: {notToken: true, notFound: true},
        component: () => import(/* webpackChunkName: "notFound" */ '../views/404.vue')
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});
router.beforeEach((to, from, next) => {
    let toMeta = to.meta || {}
    if (toMeta.notFound) {
        next();
    }
    const token = getLoginToken();
    if (toMeta.notToken && token) {
        // 放在了Login.vue处理了（可以移过来）
    }
    if (!toMeta.notToken && !token) {
        next({name: config.loginRouteName});
    }
    next();
})

export default router
