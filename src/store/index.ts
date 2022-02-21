import Vue from 'vue'
import Vuex from 'vuex'
import Auth, { AuthState } from './auth/AuthModule'
import Board, { BoardState } from './board/BoardModule'

Vue.use(Vuex)

export interface RootState {
  Auth: AuthState,
  Board: BoardState
}

export default new Vuex.Store({
  // state: {},
  modules: {
    Auth,
    Board
  }
})
