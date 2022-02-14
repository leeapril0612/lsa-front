import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

export class HttpRequest {
  private instance: AxiosInstance

  constructor (option?: AxiosRequestConfig) {
    this.instance = axios.create(Object.assign({
      baseURL: 'http://localhost:3080',
      headers: {
      },
      withCredentials: true
    }, option || {}))
  }

  public request (option: AxiosRequestConfig) {
    return this.instance.request(option)
  }
}
