import Vue from 'vue'
import App from './App.vue'
import routes from './router/routes'
import axios from 'axios'

//element ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


Vue.config.productionTip = false

//此处配置路由,不用在router.js里再写一次
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const router = new VueRouter({
    routes
})

//配置axios
Vue.prototype.axios = axios.create({
	baseURL: '/api',//vue.config.js中修改
	timeout: 2000 //最大延迟
})

//创建Vue对象
new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
