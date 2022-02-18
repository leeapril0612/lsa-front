import { Module, MutationTree, ActionTree } from 'vuex'
import { getProfile, login } from '@/service/user/userAPI'
type UserInfo = {
  username: string,
}

type State = {
  profile: UserInfo | null,
  login: boolean
}

type LoginBody = {
  username: string,
  password: string
}

const actions: ActionTree<State, State> = {
  LOGIN (State, { username, password }: LoginBody) {
    return new Promise((resolve, reject) => {
      login({
        username,
        password
      })
        .then(async () => {
          await this.dispatch('getProfile')
            .then((res) => resolve(res))
            .catch((err) => reject(err))
        })
        .catch((err) => reject(err))
    })
  },
  LOGOUT ({ commit }) {
    commit('LOGOUT')
  },
  getProfile ({ commit }) {
    return getProfile()
      .then((res) => {
        commit('setProfile', res.data)
        commit('LOGIN')
        return res
      })
  }
}

const mutations: MutationTree<State> = {
  LOGIN (state) {
    state.login = true
    localStorage.setItem('login', 'true')
  },
  LOGOUT (state) {
    state.login = false
    localStorage.removeItem('login')
  },
  setProfile (state, profile: UserInfo) {
    console.log('setprofile')
    state.profile = profile
  }

}

const Auth: Module<State, State> = {
  // namespaced: true, // <- false일 경우, getters, mutations, actions의 이름을 공용으로 사용
  state: {
    login: localStorage.getItem('login') === 'true',
    profile: null
  },
  mutations,
  actions
}

export default Auth
