import Vue from 'vue'
import Vuex from 'vuex'
import Auth from './auth/AuthModule'

Vue.use(Vuex)

type UserInfo = {
  username: string,
}

type State = {
  profile: UserInfo | null,
  login: boolean
}

export default new Vuex.Store({
  // state: {},
  modules: {
    Auth
  }
})
