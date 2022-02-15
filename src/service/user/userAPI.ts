import { HttpRequest } from '@/util/http/httpRequest'

export const login = (body: LoginBody) => {
  return new HttpRequest().request({
    url: '/user/login',
    method: 'post',
    data: body,
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })
}