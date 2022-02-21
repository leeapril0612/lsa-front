import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/board',
    name: 'board',
    component: () => import('../views/board/BoardList.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// router.beforeEach(async (to, from, next) => {
//   // const token = store.state.accessToken
//   // if (token) {
//   // const isEx = store.getters.isExpiredToken
//   // console.log(isEx)
//   // }
//   if (to.meta?.authorized) {
//     return next('/')
//   }
//   return next()
// })

export default router
