import { HttpRequest } from '@/util/http/httpRequest'
import { AxiosRequestConfig } from 'axios'

export const getBoards = (option?: AxiosRequestConfig) => {
  return new HttpRequest().request({
    url: '/board/list',
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    ...option
  })
}

export const updateBoard = (id: number, body: any, option?: AxiosRequestConfig) => {
  return new HttpRequest().request({
    url: `/board/${id}`,
    method: 'patch',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    ...option
  })
}

export const getBoard = (id: number) => {
  return new HttpRequest().request({
    url: `/board/${id}`,
    method: 'get'
  })
}

export const createBoard = (data: any, option?: AxiosRequestConfig) => {
  return new HttpRequest().request({
    url: '/board',
    method: 'POST',
    data: data,
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    ...option
  })
}

export const deleteBoard = (id: number) => {
  return new HttpRequest().request({
    url: `/board/${id}`,
    method: 'delete'
  })
}
