import Vue from 'vue'
import Vuex from 'vuex'
import { getProfile, login } from '@/service/user/userAPI'

Vue.use(Vuex)

type UserInfo = {
  username: string,
}

type State = {
  profile: UserInfo | null,
  login: boolean
}

export default new Vuex.Store<State>({
  state: {
    login: localStorage.getItem('login') === 'true',
    profile: null
  },
  mutations: {
    LOGIN (state) {
      state.login = true
    },
    LOGOUT (state) {
      state.login = false
    },
    setProfile (state, profile: UserInfo) {
      console.log('setprofile')
      state.profile = profile
    }
  },
  actions: {
    LOGIN ({ commit }, { username, password }) {
      return new Promise((resolve, reject) => {
        login({
          username,
          password
        })
          .then(() => {
            commit('LOGIN')
            this.dispatch('getUserInfo')
              .then((res) => resolve(res))
              .catch((err) => reject(err))
          })
          .catch((err) => reject(err))
      })
    },
    LOGOUT ({ commit }) {
      commit('LOGOUT')
    },
    getUserInfo ({ commit }) {
      return getProfile()
        .then((res) => {
          commit('setProfile', res.data)
          return res
        })
    }
  },
  getters: {
  },
  modules: {
  }
})
