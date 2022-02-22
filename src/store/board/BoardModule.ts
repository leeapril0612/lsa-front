import { Module, MutationTree, ActionTree, GetterTree } from 'vuex'
import { createBoard, deleteBoard, getBoard, getBoards } from '@/service/board/boardAPI'
import { RootState } from '..'
import router from '@/router'

export type BoardState = {
  boards: Board[],
  board: Board,

  isLoadingBoards: boolean,
  isLoadingBoard: boolean,
  isLoadingCreateBoard: boolean,
  isLoadingDeleteBoard: boolean,

  errorBoards: string | null
  errorBoard: string | null,
  errorCreateBoard: string | null,
  errorDeleteeBoard: string | null,

  doneBoards: boolean,
  doneBoard: boolean,
  doneCreateBoard: boolean,
  doneDeleteBoard: boolean
}

const actions: ActionTree<BoardState, RootState> = {
  async GET_BOARDS ({ commit }) {
    commit('setIsLoadingBoards', true)
    commit('setDoneBoards', false)
    commit('setErrorBoards', null)
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
  async GET_BOARD ({ commit }, boardId) {
    commit('setIsLoadingBoard', true)
    commit('setDoneBoard', false)
    commit('setErrorBoard', null)
    try {
      const { data } = await getBoard(boardId)
      commit('setBoard', data)
      return Promise.resolve(true)
    } catch (error) {
      commit('setErrorBoard', error)
      return Promise.reject(error)
    } finally {
      commit('setIsLoadingBoard', false)
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
  },
  async DELETE_BOARD ({ commit }, id) {
    commit('setIsLoadingDeleteBoard', true)
    commit('setDoneDeleteBoard', false)
    commit('setErrorDeleteBoard', null)
    try {
      await deleteBoard(id)
      commit('setIsLoadingDeleteBoard', false)
      commit('setDoneDeleteBoard', true)
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
  resetBoard (state) {
    state.board = {
      id: 0,
      title: '',
      createdDate: '',
      username: '',
      updatedDate: '',
      content: ''
    }
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
  setIsLoadingDeleteBoard (state, isLoading: boolean) {
    state.isLoadingDeleteBoard = isLoading
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
  setErrorDeleteBoard (state, errorMsg: string | null) {
    state.errorDeleteeBoard = errorMsg
  },

  setDoneBoard (state, isDone: boolean) {
    state.doneBoard = isDone
  },
  setDoneBoards (state, isDone: boolean) {
    state.doneBoards = isDone
  },
  setDoneCreateBoard (state, isDone: boolean) {
    state.doneCreateBoard = isDone
  },
  setDoneDeleteBoard (state, isDone: boolean) {
    state.doneDeleteBoard = isDone
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
    board: {
      id: 0,
      title: '',
      createdDate: '',
      username: '',
      updatedDate: '',
      content: ''
    },
    boards: [],

    isLoadingBoard: false,
    isLoadingBoards: false,
    isLoadingCreateBoard: false,
    isLoadingDeleteBoard: false,

    errorBoard: null,
    errorBoards: null,
    errorCreateBoard: null,
    errorDeleteeBoard: null,

    doneBoard: false,
    doneBoards: false,
    doneCreateBoard: false,
    doneDeleteBoard: false
  },
  mutations,
  actions,
  getters
}

export default Board
