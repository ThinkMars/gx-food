import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'

import "./plugins/element.js"
import "./assets/css/main.scss"
import "./assets/css/layout.scss"
// import  'element-ui/lib/theme-chalk/index.css'

// 引入axios
import api from "./axios/index.js"
Vue.use(api)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
