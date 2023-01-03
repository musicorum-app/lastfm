import { LastfmError } from './error/LastfmError.js'
import { User } from './packages/User.js'
import type {
  GetOriginalResponse,
  LastfmApiMethod,
  LastfmResponses
} from './types/responses'

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
    params = {
      ...params,
      method,
      api_key: this.apiKey,
      format: 'json'
    }
    const queryString = new URLSearchParams(params).toString()

    const response = await fetch(`${this.apiUrl}?${queryString}`)
    const data = await response.json().then((a) => a.data)
    if (!response.ok) throw new LastfmError(data)

    return data as GetOriginalResponse<LastfmResponses[M]>
  }
}
