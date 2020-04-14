import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router/index.js'

Vue.use(VueAxios, axios)


import "./plugins/element.js"
import "./assets/css/main.scss"
import "./assets/css/layout.scss"

// 引入axios
import api from "./axios/index.js"
Vue.use(api)

// 封装过滤器
import filters from './filter/index.js'
Object.keys(filters).forEach(key => {
	Vue.filter(key,filters[key])
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
