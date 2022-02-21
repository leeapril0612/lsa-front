import router from '@/router'
import store from '@/store'
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

declare interface ReponseBody {
  code: number
  data: any
}

export class HttpRequest {
  private instance: AxiosInstance

  constructor (option?: AxiosRequestConfig) {
    this.instance = axios.create({
      // baseURL: 'http://dev-sys.openobject.net:25000/',
      baseURL: 'http://localhost:3080/',
      headers: {
        // 'Access-Control-Allow-Origin:': '*'
      },
      withCredentials: true,
      ...option
    })

    this.instance.interceptors.response.use(undefined, (err) => {
      switch (err.response.status) {
        case 401:
          if (store.state.Auth.login) {
            store.dispatch('LOGOUT')
          }
          router.push('/login')
          break
      }
      return Promise.reject(err)
    })
  }

  public request (option: AxiosRequestConfig): Promise<ReponseBody> {
    return this.instance.request(option).then((res) => res.data)
  }
}
