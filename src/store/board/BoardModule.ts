import { Module, MutationTree, ActionTree, GetterTree } from 'vuex'
import { getBoards } from '@/service/board/boardAPI'
import { RootState } from '..'

export type BoardState = {
  boards: Board[],
  board: Board | null,

  isLoadingBoards: boolean,
  isLoadingBoard: boolean,

  errorBoards: string | null
  errorBoard: string | null,

  doneBoards: boolean,
  doneBoard: boolean,
}

const actions: ActionTree<BoardState, RootState> = {
  async GET_BOARDS ({ commit }) {
    commit('setIsLoadingBoards', true)
    commit('setDoneBoards', false)
    commit('setErrorBoard', null)
    const boards = this.state.Board.boards
    try {
      const { data } = await getBoards()
      commit('setBoards', [...boards, ...data])
      return Promise.resolve(true)
    } catch (error) {
      commit('setErrorBoards', error)
      return Promise.reject(error)
    } finally {
      commit('setIsLoadingBoards', false)
    }
  }
}

const mutations: MutationTree<BoardState> = {
  setBoards (state, boards: Board[]) {
    state.boards = boards
  },
  setBoard (state, baord: Board) {
    state.board = baord
  },
  setIsLoadingBoard (state, isLoading: boolean) {
    state.isLoadingBoard = isLoading
  },
  setIsLoadingBoards (state, isLoading: boolean) {
    state.isLoadingBoards = isLoading
  },
  setErrorBoard (state, errorMsg: string | null) {
    state.errorBoard = errorMsg
  },
  setErrorBoards (state, errorMsg: string | null) {
    state.errorBoards = errorMsg
  },
  setDoneBoard (state, isDone) {
    state.doneBoard = isDone
  },
  setDoneBoards (state, isDone) {
    state.doneBoards = isDone
  }
}

const getters: GetterTree<BoardState, RootState> = {
  getBoardsLength (state) {
    return state.boards.length
  }
}
const Board: Module<BoardState, RootState> = {
  // namespaced: true, // <- false일 경우, getters, mutations, actions의 이름을 공용으로 사용
  state: {
    board: null,
    boards: [],

    isLoadingBoard: false,
    isLoadingBoards: false,

    errorBoard: null,
    errorBoards: null,

    doneBoard: false,
    doneBoards: false
  },
  mutations,
  actions,
  getters
}

export default Board
