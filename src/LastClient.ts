import fetch from 'node-fetch'
import { LastfmError } from './error/LastfmError'
import { User } from './packages/User'
import type {
  GetOriginalResponse,
  LastfmApiMethod,
  LastfmResponses
} from './types/responses'
import { isLastfmError } from './utils'

export default class LastClient {
  private apiUrl = 'https://ws.audioscrobbler.com/2.0'

  public user = new User(this)

  constructor(
    public apiKey: string,
    public apiSecret?: string,
    public sessionToken?: string
  ) {
    if (!apiKey) throw new Error('apiKey is required and is missing')
  }

  /**
   * @todo implement signed requests
   */
  async request<M extends LastfmApiMethod>(
    method: M,
    params?: Record<string, string>
  ) {
    try {
      params = {
        ...params,
        method,
        api_key: this.apiKey,
        format: 'json'
      }
      const queryString = new URLSearchParams(params).toString()
      const response = await fetch(`${this.apiUrl}?${queryString}`).then((r) =>
        r.json()
      )
      return response as GetOriginalResponse<LastfmResponses[M]>
    } catch (error) {
      if (isLastfmError(error)) {
        throw new LastfmError(error)
      } else throw error
    }
  }
}
