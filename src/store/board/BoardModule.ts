import { Module, MutationTree, ActionTree, GetterTree } from 'vuex'
import { createBoard, deleteBoard, getBoard, getBoards, updateBoard } from '@/service/board/boardAPI'
import { RootState } from '..'
import router from '@/router'

export type BoardState = {
  boards: Board[],
  board: Board,

  isLoadingBoards: boolean,
  isLoadingBoard: boolean,
  isLoadingCreateBoard: boolean,
  isLoadingDeleteBoard: boolean,
  isLoadingUpdateBoard: boolean,

  errorBoards: string | null
  errorBoard: string | null,
  errorCreateBoard: string | null,
  errorDeleteBoard: string | null,
  errorUpdateBoard: string | null,

  doneBoards: boolean,
  doneBoard: boolean,
  doneCreateBoard: boolean,
  doneDeleteBoard: boolean,
  doneUpdateBoard: boolean
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
      commit('setDoneCreateBoard', true)
      router.push('/board')
      return Promise.resolve(true)
    } catch (error) {
      return Promise.reject(error)
    } finally {
      commit('setIsLoadingCreateBoard', false)
    }
  },
  async DELETE_BOARD ({ commit }, id) {
    commit('setIsLoadingDeleteBoard', true)
    commit('setDoneDeleteBoard', false)
    commit('setErrorDeleteBoard', null)
    try {
      await deleteBoard(id)
      commit('setDoneDeleteBoard', true)
      router.push('/board')
      return Promise.resolve(true)
    } catch (error) {
      return Promise.reject(error)
    } finally {
      commit('setIsLoadingDeleteBoard', false)
    }
  },
  async UPDATE_BOARD ({ commit }, payload: BoardBody&{
    id: number
  }) {
    commit('setIsLoadingUpdateBoard', true)
    commit('setDoneUpdateBoard', false)
    commit('setErrorUpdateBoard', null)
    try {
      await updateBoard(payload.id, payload)
      commit('setDoneUpdateBoard', true)
      router.push('/board')
      return Promise.resolve(true)
    } catch (error) {
      return Promise.reject(error)
    } finally {
      commit('setIsLoadingUpdateBoard', false)
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
  setIsLoadingUpdateBoard (state, isLoading: boolean) {
    state.isLoadingUpdateBoard = isLoading
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
    state.errorDeleteBoard = errorMsg
  },
  setErrorUpdateBoard (state, errorMsg: string | null) {
    state.errorUpdateBoard = errorMsg
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
  },
  setDoneUpdateBoard (state, isDone: boolean) {
    state.doneUpdateBoard = isDone
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
    isLoadingUpdateBoard: false,

    errorBoard: null,
    errorBoards: null,
    errorCreateBoard: null,
    errorDeleteBoard: null,
    errorUpdateBoard: null,

    doneBoard: false,
    doneBoards: false,
    doneCreateBoard: false,
    doneDeleteBoard: false,
    doneUpdateBoard: false
  },
  mutations,
  actions,
  getters
}

export default Board
