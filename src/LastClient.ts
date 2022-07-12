import fetch from 'node-fetch'
import {IFMErrorResponse, IFMResponse} from './types/response.js'

export default class LastClient {
  apiUrl = 'https://ws.audioscrobbler.com/2.0'
  #apiKey: string

  constructor(apiKey: string) {
    this.#apiKey = apiKey
  }

  #buildRequestUrl(params: object): string {
    const url = `${this.apiUrl}`
    return url
  }

  #basicRequest(method: string, data: object): Promise<IFMResponse> {
    return fetch().then(a => a.json() as Promise<IFMResponse>).then((r) => {
      if (r.code && r.message) this.#handleError(r)
      return r
    })
  }

  #handleError(r: unknown) {
    r = r as IFMErrorResponse
  }
}
