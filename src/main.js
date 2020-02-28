import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vant/lib/index.css';
import './scss/index.scss';
import './utils/lib-flexible'; //引入rem自适应
Vue.config.productionTip = false
Vue.config.devtools = true
import * as vant from 'vant';
import VueNativeSock from './socket/Main'

Vue.use(VueNativeSock, 'ws://localhost:9090', {
    store,
    format: 'json',
    connectManually: true,
    reconnection: true, // (Boolean) whether to reconnect automatically (false)
    reconnectionDelay: 3000, // (Number) how long to initially wait before attempting a new (1000)
})
Vue.use(vant);
document.oncontextmenu = function (e) {
    //取消默认的浏览器自带右键
    // e.preventDefault();
}
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
