import { HttpRequest } from '@/util/http/httpRequest'

interface LoginReponse {
  token: string
}

interface ReponseBody {
  data: LoginReponse
  code: number
}

export const login = (body: LoginBody): Promise<ReponseBody> => {
  return new HttpRequest().request({
    url: '/user/login',
    method: 'post',
    data: body,
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })
}

export const logout = (): Promise<ReponseBody> => {
  return new HttpRequest().request({
    url: '/user/logout',
    method: 'get'
  })
}

export const getProfile = (): Promise<ReponseBody> => {
  return new HttpRequest().request({
    url: '/user/profile',
    method: 'get'
  })
}
