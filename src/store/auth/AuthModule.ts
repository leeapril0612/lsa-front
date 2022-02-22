import { Module, MutationTree, ActionTree } from 'vuex'
import { getProfile, login, logout } from '@/service/user/userAPI'
import { RootState } from '..'
type UserInfo = {
  username: string,
}

export type AuthState = {
  profile: UserInfo | null,
  login: boolean,

  isLoadingLogin: boolean,
  doneLogin: boolean,
  errorLogin: string | null,

  isLoadingLogout: boolean,
  doneLogout: boolean,
  errorLogout: string | null,
}

type LoginBody = {
  username: string,
  password: string
}

const actions: ActionTree<AuthState, RootState> = {
  async LOGIN (State, { username, password }: LoginBody) {
    try {
      await login({
        username,
        password
      })
      await this.dispatch('getProfile')
      return true
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async LOGOUT ({ commit }) {
    try {
      await logout()
      commit('LOGOUT')
    } catch (err) {
    }
  },
  async getProfile ({ commit }) {
    try {
      const { data } = await getProfile()
      commit('setProfile', data)
      commit('LOGIN')
      return true
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

const mutations: MutationTree<AuthState> = {
  LOGIN (state) {
    state.login = true
    localStorage.setItem('login', 'true')
  },
  LOGOUT (state) {
    state.login = false
    localStorage.removeItem('login')
  },
  setProfile (state, profile: UserInfo) {
    state.profile = profile
  },

  setIsLoadingLogin (state, isLoading: boolean) {
    state.isLoadingLogin = isLoading
  },
  setIsLoadingLogout (state, isLoading: boolean) {
    state.isLoadingLogout = isLoading
  },

  setDoneLogin (state, isDone: boolean) {
    state.doneLogin = isDone
  },
  setDoneLogout (state, isDone: boolean) {
    state.doneLogout = isDone
  },

  setErrorLogin (state, error: string | null) {
    state.errorLogin = error
  },
  setErrorLogout (state, error: string | null) {
    state.errorLogout = error
  }

}

const Auth: Module<AuthState, RootState> = {
  // namespaced: true, // <- false일 경우, getters, mutations, actions의 이름을 공용으로 사용
  state: {
    login: localStorage.getItem('login') === 'true',
    profile: null,

    doneLogin: false,
    doneLogout: false,

    errorLogin: null,
    errorLogout: null,

    isLoadingLogin: false,
    isLoadingLogout: false
  },
  mutations,
  actions
}

export default Auth
