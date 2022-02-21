import { Module, MutationTree, ActionTree, GetterTree } from 'vuex'
import { createBoard, getBoards } from '@/service/board/boardAPI'
import { RootState } from '..'
import router from '@/router'

export type BoardState = {
  boards: Board[],
  board: Board | null,

  isLoadingBoards: boolean,
  isLoadingBoard: boolean,
  isLoadingCreateBoard: boolean,

  errorBoards: string | null
  errorBoard: string | null,
  errorCreateBoard: string | null,

  doneBoards: boolean,
  doneBoard: boolean,
  doneCreateBoard: boolean,
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
  },
  async CREATE_BOARD ({ commit }, payload: BoardBody) {
    commit('setIsLoadingCreateBoard', true)
    commit('setDoneCreateBoard', false)
    commit('setErrorCreateBoard', null)
    try {
      await createBoard(payload)
      commit('setIsLoadingCreateBoard', false)
      commit('setDoneCreateBoard', true)
      router.push('/board')
      return Promise.resolve(true)
    } catch (error) {
      return Promise.reject(error)
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
  setIsLoadingCreateBoard (state, isLoading: boolean) {
    state.isLoadingCreateBoard = isLoading
  },
  setErrorBoard (state, errorMsg: string | null) {
    state.errorBoard = errorMsg
  },
  setErrorBoards (state, errorMsg: string | null) {
    state.errorBoards = errorMsg
  },
  setErrorCreateBoard (state, errorMsg: string | null) {
    state.errorCreateBoard = errorMsg
  },
  setDoneBoard (state, isDone: boolean) {
    state.doneBoard = isDone
  },
  setDoneBoards (state, isDone: boolean) {
    state.doneBoards = isDone
  },
  setDoneCreateBoard (state, isDone: boolean) {
    state.doneCreateBoard = isDone
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
    isLoadingCreateBoard: false,

    errorBoard: null,
    errorBoards: null,
    errorCreateBoard: null,

    doneBoard: false,
    doneBoards: false,
    doneCreateBoard: false
  },
  mutations,
  actions,
  getters
}

export default Board
