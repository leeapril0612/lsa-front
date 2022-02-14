import Vue from 'vue'
import VueCookies from 'vue-cookies-ts'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.use(VueCookies)
Vue.cookies.config({
  expires: 60 * 5
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
