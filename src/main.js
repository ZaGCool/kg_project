import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { VueJsonp } from 'vue-jsonp'

// 导入测试iconfont css文件
// import './assets/font2/iconfont.css';

Vue.use(VueJsonp);

// 导入base.css
import './assets/css/base.css';

import './assets/font/iconfont.css';

Vue.config.productionTip = false

import axios from 'axios'
// 把axios挂载Vue的prototype 身上  所有的vue实例以及组件都可以访问了
Vue.prototype.$axios = axios;

axios.defaults.baseURL = 'http://localhost:4000/api';

Vue.filter('imgFilter', (inp) => {
    return inp.replace(/{size}/, '400')
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')